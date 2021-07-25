import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categoriesSlice";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import axios from "axios";
import TextError from "../components/forms/TextError";

const initialValues = {
    categoryId: '',
    competitor: '',
    boulderSuccess: '',
}


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const Juges = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();
    const dispatch = useDispatch();


    const [selectedCategorie, setSelectedCategorie] = useState(['']);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])


    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)


    return (
        <>
            <h2>Juges</h2>
            {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}
            {loadingState === 'fulfilled' &&
            <ul>
                {categories.map((categorie) => (
                    <li>{categorie.categoryName}
                        {categorie.competitors !== null &&
                        <ul>{categorie.competitors.map((competitor) =>
                            <li>{competitor.firstname} {competitor.lastname}</li>)}
                        </ul>}
                    </li>
                ))}
            </ul>}

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
                            boulderDone: values.boulderSuccess
                        }

                        alert(JSON.stringify(result, null, 2))

                        // await axios.post('http://localhost:8081/categorie/inscription', values, axiosConfig)
                        //     .then(response => {
                        //         setSucces(true);
                        //         setFailure(false);
                        //     })
                        //     .catch(e => {
                        //         setFailure(true);
                        //         setSucces(false);
                        //     })
                        //     .then(onSubmitProps.resetForm)

                    }}
            >
                {formik => {
                    return (
                        <Form>

                            <div>
                                <label htmlFor='categoryId'>Sélectionner la catégorie du competiteur</label>
                                <Field as='select' id='categoryId' name='categoryId'>
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

                            <div>
                                <label htmlFor='competitor'>Sélectionner le competiteur</label>
                                <Field as='select' id='competitor' name='competitor'>
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
                            <div>
                                <label htmlFor='boulderSuccess'>Sélectionner le competiteur</label>
                                <Field as='select' id='boulderSuccess' name='boulderSuccess'>
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
                            {/*bouton de reset du formulaire sansenvoi en cas d'echec du bloc*/}
                            <button style={{color: "white", backgroundColor: "red"}} type={"reset"}>Echec</button>
                            <button style={{color: "white", backgroundColor: "green"}} type='submit'
                                    disabled={!formik.isValid || formik.isSubmitting}>Réussite
                            </button>
                        </Form>
                    )
                }}

            </Formik>}
        </>
    )
}

export default Juges;