export const ArmorTypeRadioButton = ({ armorTypeProfObj, setSelectedArmorType }) => {
    return <>
        <label className="prof-label">
            <input
                onChange={(changeEvent) => {
                    setSelectedArmorType(changeEvent.target.value);
                }}
                type="radio"
                name="ArmorTypeProfObj"
                value={armorTypeProfObj?.armorTypeId}
            />{" "}
            <div className="prof-div">
                <h5 className="prof-name">{`${armorTypeProfObj?.armorType?.name}`}</h5>
            </div>
        </label>

    </>
}