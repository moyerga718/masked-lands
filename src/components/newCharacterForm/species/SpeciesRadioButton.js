import "../newCharacterForm.css"

export const SpeciesRadioButton = ({ speciesObj, characterObj, setCharacter, allAttributes }) => {

    //For the given speciesObj, find the name of the primary attribute that species gives a bonus to.
    const speciesAttribute = allAttributes.find(attribute => attribute.id === speciesObj.mainAttributeId)

    //Create a radio button that displays the species name and associated attribute bonus. When selected, update the main character object
    return <>

        <label className="labl">
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.speciesId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="speciesObj"
                value={speciesObj.id}
            />{" "}
            <div className="selection-div">
                <div className="selection-image-div">
                    <img className="selection-image" src={speciesObj?.imageUrl} />
                </div>
                <div className="selection-information-div">
                    <h3 className="selection-text">{`${speciesObj.name}`}</h3>
                    <p className="selection-text"><i>{`${speciesObj.description}`}</i></p>
                    <h5 className="selection-text">Primary Attribute: {speciesAttribute?.name}</h5>
                    <h5 className="selection-text">Speed: {speciesObj?.speed} feet</h5>
                </div>
            </div>

        </label>

    </>
}