import { LibraryFilters } from "./LibraryFilters"
import { PublicLibrary } from "./PublicLibrary"
import { useState } from "react"
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
                    <LibraryFilters searchTerms={searchTerms} setSearchTerms={setSearchTerms} speciesFilter={speciesFilter} setSpeciesFilter={setSpeciesFilter} backgroundFilter={backgroundFilter} setBackgroundFilter={setBackgroundFilter} classFilter={classFilter} setClassFilter={setClassFilter} subclassFilter={subclassFilter} setSubclassFilter={setSubclassFilter}/>
                </div>
                <div className="library-div">
                    <PublicLibrary characterCardData = {characterCardData}/>
                </div>
            </div>
        </section>
    </>
}