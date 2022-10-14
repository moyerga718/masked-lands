export const getAllBackgroundNames = () => {
    return fetch('http://localhost:8000/backgrounds', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}