import { Link } from "react-router-dom"

//This component renders a card for a single character object. The name on the card is a link that will take you to detailed character sheet.

export const PublicCharacterCard = ( {characterObj} ) => {
    
    return <section className="publicCharacterCard">
        <header className="character-card-header">
            <h3><Link to={`/character/${characterObj.id}`}>{characterObj.name}</Link></h3>
        </header>
        <h4>{characterObj.class.name}</h4>
        <p>Bio: {characterObj.bio}</p>
        <p>Primary Weapon: {characterObj.weapon.name}</p>
    </section>
}