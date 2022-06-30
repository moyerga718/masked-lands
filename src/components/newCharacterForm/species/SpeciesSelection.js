import { useState, useEffect } from "react"
import { getAllSpeciesFetch } from "../../ApiManager"
import { SpeciesRadioButton } from "./SpeciesRadioButton"
import "../newCharacterForm.css"

//This component renders a section where user can choose a species

export const SpeciesSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [species, setSpecies] = useState([])

    //Get all Species information
    useEffect(
        () => {
            getAllSpeciesFetch().then(setSpecies)
        },
        []
    )

    // For every species, invoke the speciesRadioButton component to create all radio buttons.
    return <>
        <h2 className="form-section-title">Species</h2>
        <div className="character-feature-selection-div-container">
            
            {
                species.map(speciesObj => <SpeciesRadioButton key={`species--${speciesObj.id}`}
                    speciesObj={speciesObj}
                    characterObj={characterObj}
                    setCharacter={setCharacter}
                    allAttributes={allAttributes}
                />)
            }
            
        </div>
    </>
}