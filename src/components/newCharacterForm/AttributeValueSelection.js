import { AttributeValueSelectionRadioButton } from "./AttributeValueSelectionRadioButton"

export const AttributeValueSelection = ( {newAttributeId, newAttributeValue, characterAttributes, setCharacterAttributes, allAttributeNames} ) => {
    return <>
    <div className="single-attribute-container">
        <div className="attribute-value">{newAttributeValue}</div>
        <div className="attribute-value-radio-container">
        {
            allAttributeNames.map(
                oneAttributeNameObj => <AttributeValueSelectionRadioButton key={`newAttributeSelection--${newAttributeId}--${oneAttributeNameObj.id}`}
                newAttributeId={newAttributeId}
                newAttributeValue={newAttributeValue}
                characterAttributes={characterAttributes}
                setCharacterAttributes={setCharacterAttributes}
                oneAttributeNameObj={oneAttributeNameObj}/> 
            )
        }
        </div>
    </div>
    </>
}