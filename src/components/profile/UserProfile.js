import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersForCurrentUserFetch, getAllSpeciesFetch, getCurrentUserInformationFetch, getAllClassesFetch, getAllBackgroundsFetch, getAllSubclassesFetch } from "../ApiManager"
import { PublicCharacterCard } from "../publicLibrary/PublicCharacterCard"
import "./Profile.css"

export const UserProfile = () => {
    const navigate = useNavigate()
    const [species, setSpecies] = useState([])
    const [backgrounds, setBackgrounds] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
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
            getAllSpeciesFetch().then(setSpecies)
            getAllClassesFetch().then(setClasses)
            getAllBackgroundsFetch().then(setBackgrounds)
            getAllSubclassesFetch().then(setSubclasses)
        },
        []
    )


    return <>
        <div className="profile--container">
            {/* Display current user information */}
            <section className="user--information">
                <h2 className="user--information--title">Profile Information</h2>
                <div className="user--info--field--container">
                    <p><b>Full Name: </b></p>
                    <p>{currentUser.firstName} {currentUser.lastName}</p>
                </div>
                <div className="user--info--field--container">
                    <p><b>Username: </b></p>
                    <p>{currentUser.username}</p>

                </div>
                <div className="user--info--field--container">
                    <p><b>Email: </b></p>
                    <p>{currentUser.email}</p>
                </div>
                {/* Button links to editing user information */}
                <div className="button--container">
                    <button className="user--info--edit--button" onClick={
                        () => {
                            navigate(`/profile/${currentUser.id}/edit`)
                        }
                    }>Edit</button>

                </div>
            </section>



            {/* Button links to character creation form */}
            <div className="user--library--container">
                <section className="user--library">
                    <h2 className="user--library--title">Personal Library</h2>

                    {/* Render character cards for all of this users characters */}

                    <div className="profile-character-card-container">
                        {
                            currentUserCharacters.map(character => <PublicCharacterCard
                                key={`character--${character.id}`}
                                allSpecies={species}
                                allClasses={classes}
                                allBackgrounds={backgrounds}
                                allSubclasses={subclasses}
                                characterObj={character}
                                currentUser={currentUser}
                                userObj={mlUserObject} />)
                        }
                    </div>
                </section>

            </div>

        </div>

    </>
}