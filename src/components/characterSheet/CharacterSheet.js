import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getBasicCharacterById, getCharacterAttributes, getAllAttributesFetch, getCharacterClass, getAllWeaponsFetch, getAllArmorFetch, getAllSpeciesFetch, getCharacterBackgroundFetch, getCharacterSubclassByIdFetch, getSubclassWeaponProficienciesFetch, getCharDevotionFetch, getAllGodsFetch, getAllSpellsFetch } from "../ApiManager"
import { AttributeList } from "./AttributeList"
import { WeaponProficiencyList } from "./WeaponProficiencyList"
import { DevotionList } from "./DevotionList"
import { SpellList } from "./SpellList"
import { ArmorClassCalculation } from "./ArmorClassCalculation"
import '../../fonts/QUATTROCENTOSANS-REGULAR.TTF'
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


    const [maxHitDice, setMaxHitDice] = useState(0)

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

    // useEffect(
    //     () => {
    //         //find # of hit dice for character
    //         if (effectiveModifiers) {
    //             const conMod = effectiveModifiers.find(mod => mod.attributeId === 3)
    //             const conModVal = conMod.val + 1
    //             console.log(conModVal)
    //             setMaxHitDice(conModVal)
    //         }
    //     },
    //     [effectiveModifiers]
    // )

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

                <div className="character-sheet-head">

                    <div className="character-image-border">
                        <img src={characterInfo?.imageUrl} className="character-image" />
                    </div>

                    <div className="basic-character-information">
                        <div className="char-name-and-bio">
                            <h1 className="char-name-and-bio-item">{characterInfo.name}</h1>
                            <h4 className="char-name-and-bio-item"><i>"{characterInfo.bio}" </i></h4>
                        </div>
                        <div>
                            <div className="level-information">
                                <h4 className="char-history-info-item">Level: {characterInfo.level}</h4>
                                <h4 className="char-history-info-item">XP: 0</h4>
                            </div>
                            <div className="species-information">
                                <h4 className="char-history-info-item">Species: {charSpecies?.name}</h4>
                                <h4 className="char-history-info-item">Background: {charBackground?.name}</h4>
                            </div>
                            <div className="class-information">
                                <h4 className="char-history-info-item">Class: {charClass?.name}</h4>
                                <h4 className="char-history-info-item">Subclass: {charSubclass?.name}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="character-status">

                        <div className="stat-column-LWS">

                            <div className="LWS-column-section">
                                <div className="LWS-column-section-current-hp">
                                    <h3 className="LWS-current-stat-value">{charSubclass?.life}</h3>
                                    <p className="LWS-current-stat-label">HP</p>
                                </div>
                                <div className="LWS-column-section-max">
                                    <h6 className="LWS-max-stat-value">{charSubclass?.life}</h6>
                                    <h6 className="LWS-max-stat-label">Max</h6>
                                </div>
                            </div>

                            <div className="LWS-column-section">
                                <div className="LWS-column-section-current-will">
                                    <h3 className="LWS-current-stat-value">{charSubclass?.will}</h3>
                                    <p className="LWS-current-stat-label">Will</p>
                                </div>
                                <div className="LWS-column-section-max">
                                    <h6 className="LWS-max-stat-value">{charSubclass?.will}</h6>
                                    <h6 className="LWS-max-stat-label">Max</h6>
                                </div>
                            </div>

                            <div className="LWS-column-section">
                                <div className="LWS-column-section-current-stamina">
                                    <h3 className="LWS-current-stat-value">{charSubclass?.stamina}</h3>
                                    <p className="LWS-current-stat-label">stamina</p>
                                </div>
                                <div className="LWS-column-section-max">
                                    <h6 className="LWS-max-stat-value">{charSubclass?.stamina}</h6>
                                    <h6 className="LWS-max-stat-label">Max</h6>
                                </div>
                            </div>
                        </div>

                        <div className="stat-column-physical-abilities">

                            <div className="LWS-column-section">
                                <div className="physical-features-column-item">
                                    <h3 className="LWS-current-stat-value">{charAC}</h3>
                                    <p className="LWS-current-stat-label">AC</p>
                                </div>
                            </div>

                            <div className="LWS-column-section">
                                <div className="physical-features-column-item">
                                    <h3 className="LWS-current-stat-value">D{charSubclass?.hitDie}</h3>
                                    <p className="LWS-current-stat-label">Hit die</p>
                                </div>
                                {/* This is for showing how many hit die you have, not necessary for right now / not working.
                                <div>
                                    <div className="LWS-column-section-hit-die-max">
                                        <p className="LWS-max-stat-value">{charSubclass?.hitDie}</p>
                                        <p className="LWS-max-stat-label"></p>
                                    </div>
                                    <div className="LWS-column-section-hit-value">
                                        <p className="LWS-max-stat-value">{charSubclass?.will}</p>
                                        <p className="LWS-max-stat-label">Max</p>
                                    </div>
                                </div> */}
                            </div>

                            <div className="LWS-column-section">
                                <div className="physical-features-column-item">
                                    <h3 className="LWS-current-stat-value">{charSpecies?.speed} ft</h3>
                                    <p className="LWS-current-stat-label">Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="character-attributes-section">
                    <h3>Attributes</h3>
                    <div className="att-box-container">
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
                </div>

                <div className="all-char-equipment-section">

                    <div className="char-equipment-section">
                        <div className="char-equipment-details-flex-container">
                            <h3 className="char-equipment-section-title">Weapon</h3>
                            <div className="char-equipment-information">
                                <h4 className="char-equipment-name">{charWeapon?.name}</h4>
                                <p>{charWeapon?.attribute?.name} Scaling</p>
                                <p>Damage: 1d{charWeapon?.damageDie}</p>
                            </div>
                        </div>
                        <div className="char-equipment-image-container">
                            <img className="char-equipment-image" src={charWeapon?.imageUrl}></img>
                        </div>
                    </div>

                    <div className="char-equipment-section-armor">
                        <div className="char-equipment-details-flex-container">
                            <h3 className="char-equipment-section-title">Armor</h3>
                            <div className="char-equipment-information">
                                <h4 className="char-equipment-name">{charArmor?.name}</h4>
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
                            </div>,
                        </div>
                        <div className="char-equipment-image-container">
                            <img className="char-equipment-image" src={charArmor?.imageUrl}></img>
                        </div>

                    </div>
                </div>


                <div className="devotion-section">
                    <h3>Devotion</h3>
                    {
                        (sortedDevotion)
                            ? <>
                                <div className="devotion-card-container">
                                    {
                                        sortedDevotion.map(devotionObj => <DevotionList
                                            key={`devotion--${devotionObj.godId}`}
                                            devotionObj={devotionObj}
                                            charObj={characterInfo}
                                            gods={gods}
                                        />)
                                    }
                                </div>
                            </>
                            : <></>
                    }
                </div>

                {
                    (sortedDevotion)
                        ? <div className="spell-section">
                            <h3>Spells</h3>
                            <SpellList sortedDevotion={sortedDevotion} gods={gods} />
                        </div>
                        : <></>
                }

                <div className="button-div">
                    {
                        (characterInfo.userId === mlUserObject.id)
                            ? <>
                                <button className="delete-button" onClick={() => deleteCharacter()}>Delete</button>
                            </>
                            : <></>
                    }
                </div>
            </section>

        </div>
    </>
}