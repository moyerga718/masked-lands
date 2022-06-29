import "./DevotionList.css"

export const DevotionList = ({ devotionObj, gods }) => {

    const foundGod = gods.find(god => god.id === devotionObj.godId)

    return <div className="devotion-div">
        <img className="devotion-icon" src={foundGod.iconUrl} />
        <p><b>{foundGod?.name}</b></p>
        <div>
            <p>lvl</p><h3>{devotionObj?.devLevel}</h3>
        </div>
        <p> {devotionObj?.devPoints} devotion points </p>
    </div>
}