//component to make class radio buttons, put this in a separate component so each button could have its own key.

export const ClassRadioButton = ( {classObj, characterObj, setCharacter, attributes} ) => {
    const classAttribute = attributes.find(attribute => attribute.id === classObj.bonusAttributeId)

    return <>
        <div >
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.classId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="classObj"
                value={classObj.id}
            />{" "}
            {`${classObj.name}: +2 ${classAttribute?.name}`}
        </div>
        </>
}