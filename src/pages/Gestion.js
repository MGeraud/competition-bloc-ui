import {Route, Switch, useHistory} from 'react-router-dom';
import CreationCompetition from "./CreationCompetition";
import AjoutBlocs from "./AjoutBlocs";
import classNames from './Gestion.module.css';
import {useKeycloak} from "@react-keycloak/web";
import Footer from "../components/UI/Footer";

const Gestion = () => {

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }
    const {keycloak} = useKeycloak();

    if (keycloak.authenticated && keycloak.hasRealmRole('gestion')) {
        return (
            <>
                <div className={classNames.buttonWrapper}>
                    <button className={classNames.button} onClick={() => {
                        goToResults('/gestion/creation')
                    }} type='button'>Création Compétition
                    </button>
                    <button className={classNames.button} onClick={() => {
                        goToResults('/gestion/ajoutBlocs')
                    }} type='button'>Ajout Blocs
                    </button>
                </div>
                <Switch>
                    <Route path='/gestion/creation'>
                        <CreationCompetition/>
                    </Route>
                    <Route path='/gestion/ajoutBlocs'>
                        <AjoutBlocs/>
                    </Route>
                </Switch>
                <Footer/>
            </>
        )
    } else if (keycloak.authenticated && !keycloak.hasRealmRole('gestion')) {
        return (
            <>
                {keycloak.logout()}
            </>
        )
    } else {
        return (
            <>
                {keycloak.login()}
            </>
        )
    }
}

export default Gestion;