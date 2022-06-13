//~~~~~~~~~~~~~~~~~~~~~~~~~~~GETTER FETCH CALLS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const getAllCharactersDetailedFetch = () => {
    return fetch(`http://localhost:8088/characters?_expand=class&_expand=weapon&_embed=characterAttributes`)
        .then(response => response.json())
}

export const getCurrentUserInformationFetch = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
        .then(response => response.json())
}

export const getAllUserInformationFetch = () => {
    return fetch(`http://localhost:8088/users`)
        .then(response => response.json())
}

export const getAllCharactersForCurrentUserFetch = (userId) => {
    return fetch(`http://localhost:8088/characters?_expand=class&_expand=weapon&_embed=characterAttributes&userId=${userId}`)
        .then(response => response.json())
}

export const getUserByEmailFetch = (userObj) => {
    return fetch(`http://localhost:8088/users?email=${userObj.email}`)
        .then(response => response.json())
}

export const getUserByUsernameFetch = (userObj) => {
    return fetch(`http://localhost:8088/users?username=${userObj.username}`)
        .then(response => response.json())
}

export const getAllClassesFetch = () => {
    return fetch(`http://localhost:8088/classes`)
        .then(response => response.json())
}

export const getAllAttributesFetch = () => {
    return fetch(`http://localhost:8088/attributes`)
        .then(response => response.json())
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~PUT FETCH CALLS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const saveUserProfileFetch = (profile) => {
    return fetch(`http://localhost:8088/users/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}