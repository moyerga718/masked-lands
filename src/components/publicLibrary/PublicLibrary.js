import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersDetailedFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import "./PublicLibrary.css"

// Component that renders all character cards on home page

export const PublicLibrary = () => {
    const [characters, setCharacters] = useState([])

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    //Get all detailed characters
    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setCharacters)
        },
        []
    )

    //If character list changes (one gets added or deleted, update character list)
    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setCharacters)
        },
        [characters]
    )

    // return JSX to make characters. For each character, invoke PublicCharacterCard component to generate card.
     return <section className="Public-Library-section">
        <h3>All Characters</h3>
        <div className="Character-Card-Container">
        {
            characters.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                characterObj={character}/>)
        }
        </div>
    </section>
}