import { useState, useEffect } from "react"
import { getSpeciesBackgroundsWithAttBonusesFetch, getSpeciesByIdFetch } from "../../ApiManager"
import { BackgroundRadioButton } from "./BackgroundRadioButton"
import "../newCharacterForm.css"

//This component renders a section where user can choose a background

export const BackgroundSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [backgrounds, setBackgrounds] = useState([])
    const [charSpecies, setCharSpecies] = useState({})

    //Get all Background information for the characters selected species
    useEffect(
        () => {
            if (characterObj.speciesId) {
                getSpeciesBackgroundsWithAttBonusesFetch(characterObj.speciesId).then(setBackgrounds)
                getSpeciesByIdFetch(characterObj.speciesId).then(setCharSpecies)
            }
        },
        []
    )

    // For every background, invoke the speciesRadioButton component to create all radio buttons.
    
        return <>
            <h2 className="form-section-title">Background: {charSpecies.name} </h2>
            <div className="character-feature-selection-div-container">
                {
                    backgrounds.map(backgroundObj => <BackgroundRadioButton key={`background--${backgroundObj.id}`}
                        backgroundObj={backgroundObj}
                        characterObj={characterObj}
                        setCharacter={setCharacter}
                        allAttributes={allAttributes}
                    />)
                }
            </div>
        </>
    
}