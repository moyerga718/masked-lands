import { useState, useEffect } from "react"
import { getAllArmorFetch, getAllWeaponsFetch } from "../../ApiManager"
import { WeaponSelectionDropdown } from "./WeaponSelectionDropdown"
import { ArmorSelectionDropdown } from "./ArmorSelectionDropdown"
import "../newCharacterForm.css"

//This component renders drop down boxes for weapon and armor selection

export const EquipmentSelection = ( {characterObj, setCharacter} ) => {

    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])

    //get weapons and armor data when state is initialized 
    useEffect(
        () => {
            getAllWeaponsFetch().then(setWeapons)
            getAllArmorFetch().then(setArmor)
        },
        []
    )

    //render jsx for weapon/armor dropdowns. WeaponSelectionDropdown and ArmorSelectionDropdown components render an option for each weapon/armor obj.
    return <div>
        <h2>EQUIPMENT SELECTION</h2>
        <div className="equipment-container">
            <section>
                <h3>Weapon</h3>
                <select onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.weaponId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}>
                    <option value="0">Choose a Weapon</option>
                    {
                        weapons.map(weapon => <WeaponSelectionDropdown 
                            key={`weapon--${weapon.id}`}
                            weaponObj={weapon}/>)
                    }
                </select>
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