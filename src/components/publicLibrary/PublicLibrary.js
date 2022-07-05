import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharactersDetailedFetch, getAllClassesFetch, getAllSpeciesFetch, getAllSubclassesFetch, getAllBackgroundsFetch, getAllUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import "./PublicLibrary.css"

// Component that renders all character cards on home page

export const PublicLibrary = ( {searchTerms, speciesFilter, backgroundFilter, classFilter, subclassFilter} ) => {

    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [sortedFilteredCharacters, setSortedFilteredCharacters] = useState([])
    const [users, setUsers] = useState([])
    const [species,setSpecies] = useState([])
    const [backgrounds, setBackgrounds] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [filterBooleans, setFilterBooleans] = useState([
        {
            filterId: 1,
            filterType: "name",
            activated: false
        },
        {
            filterId: 2,
            filterType: "speciesId",
            activated: false
        },
        {
            filterId: 3,
            filterType: "backgroundId",
            activated: false
        },
        {
            filterId: 4,
            filterType: "classId",
            activated: false
        },
        {
            filterId: 5,
            filterType: "subclassId",
            activated: false
        }
    ])

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
                const copy = [...filteredCharacters]
                const sorted = copy.sort((a,b) => {
                    return b.id - a.id
                })
                setSortedFilteredCharacters(sorted)
            }
        },
        [filteredCharacters]
    )

    const filterCharactersByNameSearch = (characterArray) => {
        if (searchTerms.value !== "") {
            return characterArray.filter( character => {
                return character.name.toLowerCase().includes(searchTerms.value.toLowerCase())
            })
        } else {
            return characterArray
        }
    }

    const filterCharactersBySpecies = (characterArray) => {
        if (speciesFilter.value !== "0") {
            return characterArray.filter( character => character.speciesId === parseInt(speciesFilter.value))
        } else {
            return characterArray
        }
    }

    const filterCharactersByBackground = (characterArray) => {
        if (backgroundFilter.value !== "0") {
            return characterArray.filter( character => character.backgroundId === parseInt(backgroundFilter.value))
        } else {
            return characterArray
        }
    }

    const filterCharactersByClass = (characterArray) => {
        if (classFilter.value !== "0") {
            return characterArray.filter( character => character.classId === parseInt(classFilter.value))
        } else {
            return characterArray
        }
    }

    const filterCharactersBySubclass = (characterArray) => {
        if (subclassFilter.value !== "0") {
            return characterArray.filter( character => character.subclassId === parseInt(subclassFilter.value))
        } else {
            return characterArray
        }
    }

    useEffect(
        () => {
            let arrayToFilter = [...characters]
            arrayToFilter = filterCharactersByNameSearch(arrayToFilter)
            arrayToFilter = filterCharactersBySpecies(arrayToFilter)
            arrayToFilter = filterCharactersByBackground(arrayToFilter)
            arrayToFilter = filterCharactersByClass(arrayToFilter)
            arrayToFilter = filterCharactersBySubclass(arrayToFilter)
            setFilteredCharacters(arrayToFilter)
        },
        [searchTerms, speciesFilter, backgroundFilter, classFilter, subclassFilter]
    )

    // return JSX to make characters. For each character, invoke PublicCharacterCard component to generate card.
     return <section className="Public-Library-section">
        <h2 className="library-section-title">Character Library</h2>
        <div className="Character-Card-Container">
        {
            (filteredCharacters) 
            ? sortedFilteredCharacters.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                allSpecies={species}
                allClasses={classes}
                allBackgrounds={backgrounds}
                allSubclasses={subclasses}
                allUsers={users}
                characterObj={character}/>)
            : <></>
            
            //</>characters.map( character => <PublicCharacterCard 
            //     key={`character--${character.id}`}
            //     allSpecies={species}
            //     allClasses={classes}
            //     allBackgrounds={backgrounds}
            //     allSubclasses={subclasses}
            //     allUsers={users}
            //     characterObj={character}/>)
        }
        </div>
    </section>
}