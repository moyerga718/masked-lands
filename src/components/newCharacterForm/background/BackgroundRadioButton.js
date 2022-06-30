export const BackgroundRadioButton = ({ backgroundObj, characterObj, setCharacter, allAttributes }) => {

    //OKAY so background object now contains an array of all the attribute bonuses for that background. How do we display this shit
    const attBonuses = backgroundObj?.backgroundAttributeBonuses

    //Create a radio button that displays the species name and associated attribute bonus. When selected, update the main character object
    return <>
        <label className="labl">
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
            <div className="selection-div">
                <div>
                    <img className="selection-image" src={backgroundObj?.imageUrl} />
                </div>
                <div>
                    <h3 className="selection-text">{backgroundObj?.name}</h3>
                    <div className="background-att-bonus-list-container">
                        <h5 className="selection-text">Attribute Bonuses:</h5>
                        {
                            attBonuses.map(
                                attBonus => {
                                    const foundAtt = allAttributes.find(attribute => attribute.id === attBonus.attributeId)
                                    return <h5 className="selection-text">+{attBonus?.bonus} {foundAtt.name}</h5>
                                }
                            )
                        }
                    </div>

                </div>

            </div>

        </label>

    </>
}