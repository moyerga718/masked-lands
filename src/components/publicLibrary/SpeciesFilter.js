export const SpeciesFilter = ( {speciesObj} ) => {
    return <option value={speciesObj?.id}><b>{speciesObj?.name}</b></option>
}