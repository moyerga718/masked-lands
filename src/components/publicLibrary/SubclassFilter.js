export const SubclassFilter = ( {subclassObj} ) => {
    return <option value={subclassObj?.id}>{subclassObj?.name}</option>
}