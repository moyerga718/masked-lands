import { Routes, Route, Outlet} from "react-router-dom"
import { useState, useEffect} from "react"
import "./Views.css"
import { PublicLibraryContainer } from "../publicLibrary/PublicLibraryContainer"
import { HeaderText } from "./HeaderText"
import { UserProfile } from "../profile/UserProfile"
import { EditUserProfile } from "../profile/EditUserProfile"
import { NewCharacterFormContainer } from "../newCharacterForm/NewCharacterFormContainer"
import { CharacterSheet } from "../characterSheet/CharacterSheet"
import { Loading } from "../Loading"

export const ApplicationViews = () => {
    return <>
        <HeaderText />
        
        <Routes>
            <Route path="/" element={
                <>
                    <PublicLibraryContainer />
                </>} />
            <Route path="/profile/:userId" element={ <UserProfile />} />
            <Route path="/profile/:userId/edit" element={ <EditUserProfile />} />
            <Route path="/create" element={ <NewCharacterFormContainer /> } />
            <Route path="/character/:characterId" element={ <CharacterSheet /> } />
        </Routes>
    </>
}