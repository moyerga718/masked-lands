import { Link } from "react-router-dom"
import "./PublicCharacterCard.css"

//This component renders a card for a single character object. The name on the card is a link that will take you to detailed character sheet.

export const PublicCharacterCard = ( {characterData} ) => {

    return <Link to={`/character/${characterData.id}`} style={{ textDecoration: 'none' }} className="character-card-link">
    <section className="publicCharacterCard">
        <div className="character-card-image-div">
            <img src={characterData?.image_url} className="character-card-image" />
        </div>
        <div className="character-card-text">
            <header className="character-card-header">
                <h3 className="character-card-title">{characterData.name}</h3>
                <p className="card-username">Level {characterData.level}</p>
                <p className="card-username"><i>By {characterData?.player?.user?.username}</i></p>
            </header>
            <div className="character-card-information">
                <h4>{characterData?.species?.name} | {characterData?.background?.name}</h4>
                <h4 className="character-card-class">{characterData?.combat_class?.name} | {characterData?.subclass.name}</h4>
            </div>
        </div>
    </section>
    </Link>
}