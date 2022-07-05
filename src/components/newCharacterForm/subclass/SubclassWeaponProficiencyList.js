export const SubclassWeaponProficiencyList = ( {weaponProfObj} ) => {
    return <p className="proficiency-text">{weaponProfObj?.weaponType?.name}</p>
}