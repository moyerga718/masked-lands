import { useState, useEffect } from "react"
import { getAllArmorFetch, getAllWeaponsFetch, getSubclassWeaponProficienciesFetch, getSubclassArmorProficienciesFetch } from "../../ApiManager"
import { WeaponSelectionDropdown } from "./WeaponSelectionDropdown"
import { ArmorSelectionDropdown } from "./ArmorSelectionDropdown"
import { WeaponTypeRadioButton } from "./WeaponTypeRadioButton"
import { ArmorTypeRadioButton } from "./ArmorTypeRadioButton"
import "../newCharacterForm.css"
import "./EquipmentSelection.css"
import { WeaponSelectionRadioButton } from "./WeaponSelectionRadioButton"
import { ArmorSelectionRadioButton } from "./ArmorSelectionRadioButton"


//This component renders drop down boxes for weapon and armor selection

export const EquipmentSelection = ({ characterObj, setCharacter }) => {

    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])
    const [charWeaponProfs, setCharWeaponProfs] = useState([])
    const [charArmorProfs, setCharArmorProfs] = useState([])
    const [selectedWeaponType, setSelectedWeaponType] = useState(0)
    const [selectedArmorType, setSelectedArmorType] = useState(0)
    const [filteredWeapons, setFilteredWeapons] = useState([])
    const [filteredArmor, setFilteredArmor] = useState([])

    //get weapons and armor data when state is initialized 
    useEffect(
        () => {
            getAllWeaponsFetch().then(setWeapons)
            getAllArmorFetch().then(setArmor)
            getSubclassWeaponProficienciesFetch(characterObj?.subclassId).then(setCharWeaponProfs)
            getSubclassArmorProficienciesFetch(characterObj?.subclassId).then(setCharArmorProfs)
        },
        []
    )

    useEffect(
        () => {
            if (selectedWeaponType) {
                const filteredWeapons = weapons.filter(weapon => weapon.weaponTypeId === parseInt(selectedWeaponType))
                setFilteredWeapons(filteredWeapons)
            }
        },
        [selectedWeaponType]
    )

    useEffect(
        () => {
            if (selectedArmorType) {
                const filteredArmor = armor.filter(armor => armor.armorTypeId === parseInt(selectedArmorType))
                setFilteredArmor(filteredArmor)
            }
        },
        [selectedArmorType]
    )

    //render jsx for weapon/armor dropdowns. WeaponSelectionDropdown and ArmorSelectionDropdown components render an option for each weapon/armor obj.
    return <div>
        <h2>Equipment</h2>
        <div className="equipment-container">

            <section className="weapon-selection-column">
                <h3>Available Weapon Types</h3>
                <section className="prof-selection-container">

                    {
                        charWeaponProfs.map(weaponTypeProfObj => <WeaponTypeRadioButton key={`class--${weaponTypeProfObj.weaponTypeId}`}
                            weaponTypeProfObj={weaponTypeProfObj}
                            setSelectedWeaponType={setSelectedWeaponType}
                        />)
                    }

                </section>
                <section>
                    {
                        (selectedWeaponType)
                            ? <>
                                <h3>Weapons</h3>
                                <section className="equip-selection-container">
                                    {
                                        filteredWeapons.map(weapon => <WeaponSelectionRadioButton
                                            key={`weapon--${weapon.id}`}
                                            weaponObj={weapon}
                                            characterObj={characterObj}
                                            setCharacter={setCharacter}
                                        />)
                                    }
                                </section>

                            </>
                            : <></>
                    }
                </section>
            </section>
            <section className="armor-selection-column">
                <h3>Available Armor Types</h3>
                <section className="prof-selection-container">
                    {
                        charArmorProfs.map(armorTypeProfObj => <ArmorTypeRadioButton key={`class--${armorTypeProfObj.armorTypeId}`}
                            armorTypeProfObj={armorTypeProfObj}
                            setSelectedArmorType={setSelectedArmorType}
                        />)
                    }
                </section>

                <section>
                    {
                        (selectedArmorType)
                            ? <>
                                <h3>Armor</h3>
                                <section className="equip-selection-container">
                                    {
                                        filteredArmor.map(armor => <ArmorSelectionRadioButton
                                            key={`armor--${armor.id}`}
                                            armorObj={armor}
                                            characterObj={characterObj}
                                            setCharacter={setCharacter}
                                        />)
                                    }
                                </section>

                            </>
                            : <></>
                    }
                </section>
            </section>
        </div>
    </div>
}