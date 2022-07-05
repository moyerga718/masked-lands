export const ClassFilter = ( {classObj} ) => {
    return <option value={classObj?.id}>{classObj?.name}</option>
}