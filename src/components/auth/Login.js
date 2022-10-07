import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../django-managers/AuthManager";
import "./Login.css"

export const Login = ({ setToken, setUserId, setUsername }) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username.current.value,
            password: password.current.value
        }

        loginUser(user).then(res => {
            if ("valid" in res && res.valid) {

                setToken(res.token)
                setUserId(res.user_id)
                setUsername(res.username)
                navigate("/")
            }
        })

        // LOGIN FOR JSON SERVER
        // return fetch(`http://localhost:8088/users?email=${email}`)
        //     .then(res => res.json())
        //     .then(foundUsers => {
        //         if (foundUsers.length === 1) {
        //             const user = foundUsers[0]
        //             localStorage.setItem("ml_user", JSON.stringify({
        //                 id: user.id,
        //             }))

        //             navigate("/")
        //         }
        //         else {
        //             window.alert("Invalid login")
        //         }
        //     })
    }

    return (
        <main className="login--page">
            <div className="login-container">
                <section className="form-container">

                    <h1 className="login--welcome">The Masked Lands</h1>
                    <h3 className="login--signin-text">Sign in</h3>
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset className="form-field">
                            <input
                                className="form-control"
                                type="text"
                                ref={username}
                                name="username"
                                placeholder = "Username"
                                autoFocus
                            />
                        </fieldset>
                        <fieldset className="form-field">
                            <input
                                className="form-control"
                                type="password"
                                ref={password}
                                name="password"
                                placeholder = "Password"
                            />
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