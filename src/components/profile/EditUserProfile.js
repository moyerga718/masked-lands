import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUserInformationFetch, getAllUserInformationFetch, saveUserProfileFetch, getUserByEmailFetch, getUserByUsernameFetch } from "../ApiManager"

export const EditUserProfile = () => {
    const navigate = useNavigate()
    const {userId} = useParams()

    const [profile, updateProfile] = useState({
        id: 0,
        username: "",
        email: "",
        firstName: "",
        lastName: ""
    })
  
    useEffect(
        () => {
            getCurrentUserInformationFetch(userId).then(updateProfile)
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //Fetch calls to see if any other users are using email/username user just inputted. 
        return saveUserProfileFetch(profile)
            
                .then(
                    () => {
                        navigate(`/profile/${userId}`)
                    }
                )

    }

    return (
        <>
        <form className="profile">
            <h2 className="profile__title">Edit Profile Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.username}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.username = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="email"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.firstName}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.firstName = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.lastName}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.lastName = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile Information
            </button>
        </form>
        </>
    )

}