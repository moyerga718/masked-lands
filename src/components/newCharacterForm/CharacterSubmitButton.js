import { createCharacterAttributeFetch, createCharacterFetch } from "../ApiManager"
import { useNavigate } from "react-router-dom"


export const CharacterSubmitButton = ( {characterObj, characterAttributes} ) => {
    const navigate = useNavigate()

    // ok so right now this checks to see if all character fields have been filled, and if so, post object to characters section of API.
    // Now that my attribute generation/selection section is working, i need to add this data to database.

    // I'm gonna make a goddamn function that does all this shit.

    // *. Check to see if all character fields have been filled
    //     *.  if they have, iterate through all attributes and make sure all values are above 0
    //             *. if all attributes are above zero, 
    //                 *. make a fetch call to post character
    //                 *. grab the response from that fetch call so we can get new character id
    //                 *. iterate through character attributes, add characterId to each, make a post fetch for each to add to characterAttributes API
    //             *. if all attributes are not above zero,
    //                 *. give a window alert that says "SELECT ALL YOUR ATTRIBUTES"
    //     *.  if they HAVENT, give a window alert that says "fill out yer shit"
    

    const checkAttributes = () => {
        for (const charAtt of characterAttributes) {
            if (charAtt.value === 0) {
                return false
            }
        }
        return true
    }

    const saveCharacter = () => {
        if (characterObj.name && characterObj.bio && characterObj.imageUrl && characterObj.classId && characterObj.weaponId && characterObj.armorId) {
            const allAttributesSelectedBoolean = checkAttributes()
            if (allAttributesSelectedBoolean) {
                createCharacterFetch(characterObj)
                    .then((newCharacter) => {
                        for (const charAtt of characterAttributes) {
                            const charAttToSendToAPI = {
                                attributeId: charAtt.attributeId,
                                characterId: newCharacter.id,
                                value: charAtt.value
                            }
                            createCharacterAttributeFetch(charAttToSendToAPI)
                            .then( () => {} )
                        }})
                        .then(()=> navigate("/"))
            } else {
                window.alert("Please fill out all fields")
            }
            // createCharacterFetch(characterObj).then(()=> navigate("/"))
        } else {
            window.alert("Please fill out all fields")
        }
    }





    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        saveCharacter()
        // if (characterObj.name && characterObj.bio && characterObj.imageUrl && characterObj.classId && characterObj.weaponId && characterObj.armorId) {
        //     createCharacterFetch(characterObj).then(()=> navigate("/"))
        // } else {
        //     window.alert("Please fill out all fields")
        // }
    }
    
    return <button
        onClick={(event) => handleSaveButtonClick(event)}
        className="btn btn-primary">
        Create Character
</button>
}