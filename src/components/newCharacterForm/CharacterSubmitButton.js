import { createCharacterAttributeFetch, createCharacterFetch } from "../ApiManager"
import { useNavigate } from "react-router-dom"

//This component submits newly selected data to api when submit button is clicked.

export const CharacterSubmitButton = ( {characterObj, characterAttributes} ) => {
    const navigate = useNavigate()

    //when button is clicked, run saveCharacter()
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        saveCharacter()
    }
  
    //This function checks to see if the whole form has been filled out. If so, post all data to API
    const saveCharacter = () => {
        //Check to see if all character fields have been filled
        if (characterObj.name && characterObj.bio && characterObj.imageUrl && characterObj.classId && characterObj.weaponId && characterObj.armorId) {
            //if all character fields are filled, check to see if all attributes are selected by calling checkAttributes. This returns a boolean
            const allAttributesSelectedBoolean = checkAttributes()
            // if allAttributesSelectedBoolean is true, all attributes have been selected
            if (allAttributesSelectedBoolean) {
                //Post new character obj to API
                createCharacterFetch(characterObj)
                    //Get that response, call it newCharacter, use that ID to set characterId for each character Attribute
                    .then((newCharacter) => {
                        //Create an array that will hold all fetch calls...
                        const fetchPromiseArray = []
                        //for each character attribute....
                        for (const charAtt of characterAttributes) {
                            //create an object to send to API that has new characterId
                            const charAttToSendToAPI = {
                                attributeId: charAtt.attributeId,
                                characterId: newCharacter.id,
                                value: charAtt.value
                            }
                            //Add fetch call to promise array
                            // fetchPromiseArray.push(createCharacterAttributeFetch(charAttToSendToAPI))
                            createCharacterAttributeFetch(charAttToSendToAPI).then(
                                (myPromise) => {fetchPromiseArray.push(myPromise)}
                            )
                        }
                        //trigger all fetch calls
                        Promise.all(fetchPromiseArray)
                        })
                        // once everything has been posted, navigate to home page
                        .then(()=> navigate("/"))
            } else {
                // if all attributes have not been selected, return window w/ error message
                window.alert("Please fill out all fields")
            }
        } else {
            // if all character fields have not been filled, return window w/ error message.
            window.alert("Please fill out all fields")
        }
    }
    
    //If all attributes have been filled, return true.If all attributes have not been filled, return false.
    const checkAttributes = () => {
        for (const charAtt of characterAttributes) {
            if (charAtt.value === 0) {
                return false
            }
        }
        return true
    }

    
    return <button
        onClick={(event) => handleSaveButtonClick(event)}
        className="btn btn-primary">
        Create Character
</button>
}