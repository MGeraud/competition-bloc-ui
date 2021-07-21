import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categoriesSlice";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import axios from "axios";
import TextError from "../components/forms/TextError";

const initialValues = {
    id: '',
    competitors: [{
        firstname:'',
        lastname:'',
        club:'',
        boulderSuccess: ['']
    }],
}


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}
const Inscriptions = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)


    return (
        <>
            <h2>Inscriptions</h2>
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
                                <label htmlFor='id'>Sélectionner la catégorie à laquelle ajouter un competiteur</label>
                                <Field as='select' id='id' name='id'>
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
                                <Field type='text' id="competitors[0].lastname" name="competitors[0].lastname"/>
                                <ErrorMessage name='competitors[0].lastname' component={TextError}/>
                            </div>
                            <div>
                                <label htmlFor="competitors[0].firstname">prénom</label>
                                <Field type='text' id="competitors[0].firstname" name="competitors[0].firstname"/>
                                <ErrorMessage name='competitors[0].firstname' component={TextError}/>
                            </div>
                            <div>
                                <label htmlFor="competitors[0].club">club</label>
                                <Field type='text' id="competitors[0].club" name="competitors[0].club"/>
                                <ErrorMessage name='competitors[0].club' component={TextError}/>
                            </div>
                            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Envoyer</button>
                        </Form>
                    )
                }}

            </Formik>}


        </>
    )
}

export default Inscriptions;