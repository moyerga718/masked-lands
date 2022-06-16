import { AttributeValueSelectionRadioButton } from "./AttributeValueSelectionRadioButton"

//For each new attribute value that was generated, create a div that has two divs within it.
    // First div just shows the generated attribute value
    // Second div contains radio buttons for each attribute option. Radio buttons are generated by <AttributeValueSelectionRadioButton>

export const AttributeValueSelection = ( {newAttributeId, newAttributeValue, setNewAttributes, characterAttributes, setCharacterAttributes, allAttributeNames} ) => {
    return <>
    <div className="single-attribute-container">
        <div className="attribute-value">{newAttributeValue}</div>
        <div className="attribute-value-radio-container">
        {
            allAttributeNames.map(
                oneAttributeNameObj => <AttributeValueSelectionRadioButton key={`newAttributeSelection--${newAttributeId}--${oneAttributeNameObj.id}`}
                newAttributeId={newAttributeId}
                newAttributeValue={newAttributeValue}
                setNewAttributes = {setNewAttributes}
                characterAttributes={characterAttributes}
                setCharacterAttributes={setCharacterAttributes}
                oneAttributeNameObj={oneAttributeNameObj}/> 
            )
        }
        </div>
    </div>
    </>
}