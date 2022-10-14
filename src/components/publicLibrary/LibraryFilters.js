import "./LibraryFilters.css"
import { useEffect, useState } from "react"
import { SpeciesFilter } from "./SpeciesFilter"
import { BackgroundFilter } from "./BackgroundFilter"
import { ClassFilter } from "./ClassFilter"
import { SubclassFilter } from "./SubclassFilter"
import { getAllSpeciesAndBackgroundNames } from "../../django-managers/SpeciesManager"
import { getAllClassAndSubclassNames } from "../../django-managers/ClassManager"
import { getAllCharacterCards, getFilteredCharacterCards } from "../../django-managers/CharacterManager"


export const LibraryFilters = ({ setCharacterCardData }) => {

    // State Variables

    const [searchTerms, setSearchTerms] = useState("")
    const [species, setSpecies] = useState([])
    const [classes, setClasses] = useState([])
    const [selectedSpecies, setSelectedSpecies] = useState(0)
    const [selectedBackground, setSelectedBackground] = useState(0)
    const [selectedClass, setSelectedClass] = useState(0)
    const [selectedSubclass, setSelectedSubclass] = useState(0)
    const [speciesBackgrounds, setSpeciesBackgrounds] = useState([])
    const [classSubclasses, setClassSubclasses] = useState([])
    const [filterActive, setFilterActive] = useState(false)

    const [speciesStyle, setSpeciesStyle] = useState({
        color: 'black',
    })
    const [backgroundStyle, setBackgroundStyle] = useState({
        color: 'black',
    })
    const [classStyle, setClassStyle] = useState({
        color: 'black',
    })
    const [subclassStyle, setSubclassStyle] = useState({
        color: 'black',
    })

    // Functions invoked when set/reset filters buttons are clicked

    const setFilters = () => {
        if (searchTerms.length || selectedSpecies || selectedBackground || selectedClass || selectedSubclass) {
            setFilterActive(true)
            getFilteredCharacterCards(searchTerms, selectedSpecies, selectedBackground, selectedClass, selectedSubclass).then(setCharacterCardData)
        }
    }
    
    const resetFilters = () => {
        getAllCharacterCards().then(setCharacterCardData)
        setSearchTerms("")
        setSelectedSpecies(0)
        setSelectedBackground(0)
        setSelectedClass(0)
        setSelectedSubclass(0)
        setFilterActive(false)
    }

    // Get all species/background/class/subclass data on render
    useEffect(
        () => {
            getAllSpeciesAndBackgroundNames().then(setSpecies)
            getAllClassAndSubclassNames().then(setClasses)
        },
        []
    )


    // When a species is selected, get all backgrounds within that species object, set them in their own state variable
    useEffect(
        () => {
            if (selectedSpecies) {
                const speciesObj = species.find(species => species.id === selectedSpecies)
                setSpeciesBackgrounds(speciesObj.backgrounds)
            } else {
                setSpeciesBackgrounds([])
            }

        },
        [selectedSpecies]
    )

    // When a class is selected, get all subclasses within that class object, set them in their own state variable.
    useEffect(
        () => {
            if (selectedClass) {
                const classObj = classes.find(classObj => classObj.id === selectedClass)
                setClassSubclasses(classObj.subclasses)
            } else {
                setClassSubclasses([])
            }

        },
        [selectedClass]
    )

    // Use effects that alter color of dropdown text.
    useEffect(
        () => {
            if (selectedSpecies) {
                setSpeciesStyle({
                    color: '#E84855'
                })
                setBackgroundStyle({
                    color: 'black'
                })
                setSelectedBackground(0)
            } else {
                setSpeciesStyle({
                    color: 'black'
                })
                setBackgroundStyle({
                    color: 'black'
                })
                setSelectedBackground(0)

            }
        },
        [selectedSpecies]
    )

    useEffect(
        () => {
            if (selectedBackground) {
                setBackgroundStyle({
                    color: '#E84855'
                })
            } else {
                setBackgroundStyle({
                    color: 'black'
                })

            }
        },
        [selectedBackground]
    )

    useEffect(
        () => {
            if (selectedClass) {
                setClassStyle({
                    color: '#E84855'
                })
                setSubclassStyle({
                    color: 'black'
                })
                setSelectedSubclass(0)
            } else {
                setClassStyle({
                    color: 'black'
                })
                setSubclassStyle({
                    color: 'black'
                })
                setSelectedSubclass(0)
            }
        },
        [selectedClass]
    )

    useEffect(
        () => {
            if (selectedSubclass) {
                setSubclassStyle({
                    color: '#E84855'
                })
            } else {
                setSubclassStyle({
                    color: 'black'
                })
            }
        },
        [selectedSubclass]
    )


    return <>

        {/* <h2 className="filter-section-title">Filters</h2> */}
        <section className="filter-container">

            <div className="search-bar-div">
                <input
                    className="search-input"
                    value={searchTerms}
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Search by Name" />
            </div>

            <div className="all-dropdown-div">

                <div className="dropdown-filter-div">
                    <select
                        style={speciesStyle}
                        value={selectedSpecies}
                        onChange={(changeEvent) => {
                            setSelectedSpecies(parseInt(changeEvent.target.value))
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
                        value={selectedBackground}
                        onChange={(changeEvent) => {
                            setSelectedBackground(parseInt(changeEvent.target.value))
                        }}
                        disabled={!selectedSpecies}>
                        <option value="0">Background</option>
                        {
                            (speciesBackgrounds.length)
                                ? speciesBackgrounds.map(backgroundObj => <BackgroundFilter
                                    key={`background--${backgroundObj.id}`}
                                    backgroundObj={backgroundObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div className="dropdown-filter-div">
                    <select className="dropdown-select"
                        style={classStyle}
                        value={selectedClass}
                        onChange={(changeEvent) => {
                            setSelectedClass(parseInt(changeEvent.target.value))
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
                        disabled={!selectedClass}
                        style={subclassStyle}
                        value={selectedSubclass}
                        onChange={(changeEvent) => {
                            setSelectedSubclass(parseInt(changeEvent.target.value))
                        }}>
                        <option value="0">Subclass</option>
                        {
                            (classSubclasses.length)
                                ? classSubclasses.map(subclassObj => <SubclassFilter
                                    key={`subclass--${subclassObj.id}`}
                                    subclassObj={subclassObj} />)
                                : <></>
                        }
                    </select>
                </div>

                <div>
                    <button className="filter-btn" onClick={() => setFilters()}>Set filter</button>
                </div>
                {
                    (filterActive)
                        ? <div>
                            <button className="filter-btn" onClick={() => resetFilters()}>Clear filter</button>
                        </div>
                        : <></>
                }
            </div>
        </section>
    </>
}