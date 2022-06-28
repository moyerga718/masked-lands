import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./nav/Navbar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Authorized } from "./views/Authorized"
import { useState, useEffect } from "react"
import { Loading } from "./Loading"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../index.css"


export const MaskedLands = () => {

	return <>

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
		</BrowserRouter>


	</>

}