import { LibraryFilters } from "./LibraryFilters"
import { PublicLibrary } from "./PublicLibrary"
import { useState, useEffect } from "react"
import { getAllCharacterCards } from "../../django-managers/CharacterManager"
import "./PublicLibraryContainer.css"

export const PublicLibraryContainer = () => {
    
    const [characterCardData, setCharacterCardData] = useState([])

    useEffect(
        () => {
            getAllCharacterCards().then(setCharacterCardData)
        },
        []
    )

    return <>
        <section className="public-library-container">
            <div className="public-library-background">
                <div className="library-filters-div">
                    <LibraryFilters setCharacterCardData = {setCharacterCardData}/>
                </div>
                <div className="library-div">
                    <PublicLibrary characterCardData = {characterCardData}/>
                </div>
            </div>
        </section>
    </>
}