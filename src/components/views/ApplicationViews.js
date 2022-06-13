import { Routes, Route, Outlet} from "react-router-dom"
import "./Views.css"
import { PublicLibrary } from "../publicLibrary/PublicLibrary"
import { HeaderText } from "./HeaderText"
import { UserProfile } from "../profile/UserProfile"
import { EditUserProfile } from "../profile/EditUserProfile"

export const ApplicationViews = () => {
    return <>
    <HeaderText />
    
    <Routes>
        <Route path="/" element={
            <>
                <PublicLibrary />
            </>} />
        <Route path="/profile/:userId" element={ <UserProfile />} />
        <Route path="/profile/:userId/edit" element={ <EditUserProfile />} />
    </Routes>
    </>
}