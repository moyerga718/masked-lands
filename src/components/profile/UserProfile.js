import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersForCurrentUserFetch, getCurrentUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "../publicLibrary/PublicCharacterCard"
import "./Profile.css"

export const UserProfile = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserCharacters, setCurrentUserCharacters] = useState([])

    //Get id of logged in user
    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    //Upon state initializing...
    useEffect(
        () => {
            
            //Get user information based on ID found in local storage
            getCurrentUserInformationFetch(mlUserObject.id).then(setCurrentUser)
            //Get all characters for current user
            getAllCharactersForCurrentUserFetch(mlUserObject.id).then(setCurrentUserCharacters)
        },
        []
    )


    return <>

        {/* Display current user information */}

        <h2>{currentUser.firstName}'s Profile</h2>
        <p>Full Name: {currentUser.firstName} {currentUser.lastName}</p>
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>

        {/* Button links to editing user information */}

        <button onClick={
            () => {
                navigate(`/profile/${currentUser.id}/edit`)
            }
        }>Update User Information</button>

        {/* Button links to character creation form */}

        <h2>{currentUser.firstName}'s Characters</h2>
        
        <button onClick={
            () => {
                navigate(`/create`)
            }
        }> + Create</button>

        {/* Render character cards for all of this users characters */}

        <div className="profile-character-card-container">
        {
            currentUserCharacters.map(character => <PublicCharacterCard
                key={`character--${character.id}`}
                characterObj={character}
                currentUser={currentUser}
                userObj={mlUserObject} />)
        }
        </div>

    </>
}