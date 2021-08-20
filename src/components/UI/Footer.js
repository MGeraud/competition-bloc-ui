import {useKeycloak} from "@react-keycloak/web";
import {useHistory} from "react-router-dom";
import footercss from './Footer.module.css'

const Footer = () => {

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }

    const {keycloak} = useKeycloak();

    const handleLogout = () => {
        keycloak.logout({redirectUri: 'http://localhost:3000'});
    }

    return(
        <div className={footercss.body}>
            { keycloak.authenticated && <button className={footercss.button} onClick={handleLogout}>Se déconnecter</button>}
            <button className={footercss.button} onClick={() => {
                goToResults('/welcome')
            }} type='button'>Accueil
            </button>
        </div>
    )
}

export default Footer;