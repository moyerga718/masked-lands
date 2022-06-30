export const WeaponSelectionRadioButton = ( {weaponObj, characterObj, setCharacter} ) => {
    return <>
    <label className="equip-label">
        <input
            onChange={(changeEvent) => {
                const copy = { ...characterObj };
                copy.weaponId = parseInt(changeEvent.target.value);
                setCharacter(copy);
            }}
            type="radio"
            name="weaponObj"
            value={weaponObj.id}
        />{" "}
        <div className="equipment-div">
            <div className="equipment-image-div">
                <img className="equipment-image" src={weaponObj?.imageUrl} />
            </div>
            <div className="equipment-information-div">
                <h4 className="equipment-text">{`${weaponObj.name}`}</h4>
                <h5 className="equipment-text">{weaponObj.numberOfDamageDie}d{weaponObj.damageDie}</h5>
            </div>
        </div>
    </label>
</>
}