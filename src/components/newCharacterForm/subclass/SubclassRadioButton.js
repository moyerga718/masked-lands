import "./Subclass.css"

export const SubclassRadioButton = ({ subclassObj, characterObj, setCharacter, allAttributes }) => {

    //Create a radio button that displays the subclass name and associated attribute bonus. When selected, update the main character object
    return <>
        <label className="labl">
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
            <div className="selection-div">
                <div className="selection-image-div">
                    <img className="selection-image" src={subclassObj?.imageUrl} />
                </div>
                <div classname="selection-text-div">
                    <h3 className="selection-text">{`${subclassObj.name}`}</h3>
                </div>
            </div>
        </label>
    </>
}