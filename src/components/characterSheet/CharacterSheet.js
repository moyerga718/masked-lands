import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getCharacterById, getAllAttributesFetch } from "../ApiManager"
import { AttributeList } from "./AttributeList"

export const CharacterSheet = () => {
    const navigate = useNavigate()
    const { characterId } = useParams()
    const [characterInfo, setCharacterInfo] = useState({})
    const [characterAttributes, setCharacterAttributes] = useState([])
    const [attributes, setAttributes] = useState([])

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getCharacterById(characterId)
                .then(characterArray => {
                    setCharacterInfo(characterArray[0])
                })
            getAllAttributesFetch().then(setAttributes)
        },
        []
    )

    useEffect(
        () => {
            setCharacterAttributes(characterInfo.characterAttributes)
            console.log(characterAttributes)
        },
        [characterInfo]
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
                        <button onClick={() => deleteCharacter()}>Delete</button>
                    </>
                    : <></>
            }
        </div>
        <div>
            <h3>Character Attributes</h3>
            {
                (characterAttributes)
                    ? <>
                        {
                            characterAttributes.map(
                                charAtt => {
                                    const foundAttribute = attributes.find(att => att.id === charAtt.attributeId)
                                    return <p>{foundAttribute?.name}: {charAtt.value}</p>
                                }
                            )
                        }
                    </>
                    : <></>
            }
        </div>
    </>
}