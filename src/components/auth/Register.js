import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../../django-managers/AuthManager"
import "./Login.css"

export const Register = ({ setToken, setUserId, setUsername }) => {

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const bio = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                bio: bio.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token)
                        setUserId(res.user_id)
                        setUsername(res.username)
                        navigate("/")
                    } else {
                        
                    }
                })
            }
    }

        return (
            <main style={{ textAlign: "center" }} className="login--page">
                <div className="login-container">
                    <section className="form-container">
                        <h1 className="login--welcome">The Masked Lands</h1>
                        <h3 className="login--signin-text">Register</h3>
                        <form className="form--login" onSubmit={handleRegister}>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="text"
                                    ref={firstName}
                                    name="firstName"
                                    placeholder="First Name"
                                    autoFocus 
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="text"
                                    ref={lastName}
                                    name="lastName"
                                    placeholder="Last Name"
                                    autoFocus 
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="text"
                                    ref={username}
                                    name="username"
                                    placeholder="Username"
                                    autoFocus
                                />
                            </fieldset >

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="email"
                                    ref={email}
                                    name="email"
                                    placeholder="Email"
                                    autoFocus
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="password"
                                    ref={password}
                                    name="password"
                                    placeholder="Password"
                                    autoFocus
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="password"
                                    ref={verifyPassword}
                                    name="verifyPassword"
                                    placeholder="Verify Password"
                                    autoFocus
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <input
                                    className="form-control"
                                    type="textarea"
                                    ref={bio}
                                    name="bio"
                                    placeholder="Bio"
                                    autoFocus
                                />
                            </fieldset>

                            <fieldset className="form-field">
                                <div className="link--signin">
                                    <Link className="login--link" to="/login">Use another account</Link>
                                </div>
                                <button className="submitButton" type="submit"> Register </button>
                            </fieldset>
                        </form>

                    </section>

                </div>
            </main>
        )
}