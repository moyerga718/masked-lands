export const getAllCharacterCards = () => {
    return fetch('http://localhost:8000/characters', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}

export const getFilteredCharacterCards = (name,speciesId,backgroundId,classId,subclassId) => {
    return fetch(`http://localhost:8000/characters?name=${name}&species=${speciesId}&background=${backgroundId}&class=${classId}&subclass=${subclassId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}