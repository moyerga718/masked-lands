//Render text inputs for character name, bio, and imageURL. 

export const CharacterInfoSelection = ({characterObj, setCharacter}) => {
    return <div>
        <h2>CHARACTER INFO SELECTION</h2>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Character Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Go crazy with it"
                        value={characterObj.name}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...characterObj }
                                copy.name = changeEvent.target.value
                                setCharacter(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Character Bio:</label>
                    <input
                        required autoFocus
                        type="textarea"
                        className="form-control"
                        placeholder="Tell me about this goof"
                        rows={5}
                        cols={5}
                        value={characterObj.bio}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...characterObj }
                                copy.bio = changeEvent.target.value
                                setCharacter(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Character Image URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Url here"
                        value={characterObj.imageUrl}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...characterObj }
                                copy.imageUrl = changeEvent.target.value
                                setCharacter(copy)
                            }
                        } />
                </div>
            </fieldset>
        </div>
}