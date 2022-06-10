import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./nav/Navbar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./auth/Login"


export const MaskedLands = () => {
    return <BrowserRouter>
    <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<></>} />

		<Route path="*" element={
			
				<>
					<Navbar />
					<ApplicationViews />
				</>
			

		} />
	</Routes>
    </BrowserRouter>
}