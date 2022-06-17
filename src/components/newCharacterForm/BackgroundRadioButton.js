export const BackgroundRadioButton = ( {backgroundObj, characterObj, setCharacter, allAttributes} ) => {

    //COME BACK TO THIS - grabbing attributes for a certain background
    // const speciesAttribute = allAttributes.find(attribute => attribute.id === backgroundObj.mainAttributeId)

    //Create a radio button that displays the species name and associated attribute bonus. When selected, update the main character object
    return <>
        <div >
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.backgroundId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="backgroundObj"
                value={backgroundObj.id}
            />{" "}
            {`${backgroundObj.name}`}
        </div>
        </>
}