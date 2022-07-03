export const SpellTextGenerator = ({ spellObj, gods }) => {
    const foundGod = gods.find(god => god?.id === spellObj?.godId)

    const spellStyle = {
        background: `rgba(${foundGod?.rgb}, 0.2)`,
        // boxShadow: `0px 5px 75px ${devotionObj?.devLevel}0px rgba(${foundGod?.rgb}, 0.2${devotionObj?.devLevel})`
    }

    return <div className="spell-text-div" style={spellStyle}>
        <div className="spell-text-div-head">
            <h4 className="spell-text">{spellObj?.name}</h4>
            <h5 className="spell-text">{foundGod?.name} | Devotion Level {spellObj?.devLevel}</h5>
        </div>
        
        <p className="spell-short-description"><i>{spellObj?.shortDescription}</i></p>
        
        <h5 className="spell-text">{spellObj?.actionType}</h5>
        <h5 className="spell-text">Will Cost: {spellObj?.willCost}</h5>
        {
            (spellObj?.range > 0)
                ? <h5 className="spell-text">Range: {spellObj?.range}</h5>
                : <></>
        }
        <p className="spell-text"><b>Effect: </b>{spellObj?.fullDescription}</p>

    </div>
}