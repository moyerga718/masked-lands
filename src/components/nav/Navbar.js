import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

import "./Navbar.css"

export const Navbar = ({ token, setToken, setUsername }) => {
    const navigate = useNavigate()

    // const localMlUser = localStorage.getItem("ml_user")
    // const mlUserObject = JSON.parse(localMlUser)

    return (<>

        <ul className="navbar">

            <li className="navbar__item navbar__home">
                <Link className="navbar__link" to={`/`}>
                    <h1 className="header-title">The Masked Lands</h1>
                </Link>
            </li>


            <div className="navbar__userinfo__div">

                {
                    token
                        ? <>
                            <li className="navbar__item navbar__create">
                                <Link className="navbar__link" to={`/create`}>
                                    <h3>Create</h3>
                                </Link>
                            </li>

                            <li className="navbar__item navbar__profile">
                                <Link className="navbar__link" to={`/profile`}>
                                    <h3>My Profile</h3>
                                </Link>
                            </li>
                            <li className="navbar__item navbar__logout">
                                <Link className="navbar__link" to={`/login`} onClick={() => {
                                    setToken('')
                                    setUsername('')
                                }}>
                                    <h3>Logout</h3>
                                </Link>
                            </li>
                        </>
                        : <>
                            <li className="navbar__item navbar__create">
                                <Link className="navbar__link" to={`/login`}>
                                    <h3>Log In</h3>
                                </Link>
                            </li>
                        </>
                }
            </div>
        </ul>
    </>
    )
}

