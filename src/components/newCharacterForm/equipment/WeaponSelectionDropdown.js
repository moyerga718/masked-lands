//create dropdown option for one weapon object

export const WeaponSelectionDropdown = ( {weaponObj} ) => {
    return <option value={weaponObj.id}>{weaponObj.name}: 1d{weaponObj.damageDie}</option>
}