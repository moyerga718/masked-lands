import { createCharacterFetch } from "../ApiManager"
import { useNavigate } from "react-router-dom"


export const CharacterSubmitButton = ( {characterObj, setCharacter} ) => {
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if (characterObj.name && characterObj.bio && characterObj.imageUrl && characterObj.classId && characterObj.weaponId && characterObj.armorId) {
            createCharacterFetch(characterObj).then(()=> navigate("/"))
        } else {
            window.alert("Please fill out all fields")
        }
    }
    
    return <button
        onClick={(event) => handleSaveButtonClick(event)}
        className="btn btn-primary">
        Create Character
</button>
}