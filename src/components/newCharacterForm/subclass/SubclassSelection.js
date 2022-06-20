import { useState, useEffect } from "react"
import { getSubclassesByClassIdFetch, getClassByIdFetch } from "../../ApiManager"
import { SubclassRadioButton } from "./SubclassRadioButton"

//This component renders a section where user can choose a subclass

export const SubclassSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [subclasses, setSubclasses] = useState([])
    const [charClass, setCharClass] = useState({})

    //Get all subclass information for the characters selected species
    useEffect(
        () => {
            if (characterObj.classId) {
                getSubclassesByClassIdFetch(characterObj?.classId).then(setSubclasses)
                getClassByIdFetch(characterObj?.classId).then(setCharClass)
            }
        },
        [characterObj]
    )

    // For every subclass, invoke the subclassRadioButton component to create all radio buttons.

    return <>
        <h2>Subclass: {charClass.name} </h2>
        <fieldset>
            <label htmlFor="subclasses">Subclasses:</label>
            {
                subclasses.map(subclassObj => <SubclassRadioButton key={`subclass--${subclassObj.id}`}
                    subclassObj={subclassObj}
                    characterObj={characterObj}
                    setCharacter={setCharacter}
                    allAttributes={allAttributes}
                />)
            }
        </fieldset>
    </>

}