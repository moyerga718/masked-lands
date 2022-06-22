//this component calculates the AC for the character based on their effective dexterity modifier and their armor.

export const ArmorClassCalculation = ( {charArmor, effectiveModifiers} ) => {
    //create variable that will hold AC value
    let acValue = 0

    // grab dex modifier value from effective modifiers
    const dexMod = effectiveModifiers.find(mod => mod.attributeId === 2)

    //This checks to see if they get a dex bonus from their armor. If not (most heavy armor), just return AC
    if (!charArmor.dexBonus) {
        acValue = charArmor.baseAC
        return acValue
    //Then, check to see if they get a dex bonus from their armor AND if that bonus has a cap. Lots of armor will give you a dex bonus of only two. 
    //So, check to see if they get a dex bonus and if armor bonus cap is greater than 0
    } else if (charArmor.dexBonus && charArmor.bonusCap) {
        //Then, check to see if the bonus cap is greater than their dex mod (IE, they haven't hit the cap yet.)
        if (charArmor.bonusCap > dexMod) {
            //If so, add their dex mod to armor base AC, return that value.
            acValue = charArmor.baseAC + dexMod
            return acValue
        //If their dex mod is greater than or equal to the armor bonus cap...
        } else {
            //Only add the armors bonus cap to the base aC
            acValue = charArmor.baseAC + charArmor.bonusCap
            return acValue
        }
    //Last scenario is when armor gives a dex boost and there is no AC cap (most light armor). Just add dex mod to AC.
    } else {
        acValue = charArmor.baseAC + dexMod
        return acValue
    }
}