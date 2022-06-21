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

export const getDetailedCharacterById = (characterId) => {
    return fetch(`http://localhost:8088/characters?_expand=class&_expand=weapon&_embed=characterAttributes&id=${characterId}`)
        .then(response => response.json())
}

export const getBasicCharacterById = (characterId) => {
    return fetch(`http://localhost:8088/characters/${characterId}`)
        .then(response => response.json())
}

export const getCharacterAttributes = (characterId) => {
    return fetch(`http://localhost:8088/characterAttributes?characterId=${characterId}`)
    .then(response => response.json())
}

export const getCharacterClass = (classId) => {
    return fetch(`http://localhost:8088/classes/${classId}`)
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

export const getAllSpeciesFetch = () => {
    return fetch(`http://localhost:8088/species`)
        .then(response => response.json())
}

export const getAllAttributesFetch = () => {
    return fetch(`http://localhost:8088/attributes`)
        .then(response => response.json())
}

export const getAllWeaponsFetch = () => {
    return fetch(`http://localhost:8088/weapons/?_expand=attribute`)
        .then(response => response.json())
}

export const getAllArmorFetch = () => {
    return fetch(`http://localhost:8088/armors`)
        .then(response => response.json())
}

export const getCharacterBackgroundFetch = (backgroundId) => {
    return fetch(`http://localhost:8088/backgrounds/${backgroundId}/?_embed=backgroundAttributeBonuses`)
        .then(response => response.json())
}

export const getSpeciesBackgroundsWithAttBonusesFetch = (speciesId) => {
    return fetch(`http://localhost:8088/backgrounds/?_embed=backgroundAttributeBonuses&speciesId=${speciesId}`)
    .then(response => response.json())
}

export const getSpeciesByIdFetch = (speciesId) => {
    return fetch(`http://localhost:8088/species/${speciesId}`)
        .then(response => response.json())
}

export const getClassByIdFetch = (classId) => {
    return fetch(`http://localhost:8088/classes/${classId}`)
        .then(response => response.json())
}

export const getSubclassesByClassIdFetch = (classId) => {
    return fetch(`http://localhost:8088/subclasses/?classId=${classId}`)
        .then(response => response.json())
}

export const getCharacterSubclassByIdFetch = (subclassId) => {
    return fetch(`http://localhost:8088/subclasses/${subclassId}`)
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~POST FETCH CALLS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const createCharacterFetch = (characterToSendToAPI) => {
    return fetch(`http://localhost:8088/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(characterToSendToAPI)
    })
        .then(response => response.json())
}

export const createCharacterAttributeFetch = (charAttToSendToAPI) => {
    return fetch(`http://localhost:8088/characterAttributes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(charAttToSendToAPI)
    })
        // .then(response => response.json())
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~DELETE FETCH CALLS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const deleteCharacterFetch = (characterId) => {
    return fetch(`http://localhost:8088/characters/${characterId}`, {
        method: "DELETE"
    })
}