import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getBasicCharacterById, getCharacterAttributes, getAllAttributesFetch, getCharacterClass, getAllWeaponsFetch, getAllArmorFetch, getAllSpeciesFetch, getCharacterBackgroundFetch, getCharacterSubclassByIdFetch, getSubclassWeaponProficienciesFetch, getCharDevotionFetch, getAllGodsFetch } from "../ApiManager"
import { AttributeList } from "./AttributeList"
import { WeaponProficiencyList } from "./WeaponProficiencyList"
import { DevotionList } from "./DevotionList"
import { ArmorClassCalculation } from "./ArmorClassCalculation"
import "./CharacterSheet.css"

export const CharacterSheet = () => {
    const navigate = useNavigate()
    const { characterId } = useParams()
    const [characterInfo, setCharacterInfo] = useState({})
    const [characterAttributes, setCharacterAttributes] = useState([])
    const [effectiveAttributes, setEffectiveAttributes] = useState([])
    const [sortedEffective, setSortedEffective] = useState([])
    const [effectiveModifiers, setEffectiveModifiers] = useState([])
    const [attributes, setAttributes] = useState([])
    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])
    const [species, setSpecies] = useState([])
    const [charBackground, setCharBackground] = useState({})
    const [charSpecies, setCharSpecies] = useState({})
    const [charClass, setCharClass] = useState({})
    const [charSubclass, setCharSubclass] = useState({})
    const [charWeaponProfs, setCharWeaponProfs] = useState([])
    const [charWeapon, setCharWeapon] = useState({})
    const [charArmor, setCharArmor] = useState({})
    const [charAC, setCharAC] = useState(0)
    const [charDevotion, setCharDevotion] = useState([])
    const [sortedDevotion, setSortedDevotion] = useState([])
    const [gods, setGods] = useState([])
    



    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    useEffect(
        () => {
            getBasicCharacterById(characterId).then(setCharacterInfo)
        },
        []
    )

    const findCharSpecies = () => {
        const foundSpecies = species.find(species => species.id === characterInfo.speciesId)
        return foundSpecies
    }

    const findCharWeapon = () => {
        const foundWeapon = weapons.find(weapon => weapon.id === characterInfo.weaponId)
        return foundWeapon
    }

    const findCharArmor = () => {
        const foundArmor = armor.find(armor => armor.id === characterInfo.armorId)
        return foundArmor
    }

    // once we have character object, get matching character attributes, save to state
    useEffect(
        () => {
            if (characterInfo.id && characterInfo.backgroundId && characterInfo.subclassId) {
                getAllAttributesFetch().then(setAttributes)
                getAllSpeciesFetch().then(setSpecies)
                getAllWeaponsFetch().then(setWeapons)
                getAllArmorFetch().then(setArmor)
                getAllGodsFetch().then(setGods)
                getCharacterAttributes(characterInfo?.id).then(setCharacterAttributes)
                getCharacterClass(characterInfo?.classId).then(setCharClass)
                getCharacterBackgroundFetch(characterInfo?.backgroundId).then(setCharBackground)
                getCharacterSubclassByIdFetch(characterInfo?.subclassId).then(setCharSubclass)
                getCharDevotionFetch(characterInfo?.id).then(setCharDevotion)
            }
        },
        [characterInfo]
    )

    useEffect(
        () => {
            getSubclassWeaponProficienciesFetch(charSubclass.id).then(setCharWeaponProfs)
        },
        [charSubclass]
    )

    //Once we have weapons data, get matching character weapon, save to state.
    useEffect(
        () => {
            setCharWeapon(findCharWeapon())
        },
        [weapons]
    )

    //Once we have armor data, get matching character weapon, save to state. 
    useEffect(
        () => {
            setCharArmor(findCharArmor())
        },
        [armor]
    )

    //Once we have armor data, get matching character weapon, save to state. 
    useEffect(
        () => {
            setCharSpecies(findCharSpecies())
        },
        [species]
    )

    //once we have character attributes and att bonuses from background, make a copy of character attributes that will be considered "effective" attributes.
    //these will be base attributes with att bonuses added in. For each attribute, check to see if there is an associated attribute bonus from characters
    //background. If there is, add value of bonus. 

    useEffect(
        () => {
            if (characterAttributes && charBackground.backgroundAttributeBonuses) {
                const attCopy = characterAttributes.map(att => { return { ...att } })
                const attCopyWithBonuses = attCopy.map(
                    (att) => {
                        for (const attBonus of charBackground.backgroundAttributeBonuses) {
                            if (att.attributeId === attBonus.attributeId) {
                                att.value = att.value + attBonus.bonus
                                att.bonus = true
                                return att
                            } else {
                                att.bonus = false
                            }
                        }
                        return att
                    }
                )
                setEffectiveAttributes(attCopyWithBonuses)
            }
        },
        [characterAttributes, charBackground]
    )

    //sort effective attributes so they appear on the screen in the right order.
    useEffect(
        () => {
            const sorted = effectiveAttributes.sort((a, b) => {
                return a.attributeId - b.attributeId
            })
            setSortedEffective(sorted)
        },
        [effectiveAttributes]
    )

    //Once we have sorted effective attributes, calculate effective modifiers for that attribute. save to state.
    useEffect(
        () => {
            if (sortedEffective) {
                const modArray = sortedEffective.map(
                    (att) => {
                        const modObj = {
                            attributeId: att.attributeId,
                        }
                        if (att.value > 10) {
                            modObj.val = Math.floor((att.value - 10) / 2)
                        } else {
                            modObj.val = Math.ceil((att.value - 10) / 2)
                        }
                        return modObj
                    }
                )
                setEffectiveModifiers(modArray)
            }
        },
        [sortedEffective]
    )

    //Once we have effective modifiers, we can calculate characters Armor Class (AC). This is done with the ArmorClassCalculation component
    useEffect(
        () => {
            if (charArmor && effectiveModifiers) {
                let acValue = 0

                // grab dex modifier value from effective modifiers
                const dexMod = effectiveModifiers.find(mod => mod.attributeId === 2)

                //This checks to see if they get a dex bonus from their armor. If not (most heavy armor), just return AC
                if (!charArmor.dexBonus) {
                    acValue = charArmor.baseAC
                    //Then, check to see if they get a dex bonus from their armor AND if that bonus has a cap. Lots of armor will give you a dex bonus of only two. 
                    //So, check to see if they get a dex bonus and if armor bonus cap is greater than 0
                } else if (charArmor.dexBonus && charArmor.bonusCap) {
                    //Then, check to see if the bonus cap is greater than their dex mod (IE, they haven't hit the cap yet.)
                    if (charArmor.bonusCap > dexMod?.val) {
                        //If so, add their dex mod to armor base AC, return that value.
                        acValue = charArmor.baseAC + dexMod?.val
                        //If their dex mod is greater than or equal to the armor bonus cap...
                    } else {
                        //Only add the armors bonus cap to the base aC
                        acValue = charArmor.baseAC + charArmor.bonusCap
                    }
                    //Last scenario is when armor gives a dex boost and there is no AC cap (most light armor). Just add dex mod to AC.
                } else {
                    acValue = charArmor.baseAC + dexMod?.val
                }

                //set AC state variable
                setCharAC(acValue)
            }
        },
        [charArmor, effectiveModifiers]
    )

    useEffect(
        () => {
            const sorted = charDevotion.sort((a, b) => {
                return a.godId - b.godId
            })
            setSortedDevotion(sorted)
        },
        [charDevotion]
    )


    // Function to that calls delete fetch if delete button is clicked.
    const deleteCharacter = () => {
        deleteCharacterFetch(characterId)
            .then(
                navigate("/")
            )
    }

    // Jsx to render on page.
    return <>
    <div className="character-sheet-container">
        <section className="character-sheet">
        <div>
            <h2>{characterInfo.name}</h2>
            <img src={characterInfo?.imageUrl} className="character-image"/>
            <p>Level: {characterInfo.level}</p>
            <p>Species: {charSpecies?.name}</p>
            <p>Background: {charBackground?.name}</p>
            <p>Class: {charClass?.name}</p>
            <p>Subclass: {charSubclass?.name}</p>
        </div>


        <div>
            <h3>Status</h3>
            <p>Life: {charSubclass?.life} </p>
            <p>Will: {charSubclass?.will} ({charSubclass?.willPerLevel} per level)</p>
            <p>Stamina: {charSubclass?.stamina}, ({charSubclass?.staminaPerLevel} per level)</p>
            <p>Hit Die: D{charSubclass?.hitDie} </p>
            <p>Speed: {charSpecies?.speed} ft</p>
            <p>AC: {charAC}</p>
        </div>

        <div>
            <h3>Attributes</h3>
            {
                (sortedEffective && effectiveModifiers)
                    ? <>
                        {
                            sortedEffective.map(charAtt => <AttributeList
                                key={`characterAttribute--${charAtt.attributeId}`}
                                charAtt={charAtt}
                                charMods={effectiveModifiers}
                                attributeNames={attributes} />)
                        }
                    </>
                    : <></>
            }
        </div>

        <div>
            <h3>Equipment</h3>
            <h4>Weapon: {charWeapon?.name}</h4>
            <p>{charWeapon?.attribute?.name} Scaling</p>
            <p>Damage: 1d{charWeapon?.damageDie}</p>
            <h4>Armor: {charArmor?.name}</h4>
            {
                (charArmor?.dexBonus && charArmor?.bonusCap === 2) 
                ? <p>AC: {charArmor?.baseAC} + Dexterity (Max 2)</p>
                : <></>
            }
            {
                (charArmor?.dexBonus && !charArmor.bonusCap) 
                ? <p>AC: {charArmor?.baseAC} + Dex</p>
                : <></>
            }
            {
                (!charArmor?.dexBonus)
                ? <p>AC: {charArmor?.baseAC}</p>
                : <></>
            }
            <p>Strength Requirement: {charArmor?.strengthRequirement}</p>
        </div>

        <div>
            <h3>Devotion</h3>
            {
                (sortedDevotion)
                ? <>
                    {
                        sortedDevotion.map(devotionObj => <DevotionList 
                            key={`devotion--${devotionObj.godId}`}
                            devotionObj={devotionObj}
                            charObj={characterInfo}
                            gods={gods}
                        />)
                    }
                </>
                : <></>
            }
        </div>

        <div>
            <h3>Proficiencies</h3>
            <h4>Weapon Proficiencies</h4>
            {
                (charWeaponProfs)
                    ? <>
                        <ul className="weapon-prof-list">
                            {
                                charWeaponProfs.map(weaponProf => <WeaponProficiencyList
                                    key={`weaponProficiency--${weaponProf.weaponTypeId}`}
                                    weaponProfObj={weaponProf} />)
                            }
                        </ul>
                    </>
                    : <></>
            }
        </div>

        <div>
            {
                (characterInfo.userId === mlUserObject.id)
                    ? <>
                        <button onClick={() => deleteCharacter()}>Delete</button>
                    </>
                    : <></>
            }
        </div>
        </section>

    </div>
    </>
}