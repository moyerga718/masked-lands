import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteCharacterFetch, getCharacterById, getAllAttributesFetch, getAllWeaponsFetch, getAllArmorFetch } from "../ApiManager"
import { AttributeList } from "./AttributeList"

export const CharacterSheet = () => {
    const navigate = useNavigate()
    const { characterId } = useParams()
    const [characterInfo, setCharacterInfo] = useState({})
    const [characterAttributes, setCharacterAttributes] = useState([])
    const [effectiveAttributes, setEffectiveAttributes] = useState([])
    const [effectiveModifiers, setEffectiveModifiers] = useState([])
    const [attributes, setAttributes] = useState([])
    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])
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
            getAllAttributesFetch().then(setAttributes)
            getAllWeaponsFetch().then(setWeapons)
            getAllArmorFetch().then(setArmor)
        },
        []
    )

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
            setCharacterAttributes(characterInfo.characterAttributes)
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

    //Once we have all character attributes, make a new array with effective character attributes that take species/class bonuses into account
    useEffect(
        () => {
            const classAttBonusId = characterInfo?.class?.bonusAttributeId
            if (characterAttributes) {
                const attCopy = [...characterAttributes]
                const attCopyWithBonuses = attCopy.map(
                    (att) => {
                        if (att.attributeId === classAttBonusId) {
                            att.value = att.value + 2
                            att.bonus = true
                            return att
                        } else {
                            att.bonus = false
                            return att
                        }
                    }
                )
                setEffectiveAttributes(attCopyWithBonuses)
            }
        },
        [characterAttributes]
    )

    //Once we have effective attributes, calculate effective modifiers for that attribute. save to state.
    useEffect(
        () => {
            if (effectiveAttributes) {
                const modArray = effectiveAttributes.map(
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
        [effectiveAttributes]
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
            <p>Class: {characterInfo?.class?.name}</p>
        </div>

        <div>
            <h3>Status</h3>
            <p>Life: {characterInfo?.class?.maxLife}</p>
            <p>Will: {characterInfo?.class?.will}</p>
            <p>Stamina: {characterInfo?.class?.stamina}</p>
        </div>

        <div>
            <h3>Attributes</h3>
            {
                (effectiveAttributes && effectiveModifiers)
                    ? <>
                        {
                            effectiveAttributes.map(charAtt => <AttributeList
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