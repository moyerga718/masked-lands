//create dropdown option for one armor object

export const ArmorSelectionDropdown = ({armorObj}) => {
    if (armorObj.dexBonus && armorObj.bonusCap === 2) {
        return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC} + Dexterity (Max 2)</option>
    } else if (armorObj.dexBonus) {
        return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC} + Dexterity </option>
    } else {
        return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC}</option>
    }
}