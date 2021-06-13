import './App.css';
import Bandeau from "./components/eca-logo/Bandeau";
import MainButton from "./components/main-buttons/MainButton";
import {Route, Switch, Redirect} from 'react-router-dom';
import Welcome from "./pages/Welcome";
import Juges from "./pages/Juges";
import Inscriptions from "./pages/Inscriptions";
import Gestion from "./pages/Gestion";
import Resultats from "./pages/Resultats";

function App() {
    return (
        <>
            <header>
                <Bandeau/>
            </header>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='Welcome'/>
                </Route>
                <Route path='/welcome'>
                    <Welcome/>
                </Route>
                <Route path='/juges'>
                    <Juges/>
                </Route>
                <Route path='/inscriptions'>
                    <Inscriptions/>
                </Route>
                <Route path={'/gestion'}>
                    <Gestion/>
                </Route>
                <Route path={'/resultats'}>
                    <Resultats/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
