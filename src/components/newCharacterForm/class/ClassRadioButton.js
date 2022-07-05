import { SubclassList } from "./SubclassList"

export const ClassRadioButton = ( {classObj, characterObj, setCharacter, allAttributes, subclasses} ) => {

    

    //For the given classObj, find the name of the attribute that class gives a bonus to.
    const classAttribute = allAttributes.find(attribute => attribute.id === classObj.bonusAttributeId)

    const classSubclasses = subclasses.filter(subclass => subclass?.classId === classObj?.id)

    //Create a radio button that displays the class name and associated attribute bonus. When selected, update the main character object
    return <>
        <label className="labl">
            <input
                onChange={(changeEvent) => {
                    const copy = { ...characterObj };
                    copy.classId = parseInt(changeEvent.target.value);
                    setCharacter(copy);
                }}
                type="radio"
                name="classObj"
                value={classObj.id}
            />{" "}
            <div className="selection-div">
                <div className="selection-image-div">
                    <img className="selection-image" src={classObj?.imageUrl} />
                </div>
                <div className="selection-information-div">
                    <h3 className="selection-text">{`${classObj.name}`}</h3>
                    <p className="selection-text"><i>{`${classObj.description}`}</i></p>
                    <h5 className="selection-text-subclass-title">Subclasses:</h5>
                    {
                        (classSubclasses)
                        ? <div>
                        {
                            classSubclasses.map( subclassObj => <SubclassList 
                                key={`subclass--${subclassObj?.id}`}
                                subclassObj = {subclassObj}
                                />)
                        }
                        </div>
                        : <></>
                    }
                </div>
            </div>
        
        </label>
        </>
}