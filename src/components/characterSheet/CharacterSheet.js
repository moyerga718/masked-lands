import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getCharacterById } from "../ApiManager"

export const CharacterSheet = () => {
    const navigate = useNavigate()
    const {characterId} = useParams()
    const [characterInfo, setCharacterInfo] = useState({})

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getCharacterById(characterId)
            .then( characterArray => {
                setCharacterInfo(characterArray[0])
            })
        },
        []
    )

    const deleteCharacter = () => {
        deleteCharacterFetch(characterId)
        .then(
            navigate("/")
        )
    }

    return <>
    <div>
        <h2>{characterInfo.name}</h2>
    </div>
    <div>
        {
            (characterInfo.userId === mlUserObject.id)
            ? <>
                <button onClick={()=> deleteCharacter()}>Delete</button>
            </>
            : <></>
        }
    </div>
    </>
}