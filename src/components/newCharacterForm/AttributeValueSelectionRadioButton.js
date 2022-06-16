//This component generates a radio button for a given attribute type. On change, updates characterAttributes state from parent.
import { useState, useEffect } from "react"

/*

Okay I'm trying to figure out how the FRICK to make these radio buttons to work together. 
    *The character sheet works, but only if the user makes the right attribute selections the first time.
    *say someone chooses new attribute value 1 to go to charisma. They then want to change their selection to go to strength.
        * this changes the value of strength to attribute value 1, but that value doesn't reset in charisma.
        * Additionally, if strength is already selected for another attribute value, it doesn't deselect that button.


    **so, new attribute values 
*/


export const AttributeValueSelectionRadioButton = ({ newAttributeId, newAttributeValue, setNewAttributes, characterAttributes, setCharacterAttributes, oneAttributeNameObj }) => {

    const [selected, setSelected] = useState(false)
    
    const handleAttributeSelection = (changeEvent) => {
        // make a copy of character attributes.
        const copy = [...characterAttributes]
        // map through the copy of character attributes.
        const changedCopy = copy.map(
            charAtt => {
                // see which attribute in characterAttributes copy has an attributeId that matches the Id of the attribute that was just selected.
                if (charAtt.attributeId === parseInt(changeEvent.target.value)) {
                    // if ids match, change the value of the attribute in the character attributes copy, add this to changedCopy
                    charAtt.value=newAttributeValue
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

    //create radio button for each attribute

    return <>
        <div >
            <input
                onChange={(changeEvent) => handleAttributeSelection(changeEvent)}
                type="radio"
                name={`attribute-${newAttributeId}`}
                
                value={oneAttributeNameObj.id}
            />{" "}
            {`${oneAttributeNameObj.name}`}
        </div></>
}