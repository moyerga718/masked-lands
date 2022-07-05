import "./LibraryFilters.css"
import { useEffect, useState } from "react"
import { getAllBackgroundsFetch, getAllSpeciesFetch, getAllClassesFetch, getAllSubclassesFetch } from "../ApiManager"
import { SpeciesFilter } from "./SpeciesFilter"
import { BackgroundFilter } from "./BackgroundFilter"
import { ClassFilter } from "./ClassFilter"
import { SubclassFilter } from "./SubclassFilter"

export const LibraryFilters = ({ searchTerms, setSearchTerms, speciesFilter, setSpeciesFilter, backgroundFilter, setBackgroundFilter, classFilter, setClassFilter, subclassFilter, setSubclassFilter }) => {
    const [backgrounds, setBackgrounds] = useState([])
    const [species, setSpecies] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [backgroundsFilteredBySpecies, setBackgroundsFilteredBySpecies] = useState([])
    const [subclassesFilteredByClass, setSubclassesFilteredByClass] = useState([])
    const [backgroundDisabled, setBackgroundDisabled] = useState(true)
    const [subclassDisabled, setSubclassDisabled] = useState(true)
    const [speciesSelected, setSpeciesSelected] = useState(false)
    const [speciesStyle, setSpeciesStyle] = useState({
        color: 'black',
    })
    const [backgroundSelected, setBackgroundSelected] = useState(false)
    const [backgroundStyle, setBackgroundStyle] = useState({
        color: 'black',
    })
    const [classSelected, setClassSelected] = useState(false)
    const [classStyle, setClassStyle] = useState({
        color: 'black',
    })
    const [subclassSelected, setSubclassSelected] = useState(false)
    const [subclassStyle, setSubclassStyle] = useState({
        color: 'black',
    })

    const resetFilters = () => {
        const searchFilterCopy = {...searchTerms}
        searchFilterCopy.value=""
        setSearchTerms(searchFilterCopy)
        const speciesFilterCopy = {...speciesFilter}
        speciesFilterCopy.value = "0"
        setSpeciesFilter(speciesFilterCopy)
        const backgroundFilterCopy = {...backgroundFilter}
        backgroundFilterCopy.value="0"
        setBackgroundFilter(backgroundFilterCopy)
        const classFilterCopy = {...classFilter}
        classFilterCopy.value = "0"
        setClassFilter(classFilterCopy)
        const subclassFilterCopy = {...subclassFilter}
        subclassFilterCopy.value = "0"
        setSubclassFilter(subclassFilterCopy)
    }

    useEffect(
        () => {
            getAllSpeciesFetch().then(setSpecies)
            getAllBackgroundsFetch().then(setBackgrounds)
            getAllClassesFetch().then(setClasses)
            getAllSubclassesFetch().then(setSubclasses)
        },
        []
    )

    useEffect(
        () => {
            if (backgroundFilter.value !== "0") {
                setBackgroundSelected(true)
            } else {
                setBackgroundSelected(false)
            }
        },
        [backgroundFilter]
    )

    useEffect(
        () => {
            if (speciesFilter.value !== "0" && backgrounds) {
                const filteredBackgrounds = backgrounds.filter(background => background.speciesId === parseInt(speciesFilter.value))
                setBackgroundsFilteredBySpecies(filteredBackgrounds)
                setBackgroundDisabled(false)
                setSpeciesSelected(true)
            } else if (speciesFilter.value === "0") {
                setBackgroundsFilteredBySpecies([])
                const backgroundFilterCopy = {...backgroundFilter}
                backgroundFilterCopy.value = "0"
                setBackgroundFilter(backgroundFilterCopy)
                setBackgroundDisabled(true)
                setSpeciesSelected(false)
                setBackgroundSelected(false)
            }
        },
        [speciesFilter]
    )

    useEffect(
        () => {
            if (classFilter.value !== "0" && subclasses) {
                const filteredSubclasses = subclasses.filter(subclass => subclass.classId === parseInt(classFilter.value))
                setSubclassesFilteredByClass(filteredSubclasses)
                setSubclassDisabled(false)
                setClassSelected(true)
            } else if (classFilter.value === "0") {
                setSubclassesFilteredByClass([])
                const subclassFilterCopy = {...subclassFilter}
                subclassFilterCopy.value = "0"
                setSubclassFilter(subclassFilterCopy)
                setSubclassDisabled(true)
                setClassSelected(false)
                setSubclassSelected(false)
            }
        },
        [classFilter]
    )

    useEffect(
        () => {
            if (subclassFilter.value !== "0") {
                setSubclassSelected(true)
            } else {
                setSubclassSelected(false)
            }
        },
        [subclassFilter]
    )

    useEffect(
        () => {
            if (speciesSelected) {
                setSpeciesStyle({
                    color:'#E84855'
                })
            } else {
                setSpeciesStyle({
                    color: 'black'
                })

            }
        },
        [speciesSelected]
    )

    useEffect(
        () => {
            if (backgroundSelected) {
                setBackgroundStyle({
                    color:'#E84855'
                })
            } else {
                setBackgroundStyle({
                    color: 'black'
                })

            }
        },
        [backgroundSelected]
    )

    useEffect(
        () => {
            if (classSelected) {
                setClassStyle({
                    color:'#E84855'
                })
            } else {
                setClassStyle({
                    color: 'black'
                })

            }
        },
        [classSelected]
    )

    useEffect(
        () => {
            if (subclassSelected) {
                setSubclassStyle({
                    color:'#E84855'
                })
            } else {
                setSubclassStyle({
                    color: 'black'
                })

            }
        },
        [subclassSelected]
    )


    return <>

        {/* <h2 className="filter-section-title">Filters</h2> */}
        <section className="filter-container">

            <div className="search-bar-div">
                <input
                    className="search-input"
                    value={searchTerms.value}
                    onChange={
                        (changeEvent) => {
                            const searchObjCopy = { ...searchTerms }
                            searchObjCopy.value = changeEvent.target.value
                            setSearchTerms(searchObjCopy)
                        }
                    }
                    type="text" placeholder="Search by Name" />
            </div>

            <div className="all-dropdown-div">

                <div className="dropdown-filter-div">
                    <select
                        style={speciesStyle}
                        value={speciesFilter.value}
                        onChange={(changeEvent) => {
                            const speciesFilterCopy = { ...speciesFilter }
                            speciesFilterCopy.value = changeEvent.target.value
                            
                            setSpeciesFilter(speciesFilterCopy)
                        }}
                    >
                        <option value="0">Species</option>
                        {
                            (species)
                                ? species.map(speciesObj => <SpeciesFilter
                                    key={`species--${speciesObj.id}`}
                                    speciesObj={speciesObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div className="dropdown-filter-div">
                    <select 
                    style={backgroundStyle}
                        value={backgroundFilter.value}
                        onChange={(changeEvent) => {
                            const backgroundFilterCopy = { ...backgroundFilter }
                            backgroundFilterCopy.value = changeEvent.target.value
                            setBackgroundFilter(backgroundFilterCopy)
                        }}
                        disabled={backgroundDisabled}>
                        <option value="0">Background</option>
                        {
                            (backgroundsFilteredBySpecies)
                                ? backgroundsFilteredBySpecies.map(backgroundObj => <BackgroundFilter
                                    key={`background--${backgroundObj.id}`}
                                    backgroundObj={backgroundObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div className="dropdown-filter-div">
                    <select className="dropdown-select" 
                    style={classStyle}
                    value={classFilter.value}
                        onChange={(changeEvent) => {
                            const classFilterCopy = { ...classFilter }
                            classFilterCopy.value = changeEvent.target.value
                            setClassFilter(classFilterCopy)
                        }}>
                        <option value="0">Class</option>
                        {
                            (classes)
                                ? classes.map(classObj => <ClassFilter
                                    key={`class--${classObj.id}`}
                                    classObj={classObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div className="dropdown-filter-div">
                    <select
                        disabled={subclassDisabled}
                        style={subclassStyle}
                        value={subclassFilter.value}
                        onChange={(changeEvent) => {
                            const subclassFilterCopy = { ...subclassFilter }
                            subclassFilterCopy.value = changeEvent.target.value
                            setSubclassFilter(subclassFilterCopy)
                        }}>
                        <option value="0">Subclass</option>
                        {
                            (subclassesFilteredByClass)
                                ? subclassesFilteredByClass.map(subclassObj => <SubclassFilter
                                    key={`subclass--${subclassObj.id}`}
                                    subclassObj={subclassObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div>
                    <button className="filter-btn" onClick={() => resetFilters()}>Clear filter</button>
                </div>
            </div>
        </section>
    </>
}