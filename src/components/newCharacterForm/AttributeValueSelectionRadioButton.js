//This component generates a radio button for a given attribute type. On change, updates characterAttributes state from parent.

export const AttributeValueSelectionRadioButton = ({ newAttributeId, newAttributeValue, characterAttributes, setCharacterAttributes, oneAttributeNameObj }) => {
    
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