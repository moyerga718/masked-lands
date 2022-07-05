import { useState, useEffect } from "react"
import { getAllClassesFetch, getAllSubclassesFetch, getSubclassesByClassIdFetch } from "../../ApiManager"
import { ClassRadioButton } from "./ClassRadioButton"
import "../newCharacterForm.css"

//This component renders a section where user can choose a class

export const ClassSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])

    //Get all class information
    useEffect(
        () => {
            getAllClassesFetch().then(setClasses)
            getAllSubclassesFetch().then(setSubclasses)
        },
        []
    )

    

    // For every class, invoke the ClassRadioButton component to create all radio buttons.
    return <>
        <h2 className="form-section-title">Class</h2>
        <div className="character-feature-selection-div-container">
            {
                classes.map(classObj => <ClassRadioButton key={`class--${classObj.id}`}
                classObj={classObj}
                characterObj={characterObj}
                setCharacter={setCharacter}
                allAttributes={allAttributes}
                subclasses={subclasses}
                />)
            }
        </div>
        </>

}
