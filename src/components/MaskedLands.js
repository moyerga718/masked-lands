import { ApplicationViews } from "./views/ApplicationViews"
import { Navbar } from "./nav/Navbar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Authorized } from "./views/Authorized"
import { useState, useEffect } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../index.css"


export const MaskedLands = () => {
	const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [userId, setUserIdState] = useState(localStorage.getItem('user_id'))
    const [username, setUsernameState] = useState(localStorage.getItem('username'))

	const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    const setUserId = (userId) => {
        localStorage.setItem('user_id', userId)
        setUserIdState(userId)
    }

    const setUsername = (username) => {
        localStorage.setItem('username', username)
        setUsernameState(username)
    }

	return <>
		<Navbar token={token} setToken={setToken} setUsername={setUsername}/>

		<div>
			<ApplicationViews token={token} setToken={setToken} setUserId={setUserId} userId={userId} setUsername={setUsername} username={username} />
		</div>
{/* 		
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="*" element={
					<Authorized>
						<>
							<section className="site-container">
								<Navbar />
								<ApplicationViews />
							</section>
						</>
					</Authorized>


				} />
			</Routes>
		</BrowserRouter> */}


	</>

}