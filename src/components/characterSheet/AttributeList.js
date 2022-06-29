import "./AttributeList.css"

export const AttributeList = ({ charAtt, charMods, attributeNames }) => {

    const foundModifier = charMods.find(mod => mod.attributeId === charAtt.attributeId)
    const foundAttribute = attributeNames.find(att => att.id === charAtt.attributeId)
    if (charAtt.bonus) {
        return <>
            <div className="att-and-mod-container">
                <div className="att-box-boosted">
                    <h3 className="att-value">{charAtt.value}</h3>
                    <p className="att-name">{foundAttribute?.name}</p>
                </div>
                <div className="att-mod-box-boosted">
                    <h4>+{foundModifier?.val}</h4>
                </div>
            </div>
        </>
    } else {
        return <>
            <div className="att-and-mod-container">
                <div className="att-box">
                    <h3 className="att-value">{charAtt.value}</h3>
                    <p className="att-name">{foundAttribute?.name}</p>
                </div>
                <div className="att-mod-box">
                    <h4>+{foundModifier?.val}</h4>
                </div>
            </div>
        </>

    }
}