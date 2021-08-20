import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categoriesSlice";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import TextError from "../components/forms/TextError";
import {useKeycloak} from "@react-keycloak/web";
import keycloak from "../keycloak";
import Card from "../components/UI/Card";
import classes from "../components/UI/Card.module.css";
import box from './Juges.module.css';
import Footer from "../components/UI/Footer";

const initialValues = {
    categoryId: '',
    competitor: '',
    boulderSuccess: null,
}


//configuration des headers pour appel API avec passage de token pour autorisation
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
    }
}

const Juges = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])


    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)

    const {keycloak} = useKeycloak();


    if (keycloak.authenticated) {
        return (
            <>
                <Card>
                    {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}

                    {loadingState === 'fulfilled' &&
                    <Formik
                        initialValues={initialValues}

                        // envoi des données du formulaire vers l'api backend
                        onSubmit={
                            async (values, onSubmitProps) => {
                                // creation du result correspondant au format de lápi backend
                                const splittedName = values.competitor.split("+");

                                const result = {
                                    catId: values.categoryId,
                                    competitorFName: splittedName[0],
                                    competitorLName: splittedName[1],
                                    boulderDone: [values.boulderSuccess]
                                }


                                await axios.post('http://localhost:8081/juges/validation', result, axiosConfig)
                                    .catch(e => {
                                        console.log(e)
                                        alert("Echec de l'envoi")
                                    })
                                    .then(onSubmitProps.resetForm)

                            }}
                    >
                        {formik => {
                            return (
                                <Form>

                                    <div className={box.box}>
                                        <label htmlFor='categoryId'>Sélectionner la catégorie </label>
                                        <Field className={classes.field} as='select'
                                               id='categoryId' name='categoryId'>
                                            <option>Selectionnez une categorie</option>
                                            {categories.map((categorie) => {
                                                return (
                                                    <option key={categorie.id}
                                                            value={categorie.id}>{categorie.categoryName}</option>
                                                )
                                            })}
                                        </Field>
                                        <ErrorMessage name='categoryId' component={TextError}/>
                                    </div>

                                    <div className={box.box}>
                                        <label htmlFor='competitor'>Sélectionner le competiteur</label>
                                        <Field className={classes.field} as='select' id='competitor' name='competitor'>
                                            <option>Selectionnez un competiteur</option>
                                            {/*regarde si 1er select rempli alors filtre les categorie pour récup les competiteurs de celle selectionnée*/}
                                            {formik.values.categoryId !== "" && categories.filter(category => (
                                                category.id === formik.values.categoryId))[0].competitors.map(comp => {
                                                return (<option key={comp.firstname}
                                                                value={`${comp.firstname}+${comp.lastname}`}>{comp.lastname} {comp.firstname}</option>)
                                            })}
                                        </Field>
                                        <ErrorMessage name='categoryId' component={TextError}/>
                                    </div>
                                    <div className={box.box}>
                                        <label htmlFor='boulderSuccess'>Selectionnez un bloc</label>
                                        <Field className={classes.field} as='select' id='boulderSuccess'
                                               name='boulderSuccess'>
                                            <option>Selectionnez un bloc</option>
                                            {/*regarde si 1er select rempli alors filtre les categorie pour récup les blocs de celle selectionnée*/}
                                            {formik.values.categoryId !== "" && categories.filter(category => (
                                                category.id === formik.values.categoryId))[0].boulders.map(bloc => {
                                                return (<option key={bloc}
                                                                value={bloc}>{bloc}</option>)
                                            })}
                                        </Field>
                                        <ErrorMessage name='categoryId' component={TextError}/>
                                    </div>
                                    <div className={box.box}>
                                        {/*bouton de reset du formulaire sansenvoi en cas d'echec du bloc*/}
                                        <button className={box.judgeButton} style={{color: "white", backgroundColor: "red"}} type={"reset"}>Echec
                                        </button>
                                        <button className={box.judgeButton} style={{color: "white", backgroundColor: "green"}} type='submit'
                                                disabled={!formik.isValid || formik.isSubmitting}>Réussite
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}

                    </Formik>}
                </Card>
                <Footer/>
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

export default Juges;