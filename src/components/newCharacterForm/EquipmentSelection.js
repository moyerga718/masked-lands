import { useState, useEffect } from "react"
import { getAllArmorFetch, getAllWeaponsFetch } from "../ApiManager"
import "./newCharacterForm.css"

export const EquipmentSelection = ( {characterObj, setCharacter} ) => {

    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])

    useEffect(
        () => {
            getAllWeaponsFetch().then(setWeapons)
            getAllArmorFetch().then(setArmor)
        },
        []
    )

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
                        weapons.map(weapon => <option value={weapon.id}>{weapon.name}: 1d{weapon.damageDie}</option>)
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
                        armor.map(armor => <option value={armor.id}>{armor.name}: AC {armor.defenseRating}</option>)
                    }
                </select>
            </section>
        </div>
    </div>
}