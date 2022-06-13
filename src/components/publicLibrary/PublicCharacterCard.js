import { Link } from "react-router-dom"

export const PublicCharacterCard = ( {characterObj} ) => {
    
    return <section className="publicCharacterCard">
        <header className="character-card-header">
            <h3><Link to={`/character/${characterObj.id}`}>{characterObj.name}</Link></h3>
            {/* add in delete button here in ternary that checks to see if characterObj.userId matches currentUserId */}
        </header>
        <h4>{characterObj.class.name}</h4>
        <p>Bio: {characterObj.bio}</p>
        <p>Primary Weapon: {characterObj.weapon.name}</p>
    </section>
}