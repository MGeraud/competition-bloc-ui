import './App.css';
import React , {Suspense} from "react";
import Bandeau from "./components/eca-logo/Bandeau";
import {Route, Switch, Redirect } from 'react-router-dom';
import Welcome from "./pages/Welcome";
import {useKeycloak} from "@react-keycloak/web";

// utilisation de lazy loading pour les différentes pages
const Juges = React.lazy( ()=> import("./pages/Juges"));
const Inscriptions = React.lazy(()=> import("./pages/Inscriptions"));
const Gestion = React.lazy(()=> import("./pages/Gestion"));
const Resultats = React.lazy(()=> import("./pages/Resultats"));

function App() {
    //initialisation de keycloak
    const {keycloak,initialized} = useKeycloak();
    if (!initialized) {
        return <h2> Loading ... </h2>
    }
    return (
        <>
            <header>
                <Bandeau/>
            </header>
            <Suspense fallback={<p>Loading ...</p>}>
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
                <Route path='/gestion'>
                    <Gestion/>
                </Route>
                <Route path='/resultats'>
                    <Resultats/>
                </Route>
            </Switch>
            </Suspense>
        </>
    );
}

export default App;
