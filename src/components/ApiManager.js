//~~~~~~~~~~~~~~~~~~~~~~~~~~~GETTER FETCH CALLS~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const getAllCharactersDetailedFetch = () => {
    return fetch(`http://localhost:8088/characters?_expand=class&_expand=weapon&_embed=characterAttributes`)
        .then(response => response.json())
}