export const getAllCharacterCards = () => {
    return fetch('http://localhost:8000/characters', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}