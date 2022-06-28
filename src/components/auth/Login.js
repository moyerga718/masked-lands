import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("ml_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="login--page">
            <div className="login-container">
                <section className="form-container">

                    <h1 className="login--welcome">The Masked Lands</h1>
                    <h2 className="login--signin-text">Sign in</h2>
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset className="form-field">

                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset className="form-field">
                            <div className="link--register">
                                <Link className="login--link" to="/register">Not a member yet?</Link>
                            </div>
                            <button className="submitButton" type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    )
}