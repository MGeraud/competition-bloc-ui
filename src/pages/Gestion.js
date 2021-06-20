import {Route, Switch, useHistory} from 'react-router-dom';
import CreationCompetition from "./CreationCompetition";
import AjoutBlocs from "./AjoutBlocs";
import classNames from './Gestion.module.css';

const Gestion = () => {

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }

    return (
        <>
            <h1>Page gestion</h1>
            <div className={classNames.buttonWrapper}>
            <button className={classNames.button} onClick={() => {goToResults('/gestion/creation')}} type='button'>Création Compétition</button>
            <button className={classNames.button} onClick={() => {goToResults('/gestion/ajoutBlocs')}} type='button'>Ajout Blocs</button>
            </div>
            <Switch>
                <Route path='/gestion/creation'>
                    <CreationCompetition/>
                </Route>
                <Route path='/gestion/ajoutBlocs'>
                    <AjoutBlocs/>
                </Route>
            </Switch>
        </>
    )
}

export default Gestion;