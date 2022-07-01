//Render text inputs for character name, bio, and imageURL. 
import { useState } from "react"
import { createCharacterImage } from "../../ApiManager"
import "./CharacterInfoSelection.css"

export const CharacterInfoSelection = ({ characterObj, setCharacter, charImageFile, setCharImageFile }) => {

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
                        const copy = { ...characterObj }
                        copy.imageUrl = data.secure_url
                        setCharacter(copy)
                    }
                })
                .catch(err => console.error(err))
        }
    }

    return <>
            <h2>Character Details</h2>
        <div className="details-container">
            {/* <fieldset className="form-field"> */}
            <div className="form-image-div">
                {/* </fieldset> */}

                {
                    (previewSource)
                        ? <>
                            <div className="image-preview">
                                <img className="char-image" src={previewSource} alt="uploaded character image"  />
                            </div>
                        </>
                        : <div className="image-preview">
                            Image preview
                        </div>
                }

                <div className="char-image-upload">
                    <input
                        type="file"
                        name="image"
                        onChange={(event) => handleOnChange(event)} />
                </div>
            </div>
            <div className="form-text-div">

                <div className="form-group">
                    <label htmlFor="name"><h4 className="input-title">Character Name: </h4></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Gimme a name, any name"
                        value={characterObj.name}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...characterObj }
                                copy.name = changeEvent.target.value
                                setCharacter(copy)
                            }
                        } />
                </div>
                {/* </fieldset>
            <fieldset className="form-field"> */}
                <div className="form-group">
                    <label htmlFor="bio"><h4 className="input-title">Character Bio:</h4></label>
                    <textarea
                        name="bio"
                        className="form-control-bio"
                        placeholder="Keep it short n' sweet"
                        value={characterObj.bio}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...characterObj }
                                copy.bio = changeEvent.target.value
                                setCharacter(copy)
                            }} />
                </div>
                {/* // <input
                    //     required autoFocus
                    //     type="textarea"
                    //     className="form-control"
                    //     placeholder="Tell me about this goof"
                    //     value={characterObj.bio}
                    //     onChange={
                    //         (changeEvent) => {
                    //             const copy = {...characterObj}
                    //             copy.bio = changeEvent.target.value
                    //             setCharacter(copy)
                    //         }
                    //     } /> */}
                {/* </fieldset>
            <fieldset className="form-field"> */}
            </div>

        </div>
    </>
}