import { useState, useEffect } from "react"

//STILL FIGURING THIS BAD BOY OUT

export const GodDevotionInput = ({ godObj, charDevotion, setCharDevotion, availableDevPoints, setAvailableDevPoints }) => {
    const [points, setPoints] = useState(0)
    const [devLevel, setDevLevel] = useState(0)
    const [incrementDisabled, setIncrementDisabled] = useState(false)
    const [decrementDisabled, setDecrementDisabled] = useState(true)
    const [divStyle, setDivStyle] = useState({
        borderColor: '#031926',
        boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.15)'
    })
    const [boxShadowSpreadVal, setBoxShadowSpreadVal] = useState(1)

    //function that increases number of points for this god when increment button is clicked.
    const handleIncrement = () => {
        setPoints(points + 1)
        setAvailableDevPoints(availableDevPoints - 1)
    }

    //function that decreases number of points for this god when decrement button is clicked.
    const handleDecrement = () => {
        setPoints(points - 1)
        setAvailableDevPoints(availableDevPoints + 1)
    }

    useEffect(
        () => {
            if (points > 0) {
                setBoxShadowSpreadVal(points * 10)
            } else {
                setBoxShadowSpreadVal(1)
            }

            setDevLevel(findDevotionLevel(points))
        },
        [points]
    )

    useEffect(
        () => {
            if (boxShadowSpreadVal > 1) {
                setDivStyle({
                    borderColor: `rgba(${godObj?.rgb}, 1)`,
                    boxShadow: `0px 5px 75px ${boxShadowSpreadVal}px rgba(${godObj?.rgb}, 0.2${points})`
                })
            } else {
                setDivStyle({
                    borderColor: '#031926',
                    boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.15)'
                })

            }
        },
        [boxShadowSpreadVal]
    )

    //Function to calculate points level

    const findDevotionLevel = (pointsVal) => {
        let devLevel = 0
        if (pointsVal >= 21) {
            devLevel = 5
            return devLevel
        } else if (pointsVal >= 15) {
            devLevel = 4
            return devLevel
        } else if (pointsVal >= 9) {
            devLevel = 3
            return devLevel
        } else if (pointsVal >= 5) {
            devLevel = 2
            return devLevel
        } else if (pointsVal >= 2) {
            devLevel = 1
            return devLevel
        } else {
            devLevel = 0
            return devLevel
        }
    }



    //useEffect looks out for whether increment/decrement buttons should be disabled.
    //User should not be able to decrement past zero or spend more devotion points than alloted by subclass.
    useEffect(
        () => {
            if (availableDevPoints === 0) {
                setIncrementDisabled(true)
            } else if (availableDevPoints > 0) {
                setIncrementDisabled(false)
            }

            if (points > 0) {
                setDecrementDisabled(false)
            } else {
                setDecrementDisabled(true)
            }
        },
        [availableDevPoints]
    )

    useEffect(
        () => {
            const devotionCopy = [...charDevotion]
            const changedCopy = devotionCopy.map(
                godDevotion => {
                    if (godDevotion.godId === godObj.id) {
                        godDevotion.devPoints = points
                        return godDevotion
                    } else {
                        return godDevotion
                    }
                }
            )
            setCharDevotion(changedCopy)
        },
        [points]
    )

    //Return gods name, number of devotion points, increment and decrement buttons.
    return <div className="god-div" style={divStyle}>
        <div className="god-image-div">
            <img className="god-image" src={godObj?.imageUrl} />
        </div>
        <div className="god-info-div">
            <div className="god-header">
            <h3 className="god-text">{godObj?.name}</h3>
            {/* <img className="god-icon" src={godObj?.iconUrl} /> */}
            </div>
            <p className="god-text"><i>{godObj?.description}</i></p>
            <div className="god-devotion-container">
                <h4 className="god-text">Devotion Points</h4>
                <div className="god-div-devotion-selection-container">
                    <button className="devotion-button" onClick={() => handleDecrement()}
                        disabled={decrementDisabled}>
                        -</button>
                    <h4 className="god-div-points-value">{points}</h4>
                    <button className="devotion-button" onClick={() => handleIncrement()}
                        disabled={incrementDisabled}>
                        +</button>
                </div>
                <h4 className="god-text">Devotion Level {devLevel}</h4>
            </div>
        </div>
    </div>
}