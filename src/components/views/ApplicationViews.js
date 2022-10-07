import { Routes, Route, Outlet} from "react-router-dom"
import "./Views.css"
import { PublicLibraryContainer } from "../publicLibrary/PublicLibraryContainer"
import { UserProfile } from "../profile/UserProfile"
import { EditUserProfile } from "../profile/EditUserProfile"
import { NewCharacterFormContainer } from "../newCharacterForm/NewCharacterFormContainer"
import { CharacterSheet } from "../characterSheet/CharacterSheet"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"

export const ApplicationViews = ({token, setToken, userId, setUserId, username, setUsername}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} setUsername={setUsername}/>} />
			<Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} setUsername={setUsername}/>} />
            <Route path="/" element={<PublicLibraryContainer />} />
            <Route path="/profile/:userId" element={ <UserProfile />} />
            <Route path="/profile/:userId/edit" element={ <EditUserProfile />} />
            <Route path="/create" element={ <NewCharacterFormContainer /> } />
            <Route path="/character/:characterId" element={ <CharacterSheet /> } />
        </Routes>


        {/* <Routes>
            <Route path="/" element={<PublicLibraryContainer />} />
            <Route path="/profile/:userId" element={ <UserProfile />} />
            <Route path="/profile/:userId/edit" element={ <EditUserProfile />} />
            <Route path="/create" element={ <NewCharacterFormContainer /> } />
            <Route path="/character/:characterId" element={ <CharacterSheet /> } />
        </Routes> */}
    </>
}