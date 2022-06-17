import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersDetailedFetch, getAllSpeciesFetch, getAllUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import "./PublicLibrary.css"

// Component that renders all character cards on home page

export const PublicLibrary = () => {
    const navigate = useNavigate()
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [users, setUsers] = useState([])
    const [species,setSpecies] = useState([])

    //Get all detailed characters
    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setCharacters)
            getAllUserInformationFetch().then(setUsers)
            getAllSpeciesFetch().then(setSpecies)
        },
        []
    )

    //If character list changes (one gets added or deleted, update character list)
    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setFilteredCharacters)
        },
        [characters]
    )

    // return JSX to make characters. For each character, invoke PublicCharacterCard component to generate card.
     return <section className="Public-Library-section">
        <h3>All Characters</h3>
        <button onClick={
            () => {
                navigate(`/create`)
            }
        }> + Create</button>
        <div className="Character-Card-Container">
        {
            filteredCharacters.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                allSpecies={species}
                allUsers={users}
                characterObj={character}/>)
        }
        </div>
    </section>
}