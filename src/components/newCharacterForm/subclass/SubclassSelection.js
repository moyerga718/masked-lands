import { useState, useEffect } from "react"
import { getSubclassesByClassIdFetch, getClassByIdFetch, getAllSubclassWeaponProficienciesFetch, getAllSubclassArmorProficienciesFetch } from "../../ApiManager"
import { SubclassRadioButton } from "./SubclassRadioButton"
import "../newCharacterForm.css"
//This component renders a section where user can choose a subclass

export const SubclassSelection = ({ characterObj, setCharacter, allAttributes }) => {
    const [subclasses, setSubclasses] = useState([])
    const [charClass, setCharClass] = useState({})
    const [allSubclassWeaponProfs, setAllSubclassWeaponProfs] = useState([])
    const [allSubclassArmorProfs, setAllSubclassArmorProfs] = useState([])

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

    useEffect(
        () => {
            getAllSubclassWeaponProficienciesFetch().then(setAllSubclassWeaponProfs)
            getAllSubclassArmorProficienciesFetch().then(setAllSubclassArmorProfs)

        },
        []
    )

    // For every subclass, invoke the subclassRadioButton component to create all radio buttons.

    return <>
        <h2 className="form-section-title">Subclass</h2>
        <div className="character-feature-selection-div-container">
            {
                subclasses.map(subclassObj => <SubclassRadioButton key={`subclass--${subclassObj.id}`}
                    subclassObj={subclassObj}
                    characterObj={characterObj}
                    setCharacter={setCharacter}
                    allSubclassWeaponProfs={allSubclassWeaponProfs}
                    allSubclassArmorProfs={allSubclassArmorProfs}
                    allAttributes={allAttributes}
                />)
            }
        </div>
    </>

}