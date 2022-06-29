import "./AttributeList.css"

export const AttributeList = ({ charAtt, charMods, attributeNames }) => {

    const foundModifier = charMods.find(mod => mod.attributeId === charAtt.attributeId)
    const foundAttribute = attributeNames.find(att => att.id === charAtt.attributeId)
    if (charAtt.bonus) {
        return <>
            <div className="att-and-mod-container">
                <div className="att-box-boosted">
                    <p>{charAtt.value}</p>
                    <p>{foundAttribute?.name}</p>
                </div>
                <div className="att-mod-box-boosted">
                    <p>+{foundModifier?.val}</p>
                </div>
            </div>
        </>
    } else {
        return <>
            <div className="att-and-mod-container">
                <div className="att-box">
                    <p>{charAtt.value}</p>
                    <p>{foundAttribute?.name}</p>
                </div>
                <div className="att-mod-box">
                    <p>+{foundModifier?.val}</p>
                </div>
            </div>
        </>

    }
}