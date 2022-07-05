import "./DevotionList.css"

export const DevotionList = ({ devotionObj, gods }) => {


    const foundGod = gods.find(god => god.id === devotionObj.godId)

    const devotedStyle = {
        background: `rgba(${foundGod?.rgb}, 0.2)`,
        borderColor: `rgba(${foundGod?.rgb}, 1)`,
        boxShadow: `0px 5px 75px ${devotionObj?.devLevel}0px rgba(${foundGod?.rgb}, 0.2${devotionObj?.devLevel})`
    }

    if (devotionObj?.devLevel > 0) {
        return <div className="devotion-div" style={devotedStyle}>
            <div className="devotion-div-header">
                <img className="devotion-icon" src={foundGod?.iconUrl} />
                <h4 className="god-name">{foundGod?.shortName}</h4>
            </div>
            <div>
                <div className="devotion-level-div">
                    <h3 className="devotion-text">{devotionObj?.devLevel}</h3>
                    <h5 className="devotion-text">Devotion Level</h5>
                </div>
                <div className="devotion-points-div">
                    <h4 className="devotion-text"> {devotionObj?.devPoints}</h4>
                    <h5 className="devotion-text">Devotion Points</h5>
                </div>
            </div>
        </div>
    } else {
        return <div className="devotion-div">
            <div className="devotion-div-header">
                <img className="devotion-icon" src={foundGod?.iconUrl} />
                <h4 className="god-name">{foundGod?.shortName}</h4>
            </div>
            <div>
                <div className="devotion-level-div">
                    <h3 className="devotion-text">{devotionObj?.devLevel}</h3>
                    <h5 className="devotion-text">Devotion Level</h5>
                </div>
                <div className="devotion-points-div">
                    <h4 className="devotion-text"> {devotionObj?.devPoints}</h4>
                    <h5 className="devotion-text">Devotion Points</h5>
                </div>
            </div>
        </div>
    }

}
