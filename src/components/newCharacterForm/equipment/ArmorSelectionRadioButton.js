export const ArmorSelectionRadioButton = ({ armorObj, characterObj, setCharacter }) => {

    if (armorObj.dexBonus && armorObj.bonusCap === 2) {
        // return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC} + Dexterity (Max 2)</option>
        return <>
            <label className="equip-label">
                <input
                    onChange={(changeEvent) => {
                        const copy = { ...characterObj };
                        copy.armorId = parseInt(changeEvent.target.value);
                        setCharacter(copy);
                    }}
                    type="radio"
                    name="armorObj"
                    value={armorObj.id}
                />{" "}
                <div className="equipment-div">
                    <div className="equipment-image-div">
                        <img className="equipment-image" src={armorObj?.imageUrl} />
                    </div>
                    <div className="equipment-information-div">
                        <h4 className="equipment-text">{`${armorObj.name}`}</h4>
                        <h5 className="equipment-text">AC {armorObj.baseAC} + Dexterity (Max 2)</h5>
                    </div>
                </div>
            </label>
        </>
    } else if (armorObj.dexBonus) {
        // return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC} + Dexterity </option>
        return <>
            <label className="equip-label">
                <input
                    onChange={(changeEvent) => {
                        const copy = { ...characterObj };
                        copy.armorId = parseInt(changeEvent.target.value);
                        setCharacter(copy);
                    }}
                    type="radio"
                    name="armorObj"
                    value={armorObj.id}
                />{" "}
                <div className="equipment-div">
                    <div className="equipment-image-div">
                        <img className="equipment-image" src={armorObj?.imageUrl} />
                    </div>
                    <div className="equipment-information-div">
                        <h4 className="equipment-text">{`${armorObj.name}`}</h4>
                        <h5 className="equipment-text">AC {armorObj.baseAC} + Dexterity </h5>
                    </div>
                </div>
            </label>
        </>
    } else {
        // return <option value={armorObj.id}>{armorObj.name}: AC {armorObj.baseAC}</option>
        return <>
            <label className="equip-label">
                <input
                    onChange={(changeEvent) => {
                        const copy = { ...characterObj };
                        copy.armorId = parseInt(changeEvent.target.value);
                        setCharacter(copy);
                    }}
                    type="radio"
                    name="armorObj"
                    value={armorObj.id}
                />{" "}
                <div className="equipment-div">
                    <div className="equipment-image-div">
                        <img className="equipment-image" src={armorObj?.imageUrl} />
                    </div>
                    <div className="equipment-information-div">
                        <h4 className="equipment-text">{`${armorObj.name}`}</h4>
                        <h5 className="equipment-text">AC {armorObj.baseAC}</h5>
                    </div>
                </div>
            </label>
        </>
    }

    // return <>
    //     <label className="equip-label">
    //         <input
    //             onChange={(changeEvent) => {
    //                 const copy = { ...characterObj };
    //                 copy.armorId = parseInt(changeEvent.target.value);
    //                 setCharacter(copy);
    //             }}
    //             type="radio"
    //             name="armorObj"
    //             value={armorObj.id}
    //         />{" "}
    //         <div className="equipment-div">
    //             <div className="equipment-image-div">
    //                 {/* <img className="selection-image" src={subclassObj?.imageUrl} /> */}
    //             </div>
    //             <div className="equipment-information-div">
    //                 <h3 className="equipment-text">{`${armorObj.name}`}</h3>
    //                 <h5>{weaponObj.numberOfDamageDie}d{weaponObj.damageDie}</h5>
    //             </div>
    //         </div>
    //     </label>
    // </>
}