export const DevotionList = ( {devotionObj, gods}) => {

    const foundGod = gods.find(god => god.id === devotionObj.godId)
    
    return <div>
        <p><b>{foundGod.name}:</b> {devotionObj.devPoints} devotion points</p>
    </div>
}