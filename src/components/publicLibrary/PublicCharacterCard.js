import { Link } from "react-router-dom"

//This component renders a card for a single character object. The name on the card is a link that will take you to detailed character sheet.

export const PublicCharacterCard = ( {characterObj, currentUser, allUsers, allSpecies} ) => {
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

    const foundSpecies = findCharSpecies()


    return <section className="publicCharacterCard">
        <header className="character-card-header">
            <h3><Link to={`/character/${characterObj.id}`}>{characterObj.name}</Link></h3>
            <p>Created by {username}</p>
        </header>
        <h4>Species: {foundSpecies.name}</h4>
        <h4>Class: {characterObj.class.name}</h4>
        <p>Bio: {characterObj.bio}</p>
        <p>Primary Weapon: {characterObj.weapon.name}</p>
    </section>
}