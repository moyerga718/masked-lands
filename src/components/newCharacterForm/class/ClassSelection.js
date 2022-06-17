import { useState, useEffect } from "react"
import { getAllClassesFetch } from "../../ApiManager"
import { ClassRadioButton } from "./ClassRadioButton"

//This component renders a section where user can choose a class

export const ClassSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [classes, setClasses] = useState([])

    //Get all class information
    useEffect(
        () => {
            getAllClassesFetch().then(setClasses)
        },
        []
    )

    // For every class, invoke the ClassRadioButton component to create all radio buttons.
    return <>
        <h2>Class</h2>
        <fieldset>
            <label htmlFor="class">Classes:</label>
            {
                classes.map(classObj => <ClassRadioButton key={`class--${classObj.id}`}
                classObj={classObj}
                characterObj={characterObj}
                setCharacter={setCharacter}
                allAttributes={allAttributes}
                />)
            }
        </fieldset>
        </>

}
