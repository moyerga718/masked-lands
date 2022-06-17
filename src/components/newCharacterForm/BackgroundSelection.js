import { useState, useEffect } from "react"
import { getSpeciesBackgroundsFetch, getSpeciesByIdFetch } from "../ApiManager"
import { BackgroundRadioButton } from "./BackgroundRadioButton"

//This component renders a section where user can choose a background

export const BackgroundSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [backgrounds, setBackgrounds] = useState([])
    const [charSpecies, setCharSpecies] = useState({})

    //Get all Background information for the characters selected species
    useEffect(
        () => {
            if (characterObj.speciesId) {
                getSpeciesBackgroundsFetch(characterObj.speciesId).then(setBackgrounds)
                getSpeciesByIdFetch(characterObj.speciesId).then(setCharSpecies)
            }
        },
        []
    )

    // For every background, invoke the speciesRadioButton component to create all radio buttons.
    
        return <>
            <h2>Background: {charSpecies.name} </h2>
            <fieldset>
                <label htmlFor="backgrounds">Backgrounds:</label>
                {
                    backgrounds.map(backgroundObj => <BackgroundRadioButton key={`backgroundd--${backgroundObj.id}`}
                        backgroundObj={backgroundObj}
                        characterObj={characterObj}
                        setCharacter={setCharacter}
                        allAttributes={allAttributes}
                    />)
                }
            </fieldset>
        </>
    
}