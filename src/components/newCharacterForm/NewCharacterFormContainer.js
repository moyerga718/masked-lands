import { useState, useEffect } from "react"
import { ClassSelection } from "./ClassSelection"
import { AttributeSelection } from "./AttributeSelection"
import { EquipmentSelection } from "./EquipmentSelection"
import { CharacterInfoSelection } from "./CharacterInfoSelection"
import { CharacterSubmitButton } from "./CharacterSubmitButton"
import { getAllAttributesFetch } from "../ApiManager"

// This component is a parent component for all of the different sections of the character creation form. Temp objects for character and character attributes
// are initialized in state here.

export const NewCharacterFormContainer = () => {

    // create empty character obj to be populated
    const [newCharacter, setNewCharacter] = useState({
        id: 0,
        userId: 0,
        name: "",
        bio: "",
        imageUrl: "",
        classId: 0,
        weaponId: 0,
        armorId: 0
    })

    // create array of empty attribute objects to be populated
    const [newCharacterAttributes, setNewCharacterAttributes] = useState([
        {
            characterId: 0,
            attributeId: 1,
            value: 0
        },
        {
            characterId: 0,
            attributeId: 2,
            value: 0
        },
        {
            characterId: 0,
            attributeId: 3,
            value: 0
        },
        {
            characterId: 0,
            attributeId: 4,
            value: 0
        },
        {
            characterId: 0,
            attributeId: 5,
            value: 0
        },
        {
            characterId: 0,
            attributeId: 6,
            value: 0
        },
    ])

    // Get all attribute raw data (name/id pairings)
    const [allAttributes, setAllAttributes] = useState([])

    // Get current user id from local storage
    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    //upon state initializing, get all attribute name/id pairings
    //Add userId to new character object
    useEffect(
        () => {
            getAllAttributesFetch().then(setAllAttributes)
            const copy = {...newCharacter}
            copy.userId = mlUserObject.id
            setNewCharacter(copy) 
        },
        []
    )

    //Call all necessary components, passing down character / character attribute / attribute name data as props 
    return <>
        <h2>Make a New Character</h2>
        <ClassSelection characterObj={newCharacter} setCharacter={setNewCharacter} allAttributes={allAttributes}/>
        <AttributeSelection characterAttributes={newCharacterAttributes} setCharacterAttributes={setNewCharacterAttributes} allAttributes={allAttributes} />
        <EquipmentSelection characterObj={newCharacter} setCharacter={setNewCharacter}/>
        <CharacterInfoSelection characterObj={newCharacter} setCharacter={setNewCharacter}/>
        <CharacterSubmitButton characterObj={newCharacter} characterAttributes={newCharacterAttributes}/>
    </>
}
