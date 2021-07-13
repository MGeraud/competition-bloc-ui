import {useDispatch} from 'react-redux';
import {Form, Field, Formik, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';
import {createCompetition} from "../../store/competitionSlice";
import TextError from "./TextError";

//valeur par défaut avant complétion du formulaire
const  initalValues = {
    competitionName: '',
    year: '',
    categories:['']
};

const validationSchema=Yup.object({
        competitionName: Yup.string()
            .min(3, 'Le nom doit comporter au moins 3 caractères')
            .required('Champ requis'),
        year: Yup.string()
            .matches(/^(20)\d{2}$/, 'Seules les années 2000 sont acceptées')
            .required('Required'),
    })


const CompetitionCreationForm = () => {

    // const dispatch = useDispatch();
    return (
        <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            // onSubmit={(values) => { dispatch(action du slice(values)) }}
            onSubmit={(values, {setSubmitting}) => {

                setTimeout(() => {
                    // dispatch(createCompetition(values));
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => {
                return (
                    <Form>
                        <div>
                            <label htmlFor="competitionName">competitionName</label>
                            <Field type='text' id="competitionName" name="competitionName" />
                            <ErrorMessage name='competitionName' component={TextError} />
                        </div>

                        <div>
                            <label htmlFor="year">competitionName</label>
                            <Field type='text' id="year" name="year" />
                            <ErrorMessage name='year' component={TextError} />
                        </div>
                        <div>
                            <label>Liste de catégories</label>
                            {/*utilisation de FieldArray de formik pour créer directement un array de categories*/}
                            <FieldArray name='categories'>
                                {fieldArrayProps => {
                                    const {push , remove, form} = fieldArrayProps;
                                    const {values} = form;
                                    const {categories} = values;
                                    return(
                                        <div>
                                            {categories.map((category, index) => (
                                            <div key={index}>
                                                <Field name={`categories[${index}]`}/>
                                                {index>0 && (
                                                    <button type='button' onClick={() => remove(index)}>-</button>
                                                )}
                                                <button type='button' onClick={()=> push('')}>+</button>
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
    )

}

export default CompetitionCreationForm