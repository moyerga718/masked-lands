//create dropdown option for one armor object

export const ArmorSelectionDropdown = ({armorObj}) => {
    return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.defenseRating}</option>
}