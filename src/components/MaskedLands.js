import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./nav/Navbar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Authorized } from "./views/Authorized"


export const MaskedLands = () => {
    return <BrowserRouter>
    <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register/>} />

		<Route path="*" element={
			<Authorized>
				<>
					<Navbar />
					<ApplicationViews />
				</>
            </Authorized>
			

		} />
	</Routes>
    </BrowserRouter>
}