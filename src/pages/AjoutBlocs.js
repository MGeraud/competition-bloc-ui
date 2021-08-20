import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCategories} from "../store/categoriesSlice";
import axios from "axios";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import TextError from "../components/forms/TextError";
import keycloak from "../keycloak";
import Card from "../components/UI/Card";
import classes from '../components/UI/Card.module.css'
import grid from '../components/forms/CompetitionCreationForm.module.css'


const initialValues = {
    id: '',
    boulders: [null],
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
            {succes && <h2 style={{color: 'green'}}>Enregistré</h2>}
            {failure && <h2 style={{color: 'red'}}>Une erreur a eu lieu, veuillez essayer à nouveau</h2>}
            <h2>Formulaire d'ajout de blocs</h2>

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
                        <Form className={grid.container}>
                            <div className={grid.label1}>
                                <label htmlFor='id'>Sélectionner la catégorie</label>
                            </div>
                            <div className={grid.label2} style={{marginTop: 10}}>
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

                            <div className={grid.categories}>
                                <label>Ajouter les blocs pour la catégorie</label>
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
                                                        <Field className={classes.field} name={`boulders[${index}]`}/>
                                                        {index > 0 && (
                                                            <button className={classes.miniButton} type='button'
                                                                    onClick={() => remove(index)}>-</button>
                                                        )}
                                                        <button className={classes.miniButton} type='button' onClick={() => push('')}>+</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }}
                                </FieldArray>
                            </div>
                            <button className={grid.submit} type='submit'
                                    disabled={!formik.isValid || formik.isSubmitting}>Envoyer
                            </button>
                        </Form>
                    )
                }}

            </Formik>}
        </Card>
    )
}

export default AjoutBlocs;