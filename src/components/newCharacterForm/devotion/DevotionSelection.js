import { useState, useEffect } from "react"
import { getAllGodsFetch, getCharacterSubclassByIdFetch } from "../../ApiManager"
import { GodDevotionInput } from "./GodDevotionInput"

export const DevotionSelection = ( {charDevotion, setCharDevotion, characterObj}) => {
    const [gods, setGods] = useState([])
    const [charSubclass, setCharSubclass] = useState({})
    const [availableDevPoints, setAvailableDevPoints] = useState([])

    useEffect(
        () => {
            getAllGodsFetch().then(setGods)
            getCharacterSubclassByIdFetch(characterObj.subclassId).then(setCharSubclass)
        },
        []
    )

    useEffect(
        () => {
            if (charSubclass) {
                setAvailableDevPoints(charSubclass?.devotionPoints)
            }
        },
        [charSubclass]
    )

    return <>
    <h2>Devotion</h2>
    <p>omg you have {availableDevPoints} devotion points to spend!</p>
    <div>
        {
            gods.map( god => <GodDevotionInput 
                key={`god--${god.id}`}
                godObj={god}
                availableDevPoints={availableDevPoints}
                setAvailableDevPoints={setAvailableDevPoints}
            />)
        }
    </div>
    </>
}