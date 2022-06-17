export const SpeciesRadioButton = ( {speciesObj, characterObj, setCharacter, allAttributes} ) => {

    //For the given speciesObj, find the name of the primary attribute that species gives a bonus to.
    const speciesAttribute = allAttributes.find(attribute => attribute.id === speciesObj.mainAttributeId)

    //Create a radio button that displays the species name and associated attribute bonus. When selected, update the main character object
    return <>
        <div >
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
            {`${speciesObj.name}: ${speciesAttribute?.name} Focused`}
        </div>
        </>
}