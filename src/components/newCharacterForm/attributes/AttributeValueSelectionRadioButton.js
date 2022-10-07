//This component generates a radio button for a given attribute type. On change, updates characterAttributes state from parent.
import { useState, useEffect } from "react"

/*

Okay I'm trying to figure out how to make these radio buttons to work together. 
    *The character sheet works, but only if the user makes the right attribute selections the first time.
    *say someone chooses new attribute value 1 to go to charisma. They then want to change their selection to go to strength.
        * this changes the value of strength to attribute value 1, but that value doesn't reset in charisma.
        * Additionally, if strength is already selected for another attribute value, it doesn't deselect that button.


    **so, new attribute values are stored in newAttributes with id, selectedAttributeId, and value. 
        *WHEN A RADIO BUTTON IS SELECTED.
            1. get newAttribute by newAttributeId that is passed down
            2. check to see if selectedAttributeId = 0. This means nothing has been selected for this radio selection yet.
                IF TRUE
                *check to see if any other newAttributes have a selectedAttributeId that matches the changeEvent.target.value (IE, check to see if any other 
                    new attributes values have already been assigned to the attribute you just selected)
                    * if this is true, find a way to DESELECT THAT RADIO BUTTON
                    * then, set new value
                * 
*/

export const AttributeValueSelectionRadioButton = ({ newAttributeId, newAttributeValue, attributeDependencyMatrix, setAttributeDependencyMatrix, setNewAttributes, characterAttributes, setCharacterAttributes, oneAttributeNameObj, charBackgroundObj }) => {

    const [selected, setSelected] = useState(false)
    const [attBonusBool, setAttBonusBool] = useState(false)

    useEffect(
        () => {
            setSelected(attributeDependencyMatrix[newAttributeId - 1][oneAttributeNameObj.id - 1])
            if (charBackgroundObj) {
                setAttBonusBool(checkForBackgroundBonus())
            }
        },
        []
    )

    useEffect(
        () => {
            setSelected(attributeDependencyMatrix[newAttributeId - 1][oneAttributeNameObj.id - 1])
        },
        [attributeDependencyMatrix]
    )

    const checkForBackgroundBonus = () => {
        for (const bonusAtt of charBackgroundObj.backgroundAttributeBonuses) {
            if (oneAttributeNameObj.id === bonusAtt.attributeId) {
                return true;
            }
        }
        return false;
    }


    const assignAttributeValue = (changeEvent) => {
        const copy = [...characterAttributes]
        // map through the copy of character attributes.
        const changedCopy = copy.map(
            charAtt => {
                // see which attribute in characterAttributes copy has an attributeId that matches the Id of the attribute that was just selected.
                if (charAtt.attributeId === parseInt(changeEvent.target.value)) {
                    // if ids match, change the value of the attribute in the character attributes copy, add this to changedCopy
                    charAtt.value = newAttributeValue
                    return charAtt
                } else {
                    // if ids don't match, just att the current attribute as it is to changed copy
                    return charAtt
                }
            }
        )
    }

    const deleteAttributeValue = (lastAttSelectionId) => {
        const copy = [...characterAttributes]
        // map through the copy of character attributes.
        const changedCopy = copy.map(
            charAtt => {
                // see which attribute in characterAttributes copy has an attributeId that matches the Id of the attribute that was just selected.
                if (charAtt.attributeId === lastAttSelectionId + 1) {
                    // if ids match, change the value of the attribute in the character attributes copy, add this to changedCopy
                    charAtt.value = 0
                    return charAtt
                } else {
                    // if ids don't match, just att the current attribute as it is to changed copy
                    return charAtt
                }
            }
        )
        //update characterAttributes state to match changed copy.

        setCharacterAttributes(changedCopy)
    }

    const otherAttributeSelected = (changeEvent, dependencyMatrixCopy) => {
        for (let i = 0; i < 6; i++) {
            if (dependencyMatrixCopy[newAttributeId - 1][i] === true && i !== changeEvent.target.value - 1) {
                dependencyMatrixCopy[newAttributeId - 1][i] = false
                deleteAttributeValue(i)
            }
        }
    }

    const handleAttributeSelection = (changeEvent) => {
        // make a copy of character attributes.
        let dependencyMatrixCopy = [...attributeDependencyMatrix]

        otherAttributeSelected(changeEvent, dependencyMatrixCopy)

        for (const attributeDependencyArray of dependencyMatrixCopy) {
            if (attributeDependencyArray[changeEvent.target.value - 1] = true) {
                attributeDependencyArray[changeEvent.target.value - 1] = false
                dependencyMatrixCopy[newAttributeId - 1][oneAttributeNameObj.id - 1] = true
                assignAttributeValue(changeEvent)
            } else {
                dependencyMatrixCopy[newAttributeId - 1][oneAttributeNameObj.id - 1] = true
                assignAttributeValue(changeEvent)
            }
        }
        setAttributeDependencyMatrix(dependencyMatrixCopy)
    }




    //create radio button for each attribute
    
    return <>
        <label className="att-label">
            <input
                onChange={(changeEvent) => handleAttributeSelection(changeEvent)}
                type="radio"
                name={`attribute-${newAttributeId}`}
                checked={selected}
                value={oneAttributeNameObj.id}
            />{" "}
            {
                (attBonusBool)
                ? <div><h4 className="bonus-att-name">{`${oneAttributeNameObj.name}`}</h4></div>
                : <div><h4 className="not-bonus-att-name">{`${oneAttributeNameObj.name}`}</h4></div>
            }
            
        </label>
            
        </>
}