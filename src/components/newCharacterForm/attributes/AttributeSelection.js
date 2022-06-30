import { useEffect, useState } from "react"
import { getCharacterBackgroundFetch } from "../../ApiManager"
import "./AttributeSelection.css"
import { AttributeValueSelection } from "./AttributeValueSelection"

//This component uses two other components to do the following things:
// 1. Generate six attribute values that the user will be able to assign to a single attribute
//     a. To generate an attribute value, roll 4d6. Sum the values of the highest three rolls. This will be done six times.
//     b. The six attributes are: Strength, Dexterity, Constitution, Intelligence, Attunement, and Charisma. 
// 2. For each generated value, render six radio buttons - one for each attribute.
// 3. User can select which attribute they want for each value. 


export const AttributeSelection = ({ characterAttributes, setCharacterAttributes, allAttributes, characterObj }) => {
    const [areAttributesGenerated, setAreAttributesGenerated] = useState(false)
    const [newAttributeValues, setNewAttributeValues] = useState([])
    const [charBackground, setCharBackground] = useState({})
    const [attributeDependencyMatrix, setAttributeDependencyMatrix] = useState([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false]
    ]
    )

    //~~~~~~~~~~~~~~~~~~~~FUNCTIONS FOR GENERATING ATTRIBUTE VALUES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    //This function rolls 4d6
    const generateOneAttributeValue = () => {
        const arrayOfRolls = []
        //roll 4d6, add that to arrayOfRolls
        for (let i = 0; i < 4; i++) {
            let d6Roll = Math.floor(Math.random() * 6) + 1
            arrayOfRolls.push(d6Roll)
        }
        //drop the lowest value from the array
        const sortedArray = removeSmallest(arrayOfRolls)
        // find the sum of the values in sorted array
        let sortedArraySum = sumArray(sortedArray)

        return sortedArraySum
    }

    //This function removes smallest value from 4d6 roll (called within generateOneAttributeValue())
    const removeSmallest = (array) => {
        //sort array in descending order
        const sortedArray = array.sort().reverse()
        //remove lowest value, store it in another variable
        const lowestValue = sortedArray.pop()
        //return array with three highest numbers
        return sortedArray
    }

    //This function finds the sum of the highest 3d6 array (called within generateOneAttributeValue())
    const sumArray = (array) => {
        let sum = 0
        array.forEach(num => {
            sum = sum + num
        })
        return sum
    }

    //This function calls generateOneAttributeValue() six times, stores all new values in an array of objects {id, attributeValue}
    const generateAllAttributeValues = () => {
        const attributeValues = []
        for (let i = 0; i < 6; i++) {
            let attVal = generateOneAttributeValue()
            let attObj = {
                id: i + 1,
                value: attVal,
                selectedAttributeId: 0
            }
            attributeValues.push(attObj)
        }
        setNewAttributeValues(attributeValues)
    }

    //~~~~~~~~~~~~~~~~~~~~END FUNCTIONS FOR GENERATING ATTRIBUTE VALUES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



    //~~~~~~~~~~~~~~~~~OKAY this is all stuff I was trying to get attributes to stay when I go back to the page. Not working yet really. ~~~~~~~~~~~~~~~~//
    useEffect(
        () => {
            setAreAttributesGenerated(checkIfAttributesHaveBeenGenerated())
            getCharacterBackgroundFetch(characterObj?.backgroundId).then(setCharBackground)
        },
        []
    )

    useEffect(
        () => {
            setAreAttributesGenerated(checkIfAttributesHaveBeenGenerated())
        },
        [newAttributeValues]
    )

    const checkIfAttributesHaveBeenSelected = () => {
        let counter = 0
        for (const charAtt of characterAttributes) {
            if (charAtt.value > 0) {
                counter++
            }
        }
        if (counter > 0) {
            return true
        } else {
            return false
        }
    }

    const checkIfAttributesHaveBeenGenerated = () => {
        if (newAttributeValues.length) {
            return true
        } else if (checkIfAttributesHaveBeenSelected()) {
            return true
        } else {
            return false
        }
    }
    //~~~~~~~~~~~~~~~~~OKAY this is all stuff I was trying to get attributes to stay when I go back to the page. Not working yet really. ~~~~~~~~~~~~~~~~//


    //return jsx depending on if attributes have been generated. 

    if (areAttributesGenerated === false) {
        return <>
            <h2>Attribute Selection</h2>
            <section className="attribute-button-container">
                <button className="attribute-roll-button" onClick={() => generateAllAttributeValues()} ><h3>Click to roll your attributes</h3></button>
            </section>
        </>
    } else {
        return <>
            <h2>Attribute Selection</h2>
                <section className="attributes-container">
                    {
                        newAttributeValues.map(attribute => <AttributeValueSelection key={`newAttribute--${attribute.id}`}
                            newAttributeId={attribute.id}
                            newAttributeValue={attribute.value}
                            attributeDependencyMatrix={attributeDependencyMatrix}
                            setAttributeDependencyMatrix={setAttributeDependencyMatrix}
                            characterAttributes={characterAttributes}
                            setCharacterAttributes={setCharacterAttributes}
                            allAttributeNames={allAttributes}
                            charBackgroundObj={charBackground}
                        />)
                    }
                </section>
            

        </>
    }


}
