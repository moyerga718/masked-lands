//This component is just a container for the different pages of the character creation form so that character state can be passed from one page to another? Will it work? who knows
import { useState, useEffect } from "react"
import { ClassSelection } from "./ClassSelection"
import { AttributeSelection } from "./AttributeSelection"
import { EquipmentSelection } from "./EquipmentSelection"
import { CharacterInfoSelection } from "./CharacterInfoSelection"
import { CharacterSubmitButton } from "./CharacterSubmitButton"
import { getAllAttributesFetch } from "../ApiManager"

export const NewCharacterFormContainer = () => {

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
    const [allAttributes, setAllAttributes] = useState([])

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getAllAttributesFetch().then(setAllAttributes)
            const copy = {...newCharacter}
            copy.userId = mlUserObject.id
            setNewCharacter(copy) 
        },
        []
    )

    return <>
        <h2>Make a New Character</h2>
        <ClassSelection characterObj={newCharacter} setCharacter={setNewCharacter} attributes={allAttributes}/>
        <AttributeSelection characterObj={newCharacter} setCharacter={setNewCharacter} attributes={allAttributes}/>
        <EquipmentSelection characterObj={newCharacter} setCharacter={setNewCharacter}/>
        <CharacterInfoSelection characterObj={newCharacter} setCharacter={setNewCharacter}/>
        <CharacterSubmitButton characterObj={newCharacter}/>
    </>
}