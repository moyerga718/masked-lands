import { Routes, Route, Outlet} from "react-router-dom"
import "./Views.css"
import { PublicLibrary } from "../publicLibrary/PublicLibrary"
import { HeaderText } from "./HeaderText"
import { UserProfile } from "../profile/UserProfile"
import { EditUserProfile } from "../profile/EditUserProfile"
import { NewCharacterFormContainer } from "../newCharacterForm/NewCharacterFormContainer"
import { CharacterSheet } from "../characterSheet/CharacterSheet"

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
        <Route path="/create" element={ <NewCharacterFormContainer /> } />
        <Route path="/character/:characterId" element={ <CharacterSheet /> } />
    </Routes>
    </>
}