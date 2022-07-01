import { useState, useEffect } from "react"
import { getAllGodsFetch, getCharacterSubclassByIdFetch } from "../../ApiManager"
import { GodDevotionInput } from "./GodDevotionInput"
import "./DevotionSelection.css"

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
    <h4>Devotion points available: {availableDevPoints}</h4>
    {/* {
        (availableDevPoints === 1)
        ? <h4>You have {availableDevPoints} devotion point to spend</h4>
        : <h4>You have {availableDevPoints} devotion points to spend</h4>
    } */}
    
    <div className="god-div-container">
        {
            gods.map( god => <GodDevotionInput 
                key={`god--${god.id}`}
                godObj={god}
                charSubclass={charSubclass}
                charDevotion={charDevotion}
                setCharDevotion={setCharDevotion}
                availableDevPoints={availableDevPoints}
                setAvailableDevPoints={setAvailableDevPoints}
            />)
        }
    </div>
    </>
}