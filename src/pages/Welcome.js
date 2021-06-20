import { useHistory} from "react-router-dom";
import classNames from './Welcome.module.css';
import {Fragment} from "react";

const Welcome = () => {

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }

    return (
        <Fragment className={classNames.displayLinks}>
                <button className={classNames.button} onClick={() => {goToResults('/resultats')}} type='button'>Résultats</button>
                <button className={classNames.button} onClick={() => {goToResults('/juges')}} type='button'>Juges</button>
                <button className={classNames.button} onClick={() => {goToResults('/inscriptions')}} type='button'>Inscritpions</button>
                <button className={classNames.button} onClick={() => {goToResults('/gestion')}} type='button'>Gestion</button>
        </Fragment>
    )
}

export default Welcome;