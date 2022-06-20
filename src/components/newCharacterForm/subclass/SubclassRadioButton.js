import "./Subclass.css"

export const SubclassRadioButton = ( {subclassObj, characterObj, setCharacter, allAttributes} ) => {

    //Create a radio button that displays the subclass name and associated attribute bonus. When selected, update the main character object
    return <>
        <div className="subclass-selection-container">
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.subclassId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="subclassObj"
                value={subclassObj.id}
            />{" "}
            <b>{`${subclassObj.name}  |`}</b>
            <div className="subclass-att-bonus-list-container">
                <p>Life: {subclassObj.life}</p>
            </div>
        </div>
        </>
}