//Render text inputs for character name, bio, and imageURL. 
import { useState } from "react"
import { createCharacterImage } from "../../ApiManager"

export const CharacterInfoSelection = ({characterObj, setCharacter, charImageFile, setCharImageFile}) => {

    const [previewSource, setPreviewSource] = useState('')

    //When image is chosen, set that file as the preview file and the characterImageFile
    const handleOnChange = (event) => {
        const file = event.target.files[0]
        previewFile(file)
        setCharImageFile(file)
    }

    //Function that sends selected file to the preview section of the jsx.
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const submitPicture = () => {
        // if (previewSource) {
        //     uploadImage(previewSource)
        // }
        if (charImageFile) {

            const uploadPreset = 'wci8ewi5'
            const uploadURL = `https://api.cloudinary.com/v1_1/dfhvmg01x/image/upload`
            
            const formData = new FormData()
            formData.append("file", charImageFile)
            formData.append("upload_preset", uploadPreset)

            createCharacterImage(uploadURL, formData)
                .then(data => {
                    if (data.secure_url !== '') {
                        console.log(data.secure_url)
                        const copy = {...characterObj}
                        copy.imageUrl = data.secure_url
                        setCharacter(copy)
                    }
                })
                .catch(err => console.error(err))
        }
    }

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
                <div className="char-image-upload">
                    <input 
                        type="file" 
                        name="image"
                        onChange={(event)=>handleOnChange(event)} />
                </div>
            </fieldset>
            
            {
                (previewSource)
                ? <>
                <div>
                    <img src={previewSource} alt="uploaded character image" style={{height: '100px'}}/>
                </div>
                </>
                : <></>
            }
           
        </div>
}