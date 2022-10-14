export const getAllSubclassNames = () => {
    return fetch('http://localhost:8000/subclasses', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(response => response.json())
}