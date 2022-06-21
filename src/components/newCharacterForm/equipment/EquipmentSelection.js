import { useState, useEffect } from "react"
import { getAllArmorFetch, getAllWeaponsFetch, getSubclassWeaponProficienciesFetch } from "../../ApiManager"
import { WeaponSelectionDropdown } from "./WeaponSelectionDropdown"
import { ArmorSelectionDropdown } from "./ArmorSelectionDropdown"
import { WeaponTypeRadioButton } from "./WeaponTypeRadioButton"
import "../newCharacterForm.css"

//This component renders drop down boxes for weapon and armor selection

export const EquipmentSelection = ({ characterObj, setCharacter }) => {

    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])
    const [charWeaponProfs, setCharWeaponProfs] = useState([])
    const [selectedWeaponType, setSelectedWeaponType] = useState(0)
    const [filteredWeapons, setFilteredWeapons] = useState([])

    //get weapons and armor data when state is initialized 
    useEffect(
        () => {
            getAllWeaponsFetch().then(setWeapons)
            getAllArmorFetch().then(setArmor)
            getSubclassWeaponProficienciesFetch(characterObj?.subclassId).then(setCharWeaponProfs)
        },
        []
    )

    useEffect(
        () => {
            if (selectedWeaponType) {
                const filteredWeapons = weapons.filter( weapon => weapon.weaponTypeId === parseInt(selectedWeaponType))
                setFilteredWeapons(filteredWeapons)
            }
        },
        [selectedWeaponType]
    )

    //render jsx for weapon/armor dropdowns. WeaponSelectionDropdown and ArmorSelectionDropdown components render an option for each weapon/armor obj.
    return <div>
        <h2>EQUIPMENT SELECTION</h2>
        <div className="equipment-container">
            <section>
                <h3>Available Weapon Types</h3>
                <fieldset>
                    <label htmlFor="Weapon Type Selection">Weapon Types:</label>
                    {
                        charWeaponProfs.map(weaponTypeProfObj => <WeaponTypeRadioButton key={`class--${weaponTypeProfObj.weaponTypeId}`}
                            weaponTypeProfObj={weaponTypeProfObj}
                            setSelectedWeaponType={setSelectedWeaponType}
                        />)
                    }
                </fieldset>
            </section>
            <section>
                {
                    (selectedWeaponType)
                        ? <>
                            <h3>Weapon</h3>
                            <select onChange={(changeEvent) => {
                                const copy = { ...characterObj };
                                copy.weaponId = parseInt(changeEvent.target.value);
                                setCharacter(copy);
                            }}>
                                <option value="0">Choose a Weapon</option>
                                {
                                    filteredWeapons.map(weapon => <WeaponSelectionDropdown
                                        key={`weapon--${weapon.id}`}
                                        weaponObj={weapon} />)
                                }
                            </select>
                        </>
                        : <></>
                }
            </section>
            <section>
                <h3>Armor</h3>
                <select onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.armorId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}>
                    <option value="0">Choose your Armor</option>
                    {
                        armor.map(armor => <ArmorSelectionDropdown
                            key={`armor--${armor.id}`}
                            armorObj={armor} />)
                    }
                </select>
            </section>
        </div>
    </div>
}