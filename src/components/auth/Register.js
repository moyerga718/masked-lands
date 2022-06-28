import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("ml_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }} className="login--page">
            <div className="login-container">
                <section className="form-container">
                    <h1 className="login--welcome">The Masked Lands</h1>
                    <h2 className="login--signin-text">Register</h2>
                    <form className="form--login" onSubmit={handleRegister}>
                        <fieldset className="form-field">
                            
                            <input onChange={updateUser}
                                type="text" id="firstName" className="form-control"
                                placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset className="form-field">
                            
                            <input onChange={updateUser}
                                type="text" id="lastName" className="form-control"
                                placeholder="Last name" required autoFocus />
                        </fieldset>
                        <fieldset className="form-field">
                            
                            <input onChange={updateUser}
                                type="text" id="username" className="form-control"
                                placeholder="Username" required autoFocus />
                        </fieldset >
                        <fieldset className="form-field">
                           
                            <input onChange={updateUser}
                                type="email" id="email" className="form-control"
                                placeholder="Email address" required />
                        </fieldset>

                        <fieldset className="form-field">
                            <div className="link--signin">
                                <Link  className="login--link" to="/login">Use another account</Link>
                            </div>
                            <button className ="submitButton" type="submit"> Register </button>
                        </fieldset>
                    </form>

                </section>

            </div>
        </main>
    )
}