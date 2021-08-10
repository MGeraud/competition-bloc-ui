import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categoriesSlice";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import axios from "axios";
import TextError from "../components/forms/TextError";
import keycloak from "../keycloak";
import Card from "../components/UI/Card";
import {useHistory} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import classes from "../components/UI/Card.module.css";

const initialValues = {
    id: '',
    competitors: [{
        firstname: '',
        lastname: '',
        club: '',
        boulderSuccess: ['']
    }],
}

//configuration des headers pour appel API avec passage de token pour autorisation
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
    }
}

const Inscriptions = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    //utilisation de useHistory() de react-router-dom comme trick pour ne plus voir les liens soulignés dans les boutons
    const history = useHistory();

    const goToResults = (path) => {
        history.push(path);
    }
    const {keycloak} = useKeycloak();
    const handleLogout = () => {
        keycloak.logout({ redirectUri: 'http://localhost:3000' });
    }
    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)

    if (keycloak.authenticated && keycloak.hasRealmRole('gestion')) {
        return (
            <>
                <Card>
                    <h2>Inscriptions</h2>
                    {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}

                    {loadingState === 'fulfilled' &&
                    <Formik
                        initialValues={initialValues}

                        // envoi des données du formulaire vers l'api backend
                        onSubmit={
                            async (values, onSubmitProps) => {

                                await axios.post('http://localhost:8081/categorie/inscription', values, axiosConfig)
                                    .then(response => {
                                        setSucces(true);
                                        setFailure(false);
                                    })
                                    .catch(e => {
                                        setFailure(true);
                                        setSucces(false);
                                    })
                                    .then(onSubmitProps.resetForm)

                            }}
                    >
                        {formik => {
                            return (
                                <Form>
                                    <div>{console.log(categories)}</div>
                                    <div>
                                        <label htmlFor='id'>Sélectionner la catégorie à laquelle ajouter un
                                            competiteur</label>
                                        <Field className={classes.field} as='select' id='id' name='id'>
                                            <option>Selectionnez une categorie</option>
                                            {categories.map((categorie) => {
                                                return (
                                                    <option key={categorie.id}
                                                            value={categorie.id}>{categorie.categoryName}</option>
                                                )
                                            })}
                                        </Field>
                                        <ErrorMessage name='id' component={TextError}/>
                                    </div>

                                    <div>
                                        <label htmlFor="competitors[0].lastname">nom</label>
                                        <Field className={classes.field} type='text' id="competitors[0].lastname" name="competitors[0].lastname"/>
                                        <ErrorMessage name='competitors[0].lastname' component={TextError}/>
                                    </div>
                                    <div>
                                        <label htmlFor="competitors[0].firstname">prénom</label>
                                        <Field className={classes.field} type='text' id="competitors[0].firstname"
                                               name="competitors[0].firstname"/>
                                        <ErrorMessage name='competitors[0].firstname' component={TextError}/>
                                    </div>
                                    <div>
                                        <label htmlFor="competitors[0].club">club</label>
                                        <Field className={classes.field} type='text' id="competitors[0].club" name="competitors[0].club"/>
                                        <ErrorMessage name='competitors[0].club' component={TextError}/>
                                    </div>
                                    <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Envoyer
                                    </button>
                                </Form>
                            )
                        }}

                    </Formik>}


                </Card>
                <footer>
                    <button onClick={handleLogout}>Se déconnecter</button>
                    <button onClick={() => {
                        goToResults('/welcome')
                    }} type='button'>Accueil
                    </button>
                </footer>
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

export default Inscriptions;