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
                <div className="selection-information-div">
                    <h3 className="selection-text">{`${subclassObj.name}`}</h3>
                    <div className="subclass-stats-div">
                        <div className="stat-column">
                            <h5>HP: {subclassObj?.life} + Con</h5>
                            <h5>Will: {subclassObj?.will} + Att</h5>
                            <h5>Stamina: {subclassObj?.stamina} + Con</h5>
                        </div>
                        <div className="stat-column-spacer">
                            <h5>    |   </h5>
                            <h5>    |   </h5>
                            <h5>    |   </h5>
                        </div>
                        <div className="stat-column">
                            <h5>Hit Die: D{subclassObj?.hitDie}</h5>
                            <h5>Per Level: {subclassObj?.willPerLevel}</h5>
                            <h5>Per Level: {subclassObj?.staminaPerLevel}</h5>
                        </div>
                    </div>
                    <h5>Devotion Points: {subclassObj?.devotionPoints}</h5>
                </div>
            </div>
        </label>
    </>
}