import { useState, useEffect } from "react"
import { getAllSpeciesFetch } from "../ApiManager"
import { SpeciesRadioButton } from "./SpeciesRadioButton"

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
        <h2>Species</h2>
        <fieldset>
            <label htmlFor="species">Species:</label>
            {
                species.map(speciesObj => <SpeciesRadioButton key={`species--${speciesObj.id}`}
                speciesObj={speciesObj}
                characterObj={characterObj}
                setCharacter={setCharacter}
                allAttributes={allAttributes}
                />)
            }
        </fieldset>
        </>
}