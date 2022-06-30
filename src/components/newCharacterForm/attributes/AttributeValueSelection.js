import { AttributeValueSelectionRadioButton } from "./AttributeValueSelectionRadioButton"
import { useState, useEffect } from "react"
//For each new attribute value that was generated, create a div that has two divs within it.
// First div just shows the generated attribute value
// Second div contains radio buttons for each attribute option. Radio buttons are generated by <AttributeValueSelectionRadioButton>

//so now, we wanna check to see if attribute has been selected and IF it gets a bonus from background



export const AttributeValueSelection = ({ newAttributeId, newAttributeValue, attributeDependencyMatrix, setAttributeDependencyMatrix, setNewAttributes, characterAttributes, setCharacterAttributes, allAttributeNames, charBackgroundObj }) => {
    //check to see if any of the values in dependency array for current newAttributeId are true.
    //if true, check to see if the attribute type that was selected gets a bonus from background.
    // if this is true, change color of border to blue, change color of value to blue, add bonus to value.
    //if selected but no bonus, just change the color of the border to salmon.
    // if NONE of this is true, just return everything as normal.
    const [selectedAttId, setSelectedAttId] = useState(0)
    const [attBonusObj, setAttBonusObj] = useState()
    const [selectedAttNameObj, setSelectedAttNameObj] = useState()

    useEffect(
        () => {
            if (attributeDependencyMatrix) {
                setSelectedAttId(checkIfAttIsSelected())
            }
        },
        [attributeDependencyMatrix]
    )

    useEffect(
        () => {
            if (selectedAttId) {
                setAttBonusObj(checkIfSelectedAttGetsBonus())
                setSelectedAttNameObj(findSelectedAttName(selectedAttId))
            } else {
                setAttBonusObj()
                setSelectedAttNameObj()
            }
        },
        [selectedAttId]
    )

    const findSelectedAttName = (selectedAttId) => {
        const foundNameObj = allAttributeNames.find( attName => attName.id === selectedAttId)
        return foundNameObj
    }

    const checkIfSelectedAttGetsBonus = () => {
        const foundAttBonus = charBackgroundObj.backgroundAttributeBonuses.find(attBonus => attBonus.attributeId === selectedAttId)
        return foundAttBonus
    }

    const checkIfAttIsSelected = () => {
        for (let i = 0; i < attributeDependencyMatrix[newAttributeId - 1].length; i++) {
            if (attributeDependencyMatrix[newAttributeId - 1][i]) {
                return i + 1
            }
        }
        return 0
    }

    if (attBonusObj && selectedAttId) {
        return <>
            <div className="single-attribute-container-selected">
                <div className="attribute-value-selected-bonus">
                    <h2>{newAttributeValue + attBonusObj?.bonus}</h2>
                    {/* <h4>{selectedAttNameObj?.name}</h4> */}
                </div>
                <div className="attribute-value-radio-container">
                    {
                        allAttributeNames.map(
                            oneAttributeNameObj => <AttributeValueSelectionRadioButton key={`newAttributeSelection--${newAttributeId}--${oneAttributeNameObj.id}`}
                                newAttributeId={newAttributeId}
                                newAttributeValue={newAttributeValue}
                                attributeDependencyMatrix={attributeDependencyMatrix}
                                setAttributeDependencyMatrix={setAttributeDependencyMatrix}
                                // setNewAttributes = {setNewAttributes}
                                characterAttributes={characterAttributes}
                                setCharacterAttributes={setCharacterAttributes}
                                oneAttributeNameObj={oneAttributeNameObj}
                                charBackgroundObj={charBackgroundObj} />
                        )
                    }
                </div>
            </div>
        </>
    } else if (!attBonusObj && selectedAttId) {
        return <>
            <div className="single-attribute-container-selected">
                <div className="attribute-value">
                    <h2>{newAttributeValue}</h2>
                    {/* <h4>{selectedAttNameObj?.name}</h4> */}
                </div>
                <div className="attribute-value-radio-container">
                    {
                        allAttributeNames.map(
                            oneAttributeNameObj => <AttributeValueSelectionRadioButton key={`newAttributeSelection--${newAttributeId}--${oneAttributeNameObj.id}`}
                                newAttributeId={newAttributeId}
                                newAttributeValue={newAttributeValue}
                                attributeDependencyMatrix={attributeDependencyMatrix}
                                setAttributeDependencyMatrix={setAttributeDependencyMatrix}
                                // setNewAttributes = {setNewAttributes}
                                characterAttributes={characterAttributes}
                                setCharacterAttributes={setCharacterAttributes}
                                oneAttributeNameObj={oneAttributeNameObj}
                                charBackgroundObj={charBackgroundObj} />
                        )
                    }
                </div>
            </div>
        </>
    } else {
        return <>
            <div className="single-attribute-container">
                <div className="attribute-value"><h2>{newAttributeValue}</h2></div>
                <div className="attribute-value-radio-container">
                    {
                        allAttributeNames.map(
                            oneAttributeNameObj => <AttributeValueSelectionRadioButton key={`newAttributeSelection--${newAttributeId}--${oneAttributeNameObj.id}`}
                                newAttributeId={newAttributeId}
                                newAttributeValue={newAttributeValue}
                                attributeDependencyMatrix={attributeDependencyMatrix}
                                setAttributeDependencyMatrix={setAttributeDependencyMatrix}
                                // setNewAttributes = {setNewAttributes}
                                characterAttributes={characterAttributes}
                                setCharacterAttributes={setCharacterAttributes}
                                oneAttributeNameObj={oneAttributeNameObj}
                                charBackgroundObj={charBackgroundObj} />
                        )
                    }
                </div>
            </div>
        </>

    }

}