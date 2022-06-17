import "./Background.css"

export const BackgroundRadioButton = ( {backgroundObj, characterObj, setCharacter, allAttributes} ) => {

    //OKAY so background object now contains an array of all the attribute bonuses for that background. How do we display this shit
    const attBonuses = backgroundObj?.backgroundAttributeBonuses

    //Create a radio button that displays the species name and associated attribute bonus. When selected, update the main character object
    return <>
        <div className="background-selection-container">
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
            <b>{`${backgroundObj.name}  |`}</b>
            <div className="background-att-bonus-list-container">
            {
                attBonuses.map(
                    attBonus => {
                        const foundAtt = allAttributes.find(attribute => attribute.id === attBonus.attributeId)
                        return <p>| +{attBonus?.bonus} {foundAtt.name} |</p>
                    }
                )
            }
            </div>
        </div>
        </>
}