import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllCharacterCards } from "../../django-managers/CharacterManager"
import { getAllCharactersDetailedFetch, getAllClassesFetch, getAllSpeciesFetch, getAllSubclassesFetch, getAllBackgroundsFetch, getAllUserInformationFetch } from "../ApiManager"
import { PublicCharacterCard } from "./PublicCharacterCard"
import "./PublicLibrary.css"

// Component that renders all character cards on home page

export const PublicLibrary = ( {characterCardData} ) => {

    // return JSX to make characters. For each character, invoke PublicCharacterCard component to generate card.
     return <section className="Public-Library-section">
        <h2 className="library-section-title">Character Library</h2>
        <div className="Character-Card-Container">
        {
            (characterCardData) 
            ? characterCardData.map( character => <PublicCharacterCard 
                key={`character--${character.id}`}
                characterData={character}/>)
            : <></>
        }
        </div>
    </section>
}