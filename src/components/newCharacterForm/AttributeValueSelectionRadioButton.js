export const AttributeValueSelectionRadioButton = ({ newAttributeId, newAttributeValue, characterAttributes, setCharacterAttributes, oneAttributeNameObj }) => {
    const handleAttributeSelection = (changeEvent) => {

        const copy = [...characterAttributes]
        const changedCopy = copy.map(
            charAtt => {
                
                if (charAtt.attributeId === parseInt(changeEvent.target.value)) {
                    charAtt.value=newAttributeValue
                    return charAtt
                } else {
                    return charAtt
                }
            }
        )
        setCharacterAttributes(changedCopy)
    }


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