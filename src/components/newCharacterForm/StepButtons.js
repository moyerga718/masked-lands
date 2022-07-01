//Taking out previous buttons rn because they don't work with what I have! State isn't being preserved when I go back to previous pages soooooo....
import "./StepButtons.css"

export const StepButtons = ({step, nextStep, prevStep}) => {
    if (step === 1) {
        return <button className="step-button" onClick={()=>nextStep(step)}>Next</button>
    } else if (step === 8) {
        // return <button className="step-button" onClick={()=>prevStep(step)}>Previous</button>
        return <></>
    } else {
        return <div>
            {/* <button className="step-button" onClick={()=>prevStep(step)}>Previous</button> */}
            <button className="step-button" onClick={()=>nextStep(step)}>Next</button>
        </div>
    }
}