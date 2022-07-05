export const BackgroundFilter = ( {backgroundObj} ) => {
    return <option value={backgroundObj?.id}>{backgroundObj?.name}</option>
}