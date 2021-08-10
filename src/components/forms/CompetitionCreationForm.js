import {Form, Field, Formik, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';
import TextError from "./TextError";
import axios from "axios";
import {useState} from "react";
import keycloak from "../../keycloak";
import classes from '../UI/Card.module.css'

//valeur par défaut avant complétion du formulaire
const initalValues = {
    competitionName: '',
    year: '',
    categories: ['']
};

// schéma de validation des champs de formulaire
const validationSchema = Yup.object({
    competitionName: Yup.string()
        .min(3, 'Le nom doit comporter au moins 3 caractères')
        .required('Champ requis'),
    year: Yup.string()
        .matches(/^(20)\d{2}$/, 'Seules les années 2000 sont acceptées')
        .required('Required'),
})

//configuration des headers pour appel API avec passage de token pour autorisation
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
    }
}

const CompetitionCreationForm = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();

    // const dispatch = useDispatch();
    return (<>
            {succes && <h2 style={{ color: 'green' }}>Enregistré</h2>}
            {failure && <h2 style={{ color: 'red' }}>Une erreur a eu lieu, veuillez essayer à nouveau</h2>}

            <Formik
                initialValues={initalValues}
                validationSchema={validationSchema}
                // envoi des données du formulaire vers l'api backend
                onSubmit={
                    async (values, onSubmitProps) => {

                        await axios.post('http://localhost:8081/competition/creation', values, axiosConfig)
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
                                <label htmlFor="competitionName">Nom de la compétition</label>
                                <Field className={classes.field} type='text' id="competitionName" name="competitionName"/>
                                <ErrorMessage name='competitionName' component={TextError}/>
                            </div>

                            <div>
                                <label htmlFor="year">Année </label>
                                <Field className={classes.field} type='text' id="year" name="year"/>
                                <ErrorMessage name='year' component={TextError}/>
                            </div>
                            <div>
                                <label>Liste de catégories</label>
                                {/*utilisation de FieldArray de formik pour créer directement un array de categories*/}
                                <FieldArray  name='categories'>
                                    {fieldArrayProps => {
                                        const {push, remove, form} = fieldArrayProps;
                                        const {values} = form;
                                        const {categories} = values;
                                        return (
                                            <div>
                                                {categories.map((category, index) => (
                                                    <div key={index}>
                                                        <Field className={classes.field} name={`categories[${index}]`}/>
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

            </Formik>
        </>
    )

}

export default CompetitionCreationForm