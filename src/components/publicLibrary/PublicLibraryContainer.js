import { LibraryFilters } from "./LibraryFilters"
import { PublicLibrary } from "./PublicLibrary"
import { useState } from "react"
import "./PublicLibraryContainer.css"

export const PublicLibraryContainer = () => {
    const [searchTerms, setSearchTerms] = useState({
        id: 1,
        value: ""
    })
    const [speciesFilter, setSpeciesFilter] = useState({
        id: 2,
        value: "0"
    })
    const [backgroundFilter, setBackgroundFilter] = useState({
        id: 3,
        value: "0"
    })
    const [classFilter, setClassFilter] = useState({
        id: 4,
        value: "0"
    })
    const [subclassFilter, setSubclassFilter] = useState({
        id: 5,
        value: "0"
    })

    return <>
        <section className="public-library-container">
            <div className="public-library-background">
                <div className="library-filters-div">
                    <LibraryFilters searchTerms={searchTerms} setSearchTerms={setSearchTerms} speciesFilter={speciesFilter} setSpeciesFilter={setSpeciesFilter} backgroundFilter={backgroundFilter} setBackgroundFilter={setBackgroundFilter} classFilter={classFilter} setClassFilter={setClassFilter} subclassFilter={subclassFilter} setSubclassFilter={setSubclassFilter}/>
                </div>
                <div className="library-div">
                    <PublicLibrary searchTerms={searchTerms} speciesFilter={speciesFilter} backgroundFilter={backgroundFilter} classFilter={classFilter} subclassFilter={subclassFilter}/>
                </div>
            </div>
        </section>
    </>
}