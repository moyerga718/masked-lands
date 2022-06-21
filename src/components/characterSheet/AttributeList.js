export const AttributeList = ( {charAtt, charMods, attributeNames}) => {

    const foundModifier = charMods.find(mod => mod.attributeId === charAtt.attributeId)
    const foundAttribute = attributeNames.find(att => att.id === charAtt.attributeId)
    if (charAtt.bonus) {
        return <p>{foundAttribute?.name}: {charAtt.value} ({foundModifier?.val} mod) *Bonus*</p>
    } else {
        return <p>{foundAttribute?.name}: {charAtt.value} ({foundModifier?.val} mod)</p>
    }
}