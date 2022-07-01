import { createCharacterAttributeFetch, createCharacterFetch, createCharacterDevotionFetch, createCharacterImage } from "../ApiManager"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./CharacterSubmitButton.css"

//This component submits newly selected data to api when submit button is clicked.

export const CharacterSubmitButton = ({ characterObj, characterAttributes, setCharacter, characterDevotion, charImageFile }) => {
    const navigate = useNavigate()

    //when button is clicked, run saveCharacter()
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        saveCharacter()
    }

    //Use effect looks out for when image url is added to character 
    useEffect(
        () => {
            if (characterObj.imageUrl !== "") {
                createCharacterFetch(characterObj)
                    //Get that response, call it newCharacter, use that ID to set characterId for each character Attribute
                    .then((newCharacter) => {
                        //Create an array that will hold all fetch calls...
                        const fetchPromiseArray = []
                        //for each character attribute....
                        for (const charAtt of characterAttributes) {
                            //create an attribute object to send to API that has new characterId
                            const charAttToSendToAPI = {
                                attributeId: charAtt.attributeId,
                                characterId: newCharacter.id,
                                value: charAtt.value
                            }
                            //Add fetch call to promise array
                            fetchPromiseArray.push(createCharacterAttributeFetch(charAttToSendToAPI))
                        }
                        //for each character devotion object....
                        for (const charDevotion of characterDevotion) {
                            //create a devotion object to send to API that has new characterId
                            const devotionObjToSendToAPI = {
                                characterId: newCharacter.id,
                                godId: charDevotion.godId,
                                devPoints: charDevotion.devPoints,
                                devLevel: findDevotionLevel(charDevotion)
                            }
                            //Add fetch call to promise array
                            fetchPromiseArray.push(createCharacterDevotionFetch(devotionObjToSendToAPI))
                        }

                        //trigger all fetch calls
                        console.log(fetchPromiseArray)
                        Promise.all(fetchPromiseArray)
                    }).then(() => navigate("/"))
            }
        },
        [characterObj]
    )

    //This function checks to see if the whole form has been filled out. If so, post all data to API
    const saveCharacter = () => {
        //Check to see if all character fields have been filled
        if (characterObj.name && characterObj.bio && characterObj.classId && characterObj.weaponId && characterObj.armorId) {
            //if all character fields are filled, check to see if all attributes are selected by calling checkAttributes. This returns a boolean
            const allAttributesSelectedBoolean = checkAttributes()
            // if allAttributesSelectedBoolean is true, all attributes have been selected
            if (allAttributesSelectedBoolean) {
                //create variable w/ upload preset from Cloudinary
                const uploadPreset = 'wci8ewi5'

                //create form data to send to Cloudinary
                const formData = new FormData()
                formData.append("file", charImageFile)
                formData.append("upload_preset", uploadPreset)

                //Run fetch call to post image to Cloudinary
                createCharacterImage(formData)
                    .then(response => response.json())
                    .then(data => {
                        if (data.secure_url !== '') {
                            //make a copy of characterObj, give it new image URL we get back from fetch call
                            const copy = { ...characterObj }
                            copy.imageUrl = data.secure_url
                            setCharacter(copy)
                        }
                    })
                //Post new character obj to API
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

    //this function finds devotion level based on # of devotion points the character has in a god
    const findDevotionLevel = (charDevotionObj) => {

        let devLevel = 0
        if (charDevotionObj.devPoints >= 21) {
            devLevel = 5
            return devLevel
        } else if (charDevotionObj.devPoints >= 15) {
            devLevel = 4
            return devLevel
        } else if (charDevotionObj.devPoints >= 9) {
            devLevel = 3
            return devLevel
        } else if (charDevotionObj.devPoints >= 5) {
            devLevel = 2
            return devLevel
        } else if (charDevotionObj.devPoints >= 2) {
            devLevel = 1
            return devLevel
        } else {
            devLevel = 0
            return devLevel
        }
    }

    return <button
        onClick={(event) => handleSaveButtonClick(event)}
        className="character-submit-button">
        Create Character
    </button>
}