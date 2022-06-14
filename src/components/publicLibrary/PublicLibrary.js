import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersDetailedFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import "./PublicLibrary.css"

export const PublicLibrary = () => {
    const [characters, setCharacters] = useState([])

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setCharacters)
        },
        []
    )


     
     return <section className="Public-Library-section">
        <h3>All Characters</h3>
        <div className="Character-Card-Container">
        {
            characters.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                characterObj={character}
                userObj={mlUserObject}/>)
        }
        </div>
    </section>
}