import * as Yup from 'yup';
import axios from "axios";
import {useState} from "react";
import {Form, Field, Formik, ErrorMessage, FieldArray} from "formik";
import keycloak from "../../keycloak";

const initialValues = {
    id: '',
    categoryName:'',
    boulders: [''],
}

const validationSchema = Yup.object({
    boulders: Yup.string().required('champ requis'),
})

//configuration des headers pour appel API avec passage de token pour autorisation
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
    }
}

const BouldersForm = () => {
    const [succes, setSucces] = useState();
    const [failure, setFailure] = useState();


    return(
        <>
            {succes && <h2 style={{ color: 'green' }}>Enregistré</h2>}
            {failure && <h2 style={{ color: 'red' }}>Une erreur a eu lieu, veuillez essayer à nouveau</h2>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Envoyer</button>
                        </Form>
                    )
                }}

            </Formik>
        </>
    );
};

export default BouldersForm;