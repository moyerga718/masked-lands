import "./Subclass.css"
import { SubclassWeaponProficiencyList } from "./SubclassWeaponProficiencyList"
import { SubclassArmorProficiencyList } from "./SubclassArmorProficiencyList"

export const SubclassRadioButton = ({ subclassObj, characterObj, setCharacter, allSubclassWeaponProfs, allSubclassArmorProfs }) => {

    const subclassWeaponProfs = allSubclassWeaponProfs.filter(subclassWeaponProfObj => subclassWeaponProfObj?.subclassId === subclassObj?.id)
    const subclassArmorProfs = allSubclassArmorProfs.filter(subclassArmorProfObj => subclassArmorProfObj?.subclassId === subclassObj?.id)

    //Create a radio button that displays the subclass name and associated attribute bonus. When selected, update the main character object
    return <>
        <label className="labl">
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.subclassId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="subclassObj"
                value={subclassObj.id}
            />{" "}
            <div className="selection-div">
                <div className="selection-image-div">
                    <img className="selection-image" src={subclassObj?.imageUrl} />
                </div>
                <div className="selection-information-div">
                    <h3 className="selection-text">{`${subclassObj.name}`}</h3>
                    <p className="subclass-description"><i>{subclassObj?.description}</i></p>
                    <div className="subclass-stats-div">
                        <div className="stat-column">
                            <h5 className="selection-text">HP: {subclassObj?.life} (+Con),  Hit Die: D{subclassObj?.hitDie}</h5>
                            <h5 className="selection-text">Will: {subclassObj?.will} (+Att),  Per Level: {subclassObj?.willPerLevel}</h5>
                            <h5 className="selection-text">Stamina: {subclassObj?.stamina} (+Con),  Per Level: {subclassObj?.staminaPerLevel}</h5>
                        </div>
                        <h5 className="selection-text">Devotion Points: {subclassObj?.devotionPoints}</h5>
                    </div>
                    <div className="equipment-prof-div">
                        <h5 className="proficiency-text">Weapon Proficiencies:  </h5>
                        {
                            (subclassWeaponProfs)
                                ? subclassWeaponProfs.map(weaponProfObj => <SubclassWeaponProficiencyList
                                    key={`subclassWeaponProf--${weaponProfObj?.id}`}
                                    weaponProfObj={weaponProfObj} />)
                                : <></>
                        }
                    </div>
                    <div className="equipment-prof-div">
                        <h5 className="proficiency-text">Armor Proficiencies:</h5>
                        {
                            (subclassWeaponProfs)
                                ? subclassArmorProfs.map(armorProfObj => <SubclassArmorProficiencyList
                                    key={`subclassWeaponProf--${armorProfObj?.id}`}
                                    armorProfObj={armorProfObj} />)
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </label>
    </>
}