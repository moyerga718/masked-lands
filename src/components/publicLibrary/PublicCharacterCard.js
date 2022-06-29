import { Link } from "react-router-dom"
import "./PublicCharacterCard.css"

//This component renders a card for a single character object. The name on the card is a link that will take you to detailed character sheet.

export const PublicCharacterCard = ( {characterObj, currentUser, allUsers, allSpecies, allClasses, allBackgrounds, allSubclasses} ) => {
    let username = ""
    if (currentUser) {
        username = currentUser.username
    } else {
        const foundCreator = allUsers.find(user => user.id === characterObj.userId)
        username = foundCreator?.username
    }

    const findCharSpecies = () => {
        const foundSpecies = allSpecies.find( species => species.id === characterObj.speciesId)
        return foundSpecies
    }

    const findCharBackground = () => {
        const foundBackground = allBackgrounds.find( background => background.id === characterObj.backgroundId)
        return foundBackground
    }

    const findCharClass = () => {
        const foundClass = allClasses.find( myClass => myClass.id === characterObj.classId)
        return foundClass
    }

    const findCharSubclass = () => {
        const foundSubclass = allSubclasses.find( subclass => subclass.id === characterObj.subclassId)
        return foundSubclass
    }

    const foundSpecies = findCharSpecies()
    const foundBackground = findCharBackground()
    const foundClass = findCharClass()
    const foundSubclass = findCharSubclass()

    return <Link to={`/character/${characterObj.id}`} style={{ textDecoration: 'none' }} className="character-card-link">
    <section className="publicCharacterCard">
        <div>
            <img src={characterObj.imageUrl} className="character-card-image" />
        </div>
        <div className="character-card-text">
            <header className="character-card-header">
                <h3 className="character-card-title">{characterObj.name}</h3>
                <p className="card-username"><i>By {username}</i></p>
            </header>
            <div className="character-card-information">
                <h4>{foundSpecies?.name} | {foundBackground?.name}</h4>
                <h4 className="character-card-class">{foundClass?.name} | {foundSubclass?.name}</h4>
            </div>
        </div>
    </section>
    </Link>
}