export const ArmorTypeRadioButton = ({ armorTypeProfObj, setSelectedArmorType }) => {
    return <>
        <div >
            <input
                onChange={(changeEvent) => {
                    setSelectedArmorType(changeEvent.target.value);
                }}
                type="radio"
                name="ArmorTypeProfObj"
                value={armorTypeProfObj?.armorTypeId}
            />{" "}
            {`${armorTypeProfObj?.armorType?.name}`}
        </div>
    </>
}