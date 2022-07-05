import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUserInformationFetch, getAllUserInformationFetch, saveUserProfileFetch, getUserByEmailFetch, getUserByUsernameFetch } from "../ApiManager"
import "./EditUserProfile.css"

export const EditUserProfile = () => {
    const navigate = useNavigate()
    const { userId } = useParams()

    const [profile, updateProfile] = useState({
        id: 0,
        username: "",
        email: "",
        firstName: "",
        lastName: ""
    })

    //get user obj for current user
    useEffect(
        () => {
            getCurrentUserInformationFetch(userId).then(updateProfile)
        },
        []
    )

    //Once button is clicked, update data in api
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return saveUserProfileFetch(profile)
            .then(
                () => {
                    navigate(`/profile/${userId}`)
                }
            )

    }

    //return all form and button jsx.

    return (
        <>
        <div className="edit-profile-container">
            <div className="edit-profile-background">
            <form className="edit-user-form">
                <h2 className="profile__title">Edit Profile Information</h2>
                <div className="input--container">
                    <fieldset className="form-field">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={profile.username}
                                onChange={
                                    (evt) => {
                                        const copy = { ...profile }
                                        copy.username = evt.target.value
                                        updateProfile(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="form-field">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                required autoFocus
                                type="email"
                                className="form-control"
                                value={profile.email}
                                onChange={
                                    (evt) => {
                                        const copy = { ...profile }
                                        copy.email = evt.target.value
                                        updateProfile(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="form-field">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={profile.firstName}
                                onChange={
                                    (evt) => {
                                        const copy = { ...profile }
                                        copy.firstName = evt.target.value
                                        updateProfile(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="form-field">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={profile.lastName}
                                onChange={
                                    (evt) => {
                                        const copy = { ...profile }
                                        copy.lastName = evt.target.value
                                        updateProfile(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="form-field-button">
                        <div className="button-div">
                            <button
                                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                className="submitButton">
                                Save information
                            </button>
                        </div>
                    </fieldset>
                </div>
            </form>

            </div>
        </div>
        </>
    )

}