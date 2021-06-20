import {Route, Switch, useHistory} from 'react-router-dom';
import CreationCompetition from "./CreationCompetition";
import AjoutBlocs from "./AjoutBlocs";

const Gestion = () => {

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }

    return (
        <>
            <h1>Page gestion</h1>
            <button onClick={() => {goToResults('/gestion/creation')}} type='button'>Création Compétition</button>
            <button onClick={() => {goToResults('/gestion/ajoutBlocs')}} type='button'>Ajout Blocs</button>
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