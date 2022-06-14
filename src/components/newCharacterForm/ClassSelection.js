import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllClassesFetch } from "../ApiManager"
import { ClassRadioButton } from "./ClassRadioButton"

export const ClassSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [classes, setClasses] = useState([])

    useEffect(
        () => {
            getAllClassesFetch().then(setClasses)
        },
        []
    )

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
