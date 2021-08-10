import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCategories} from "../store/categoriesSlice";
import axios from "axios";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import TextError from "../components/forms/TextError";
import keycloak from "../keycloak";
import Card from "../components/UI/Card";


const initialValues = {
    id: '',
    boulders: [''],
}


//configuration des headers pour appel API avec passage de token pour autorisation
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
    }
}
const AjoutBlocs = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)


    return (
        <Card>

            <h2>Insérer formulaire ajout blocs</h2>
            {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}
            {loadingState === 'fulfilled' &&
            <div>
                <ul>
                    {categories.map((categorie) => (
                        <li>{categorie.categoryName}
                            {categorie.boulders !== null &&
                            <ul>{categorie.boulders.map((bloc) =>
                                <li>{bloc}</li>)}
                            </ul>}
                        </li>
                    ))}
                </ul>
                <h2>
                    test :
                    {categories.map((cat) => (cat.categoryName === "Cadet Garcons" ? cat.id : null))}
                </h2>
            </div>}

            {loadingState === 'fulfilled' &&
            <Formik
                initialValues={initialValues}

                // envoi des données du formulaire vers l'api backend
                onSubmit={
                    async (values, onSubmitProps) => {

                        await axios.post('http://localhost:8081/competition/add', values, axiosConfig)
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
                            <div>
                                <label htmlFor='id'>Sélectionner la catégorie à laquelle ajouter les blocs</label>
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
                                <label>Liste de bloc à ajouter</label>
                                {/*utilisation de FieldArray de formik pour créer directement un array de categories*/}
                                <FieldArray name='boulders'>
                                    {fieldArrayProps => {
                                        const {push, remove, form} = fieldArrayProps;
                                        const {values} = form;
                                        const {boulders} = values;
                                        return (
                                            <div>
                                                {boulders.map((boulder, index) => (
                                                    <div key={index}>
                                                        <Field name={`boulders[${index}]`}/>
                                                        {index > 0 && (
                                                            <button type='button'
                                                                    onClick={() => remove(index)}>-</button>
                                                        )}
                                                        <button type='button' onClick={() => push('')}>+</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }}
                                </FieldArray>
                            </div>
                            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Envoyer</button>
                        </Form>
                    )
                }}

            </Formik>}
        </Card>
    )
}

export default AjoutBlocs;