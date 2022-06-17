//Taking out previous buttons rn because they don't work with what I have! State isn't being preserved when I go back to previous pages soooooo....

export const StepButtons = ({step, nextStep, prevStep}) => {
    if (step === 1) {
        return <button onClick={()=>nextStep(step)}>Next</button>
    } else if (step === 5) {
        // return <button onClick={()=>prevStep(step)}>Previous</button>
    } else {
        return <div>
            {/* <button onClick={()=>prevStep(step)}>Previous</button> */}
            <button onClick={()=>nextStep(step)}>Next</button>
        </div>
    }
}