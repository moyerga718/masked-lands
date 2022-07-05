import { useState, useEffect } from "react"
import { getAllSpellsFetch } from "../ApiManager"
import { SpellTextGenerator } from "./SpellTextGenerator"
import "./SpellList.css"

export const SpellList = ( {sortedDevotion, gods} ) => {
    const [spells, setSpells] = useState([])
    const [charSpells, setCharSpells] = useState([])

    useEffect(
        () => {
            getAllSpellsFetch().then(setSpells)
        },
        []
    )

    useEffect(
        () => {
            // make sure we have all the spells before we start filtering. 
            if (spells && sortedDevotion) {
                // set empty array that matching spells will go into.
                const tempSpellsArray = []
                //Loop through all objects holding devotion points/level info for characters
                for (const devotionObj of sortedDevotion) {
                    // console.log(devotionObj)
                    if (devotionObj.devLevel > 0) {
                        for (let i = devotionObj.devLevel; i > 0; i--) {
                            // console.log(i)
                            const filteredSpells = spells.filter( spell => spell.godId === devotionObj.godId && spell.devLevel === i)
                            // console.log(filteredSpells)
                            filteredSpells.forEach( filteredSpell => tempSpellsArray.push(filteredSpell))
                        }
                    }
                }

                console.log(tempSpellsArray)
                setCharSpells(tempSpellsArray)

            }
        },
        [spells, sortedDevotion]
    )
    
    return <>
    
    {
        (charSpells) 
        ? <>
            
            {
                charSpells.map( charSpell => <SpellTextGenerator 
                    key={`spell--${charSpell.id}`}
                    spellObj={charSpell}
                    gods={gods}
                />)
            }
        </>
        : <></>

    }
    {
        (charSpells === [])
        ? <h4>No spells</h4>
        : <></>
    }

    </>
}