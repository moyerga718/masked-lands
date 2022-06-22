//create dropdown option for one weapon object

export const WeaponSelectionDropdown = ( {weaponObj} ) => {
    return <option value={weaponObj.id}>{weaponObj.name}: {weaponObj.numberOfDamageDie}d{weaponObj.damageDie}</option>
}