import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <h1>coucou</h1>
            <ul>
                <li>
                    <Link to='/resultats'>Results</Link>
                </li>
                <li>
                    <Link to='/juges'>Juges</Link>
                </li>
                <li>
                    <Link to='/inscriptions'>Inscritpions</Link>
                </li>
                <li>
                    <Link to='/gestion'>Gestion</Link>
                </li>
            </ul>
        </>
    )
}

export default Welcome;