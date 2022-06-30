import { ProgressBarPageName } from "./ProgressBarPageName"
import "./ProgressBar.css"

export const CharacterFormProgressBar = ( {step} ) => {
    const pageNames = [
        {
            id: 1,
            name: "Species"
        },
        {
            id: 2,
            name: "Background"
        },
        {
            id: 3,
            name: "Class"
        },
        {
            id: 4,
            name: "Subclass"
        },
        {
            id: 5,
            name: "Attributes"
        },
        {
            id: 6,
            name: "Equipment"
        },
        {
            id: 7,
            name: "Devotion"
        },
        {
            id: 8,
            name: "Details"
        },
    ]

    return <>
        <section className="progress-bar">
            {
                pageNames.map( pageNameObj => <ProgressBarPageName key={`ProgressBar--${pageNameObj.id}`}
                    pageNameObj={pageNameObj}
                    step={step} />)
            }
        </section>
    </>
}

