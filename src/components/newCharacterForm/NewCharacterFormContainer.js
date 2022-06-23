import { useState, useEffect } from "react"
import { SpeciesSelection } from "./species/SpeciesSelection"
import { BackgroundSelection } from "./background/BackgroundSelection"
import { ClassSelection } from "./class/ClassSelection"
import { SubclassSelection } from "./subclass/SubclassSelection"
import { AttributeSelection } from "./attributes/AttributeSelection"
import { EquipmentSelection } from "./equipment/EquipmentSelection"
import { DevotionSelection } from "./devotion/DevotionSelection"
import { CharacterInfoSelection } from "./information/CharacterInfoSelection"
import { CharacterSubmitButton } from "./CharacterSubmitButton"
import { getAllAttributesFetch } from "../ApiManager"
import { StepButtons } from "./StepButtons"

// This component is a parent component for all of the different sections of the character creation form. Temp objects for character and character attributes
// are initialized in state here.

export const NewCharacterFormContainer = () => {

  const [step, setStep] = useState(1)
  // create empty character obj to be populated
  const [newCharacter, setNewCharacter] = useState({
    id: 0,
    userId: 0,
    level: 0,
    name: "",
    bio: "",
    imageUrl: "",
    speciesId: 0,
    backgroundId: 0,
    classId: 0,
    subclassId: 0,
    weaponId: 0,
    armorId: 0
  })

  // create array of empty attribute objects to be populated
  const [newCharacterAttributes, setNewCharacterAttributes] = useState([
    {
      characterId: 0,
      attributeId: 1,
      value: 0
    },
    {
      characterId: 0,
      attributeId: 2,
      value: 0
    },
    {
      characterId: 0,
      attributeId: 3,
      value: 0
    },
    {
      characterId: 0,
      attributeId: 4,
      value: 0
    },
    {
      characterId: 0,
      attributeId: 5,
      value: 0
    },
    {
      characterId: 0,
      attributeId: 6,
      value: 0
    },
  ])

  //create array of empty devotion objects to be populated in DevotionSelection component.
  const [charDevotion, setCharDevotion] = useState([
    {
      characterId: 0,
      godId: 1,
      devPoints: 0
    },
    {
      characterId: 0,
      godId: 2,
      devPoints: 0
    },
    {
      characterId: 0,
      godId: 3,
      devPoints: 0
    },
    {
      characterId: 0,
      godId: 4,
      devPoints: 0
    },
    {
      characterId: 0,
      godId: 5,
      devPoints: 0
    },
    {
      characterId: 0,
      godId: 6,
      devPoints: 0
    }
  ])

  const [charImageFile, setCharImageFile] = useState(null)


  //~~~~~~~~~~~~~~~~~TBH Im not sure what this does but I think this'll help set up a multipage form??~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  const prevStep = (step) => {
    setStep(step - 1)
  }

  const nextStep = (step) => {
    setStep(step + 1)
  }

  //~~~~~~~~~~~~~~~~~TBH Im not sure what this does but I think this'll help set up a multipage form??~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


  // Get all attribute raw data (name/id pairings)
  const [allAttributes, setAllAttributes] = useState([])

  // Get current user id from local storage
  const localMlUser = localStorage.getItem("ml_user")
  const mlUserObject = JSON.parse(localMlUser)

  //upon state initializing, get all attribute name/id pairings
  //Add userId to new character object
  useEffect(
    () => {
      getAllAttributesFetch().then(setAllAttributes)
      const copy = { ...newCharacter }
      copy.userId = mlUserObject.id
      setNewCharacter(copy)
    },
    []
  )

  // return <>
  //         <CharacterInfoSelection characterObj={newCharacter} setCharacter={setNewCharacter} charImageFile={charImageFile} setCharImageFile={setCharImageFile} />
  //         <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
  //         <CharacterSubmitButton characterObj={newCharacter} characterAttributes={newCharacterAttributes} characterDevotion={charDevotion} charImageFile={charImageFile}/>
  // </>

  //Render necessary components depending on which step we are on, breaking form into multiple "pages"
  switch (step) {
    case 1:
      return (
        <>
          <SpeciesSelection characterObj={newCharacter} setCharacter={setNewCharacter} allAttributes={allAttributes} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 2:
      return (
        <>
          <BackgroundSelection characterObj={newCharacter} setCharacter={setNewCharacter} allAttributes={allAttributes} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 3:
      return (
        <>
          <ClassSelection characterObj={newCharacter} setCharacter={setNewCharacter} allAttributes={allAttributes} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 4:
      return (
        <>
          <SubclassSelection characterObj={newCharacter} setCharacter={setNewCharacter} allAttributes={allAttributes} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 5:
      return (
        <>
          <AttributeSelection characterAttributes={newCharacterAttributes} setCharacterAttributes={setNewCharacterAttributes} allAttributes={allAttributes} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 6:
      return (
        <>
          <EquipmentSelection characterObj={newCharacter} setCharacter={setNewCharacter} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
      case 7:
      return (
        <>
          <DevotionSelection charDevotion={charDevotion} setCharDevotion={setCharDevotion} characterObj={newCharacter} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 8:
      return (
        <>
          <CharacterInfoSelection characterObj={newCharacter} setCharacter={setNewCharacter} charImageFile={charImageFile} setCharImageFile={setCharImageFile} />
          <StepButtons step={step} nextStep={nextStep} prevStep={prevStep} />
          <CharacterSubmitButton characterObj={newCharacter} characterAttributes={newCharacterAttributes} setCharacter={setNewCharacter} characterDevotion={charDevotion} charImageFile={charImageFile} />
        </>
      )
    default:
    // do nothing
  }

}
