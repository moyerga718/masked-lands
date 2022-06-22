import { useState, useEffect } from "react"

//STILL FIGURING THIS BAD BOY OUT

export const GodDevotionInput = ({ godObj, charDevotion, setCharDevotion, availableDevPoints, setAvailableDevPoints }) => {
    const [points, setPoints] = useState(0)
    const [incrementDisabled, setIncrementDisabled] = useState(false)
    const [decrementDisabled, setDecrementDisabled] = useState(true)

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
    return <div>
        <p>{godObj?.name}</p>
        <button onClick={() => handleIncrement()}
            disabled={incrementDisabled}>
            +</button>
        <p>{points}</p>
        <button onClick={() => handleDecrement()}
            disabled={decrementDisabled}>
            -</button>

    </div>
}