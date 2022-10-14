export const getAllSpeciesAndBackgroundNames = () => {
    return fetch('http://localhost:8000/species', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}