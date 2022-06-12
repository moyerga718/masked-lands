import { Link, useNavigate } from "react-router-dom"

export const PublicCharacterCard = ( {characterObj} ) => {
    const navigate = useNavigate()

    return <section className="publicCharacterCard">
        <h3><Link to={`/character/${characterObj.id}`}>{characterObj.name}</Link></h3>
        <h4>{characterObj.class.name}</h4>
        <p>Bio: {characterObj.bio}</p>
        <p>Primary Weapon: {characterObj.weapon.name}</p>
    </section>
}