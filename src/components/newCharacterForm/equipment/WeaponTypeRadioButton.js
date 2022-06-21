export const WeaponTypeRadioButton = ( {weaponTypeProfObj, setSelectedWeaponType} ) => {
    return <>
    <div >
            <input
                onChange={(changeEvent) => {
                    setSelectedWeaponType(changeEvent.target.value);
                }}
                type="radio"
                name="weaponTypeProfObj"
                value={weaponTypeProfObj.weaponTypeId}
            />{" "}
            {`${weaponTypeProfObj.weaponType.name}`}
        </div></>
}