import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersForCurrentUserFetch, getCurrentUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "../publicLibrary/PublicCharacterCard"

export const UserProfile = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserCharacters, setCurrentUserCharacters] = useState([])

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getCurrentUserInformationFetch(mlUserObject.id).then(setCurrentUser)
            getAllCharactersForCurrentUserFetch(mlUserObject.id).then(setCurrentUserCharacters)
        },
        []
    )

    return <>
    <h2>{currentUser.firstName}'s Profile</h2>
    <p>Full Name: {currentUser.firstName} {currentUser.lastName}</p>
    <p>Username: {currentUser.username}</p>
    <p>Email: {currentUser.email}</p>
    <button onClick={
        () => {
            navigate(`/profile/${currentUser.id}/edit`)
        }
    }>Update User Information</button>

    <h2>{currentUser.firstName}'s Characters</h2>
    <button onClick={
        () => {
            navigate(`/create`)
        }
    }> + Create</button>
    {
        currentUserCharacters.map( character => <PublicCharacterCard 
            key={`character--${character.id}`}
            characterObj={character}/>)
    }

    </>
}