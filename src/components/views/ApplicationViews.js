import { Routes, Route, Outlet} from "react-router-dom"
import "./Views.css"
import { PublicLibrary } from "../publicLibrary/PublicLibrary"
import { HeaderText } from "./HeaderText"

export const ApplicationViews = () => {
    return <>
    
    <Routes>
        <Route path="/" element={
            <>
                <HeaderText />
                <PublicLibrary />
            </>} />
    </Routes>
    </>
}