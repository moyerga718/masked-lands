export const ClassRadioButton = ( {classObj, characterObj, setCharacter, allAttributes} ) => {

    //For the given classObj, find the name of the attribute that class gives a bonus to.
    const classAttribute = allAttributes.find(attribute => attribute.id === classObj.bonusAttributeId)

    //Create a radio button that displays the class name and associated attribute bonus. When selected, update the main character object
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