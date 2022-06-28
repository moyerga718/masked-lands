import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersDetailedFetch, getAllClassesFetch, getAllSpeciesFetch, getAllSubclassesFetch, getAllBackgroundsFetch, getAllUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import { Loading } from "../Loading"
import "./PublicLibrary.css"

// Component that renders all character cards on home page

export const PublicLibrary = () => {
    const navigate = useNavigate()
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [users, setUsers] = useState([])
    const [species,setSpecies] = useState([])
    const [backgrounds, setBackgrounds] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [loaded, setLoaded] = useState(false)

    //Get all detailed characters
    useEffect(
        () => {
            getAllCharactersDetailedFetch().then(setCharacters)
            getAllUserInformationFetch().then(setUsers)
            getAllSpeciesFetch().then(setSpecies)
            getAllClassesFetch().then(setClasses)
            getAllBackgroundsFetch().then(setBackgrounds)
            getAllSubclassesFetch().then(setSubclasses)
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

    useEffect(
        () => {
            if (filteredCharacters) {
                setLoaded(true)
            }
        },
        [filteredCharacters]
    )

    // return JSX to make characters. For each character, invoke PublicCharacterCard component to generate card.
     return <section className="Public-Library-section">
        <h2 className="library-section-title">Library</h2>
        <div className="Character-Card-Container">
        {
            (!loaded)
            ? <Loading />
            : filteredCharacters.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                allSpecies={species}
                allClasses={classes}
                allBackgrounds={backgrounds}
                allSubclasses={subclasses}
                allUsers={users}
                characterObj={character}/>)
        }
        </div>
    </section>
}