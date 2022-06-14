// STATUS: attribute values generate when I click a button, they display on-screen. Need to generate dropdown box for each and store
// selections in state.

import { useEffect, useState } from "react"
import "./newCharacterForm.css"
import { AttributeValueSelection } from "./AttributeValueSelection"

export const AttributeSelection = ( {characterAttributes, setCharacterAttributes, allAttributes}) => {
    const [newAttributeValues, setNewAttributeValues] = useState([])
  

    //write a function that rolls 4 d6, takes away the lowest value
    // make a button that when clicked, run that function six times, store that info in a new state? - DONE
    
    // okay so attribute values are now displaying. But now I need to make radio buttons for each attribute value so the user can choose which stat 
    // that value goes to. 

    
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

    const removeSmallest = (array) => {
        //sort array in descending order
        const sortedArray = array.sort().reverse()
        //remove lowest value, store it in another variable
        const lowestValue = sortedArray.pop()
        //return array with three highest numbers
        return sortedArray
    }

    const sumArray = (array) => {
        let sum = 0
        array.forEach( num => {
            sum= sum + num
        })
        return sum
    }

    const generateAllAttributeValues = () => {
        const attributeValues = []
        for (let i = 0; i < 6; i++) {
            let attVal = generateOneAttributeValue()
            let attObj = {
                id: i+1,
                value: attVal
            }
            attributeValues.push(attObj)
        }
        setNewAttributeValues(attributeValues)
    }

    return <div>
        <h2>ATTRIBUTE SELECTION</h2>
        {
            (newAttributeValues.length === 0)
            ? <>
                <button onClick={()=>generateAllAttributeValues()} >Click to roll your stats... exciting!!</button>
            </>
             : <>
                <div className="attributes-container">
                    {
                        newAttributeValues.map(attribute => <AttributeValueSelection key={`newAttribute--${attribute.id}`}
                        newAttributeId={attribute.id}
                        newAttributeValue={attribute.value}
                        characterAttributes={characterAttributes}
                        setCharacterAttributes={setCharacterAttributes}
                        allAttributeNames={allAttributes}
                        />)
                    }

                </div>
             </>
    
        }
        </div>
}