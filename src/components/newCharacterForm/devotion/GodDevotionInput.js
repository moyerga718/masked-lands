import { useState, useEffect } from "react"

//STILL FIGURING THIS BAD BOY OUT

export const GodDevotionInput = ( {godObj, availableDevPoints, setAvailableDevPoints} ) => {
    // const [points, setPoints] = useState(0)
    
    // const handleIncrement = (points) => {
    //     setPoints(points + 1)
    // }

    // const handleDecrement = (points) => {
    //     setPoints(points - 1)
    // }

    // useEffect(
    //     () => {
    //         setAvailableDevPoints(points)
    //     },
    //     [points]
    



    return <div>
        <p>{godObj?.name}</p>
        {/* <button className="devotion-decrement-button" type="button" onClick={handleDecrement(points)}> - </button>
        <p>{points}</p>
        <button className="devotion-increment-button" type="button" onClick={handleIncrement(points)}> + </button> */}

    </div>
}