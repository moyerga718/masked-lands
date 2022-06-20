import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getCharacterById, getAllAttributesFetch, getAllWeaponsFetch, getAllArmorFetch, getAllSpeciesFetch, getCharacterBackgroundFetch } from "../ApiManager"
import { AttributeList } from "./AttributeList"

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
    const [charWeapon, setCharWeapon] = useState({})
    const [charArmor, setCharArmor] = useState({})

    const localMlUser = localStorage.getItem("ml_user")
    const mlUserObject = JSON.parse(localMlUser)

    //Upon initializing, get character object and all attribute names
    useEffect(
        () => {
            getCharacterById(characterId)
                .then(characterArray => {
                    setCharacterInfo(characterArray[0])
                })
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
            if (characterInfo.backgroundId) {
                getAllAttributesFetch().then(setAttributes)
                getAllSpeciesFetch().then(setSpecies)
                getAllWeaponsFetch().then(setWeapons)
                getAllArmorFetch().then(setArmor)
                setCharacterAttributes(characterInfo.characterAttributes)
                getCharacterBackgroundFetch(characterInfo?.backgroundId).then(setCharBackground)
            }
        },
        [characterInfo]
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
                const attCopy = characterAttributes.map(att =>{return {...att}})
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


    // Function to that calls delete fetch if delete button is clicked.
    const deleteCharacter = () => {
        deleteCharacterFetch(characterId)
            .then(
                navigate("/")
            )
    }

    // Jsx to render on page.
    return <>

        <div>
            <h2>{characterInfo.name}</h2>
            {/* {
                (charSpecies)
                ? <p>Species: {charSpecies}</p>
                : <></>
            } */}
            <p>Species: {charSpecies?.name}</p>
            <p>Background: {charBackground?.name}</p>
            <p>Class: {characterInfo?.class?.name}</p>
        </div>

        <div>
            <h3>Status</h3>
            <p>Life: {characterInfo?.class?.maxLife}</p>
            <p>Will: {characterInfo?.class?.will}</p>
            <p>Stamina: {characterInfo?.class?.stamina}</p>
            <p>Speed: {charSpecies?.speed} ft</p>
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
            <p>AC: {charArmor?.defenseRating}</p>
            <p>Strength Requirement: {charArmor?.strengthRequirement}</p>
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
    </>
}