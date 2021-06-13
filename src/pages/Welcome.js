import {Link} from "react-router-dom";
import classNames from './Welcome.module.css';
import {Fragment} from "react";

const Welcome = () => {
    return (
        <Fragment className={classNames.displayLinks}>
            <Link to='/resultats'>
                <button type='button'>Résultats</button>
            </Link>

            <Link to='/juges'>
                <button type='button'>>Juges</button>
            </Link>

            <Link to='/inscriptions'>
                <button type='button'>Inscritpions</button>
            </Link>

            <Link to='/gestion'>
                <button type='button'>Gestion</button>
            </Link>

        </Fragment>
    )
}

export default Welcome;