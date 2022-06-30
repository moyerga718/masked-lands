export const WeaponTypeRadioButton = ({ weaponTypeProfObj, setSelectedWeaponType }) => {
    return <>
    <label className="prof-label">
        <input
            onChange={(changeEvent) => {
                setSelectedWeaponType(changeEvent.target.value);
            }}
            type="radio"
            name="weaponTypeProfObj"
            value={weaponTypeProfObj.weaponTypeId}
        />{" "}
        <div className="prof-div">
            <h5 className="prof-name">{`${weaponTypeProfObj.weaponType.name}`}</h5>
        </div>
    </label>
    </>
}