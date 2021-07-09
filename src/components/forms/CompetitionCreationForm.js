import {Formik} from "formik";
import * as Yup from 'yup';


const CompetitionCreationForm = ()=>{
    return(
        <Formik
            initialValues={{ competitionName: '', year: '' }}
            validationSchema={Yup.object({
                competitionName: Yup.string()
                    .min(3, 'Le nom doit comporter au moins 3 caractères')
                    .required('Champ requis'),
                year: Yup.string()
                    .matches(/^(20)\d{2}$/ , 'Seules les années 2000 sont acceptées' )
                    .required('Required'),

            })}
            // onSubmit={(values) => { dispatch(action du slice(values)) }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="competitionName">competitionName</label>
                    <input
                        id="competitionName"
                        type="text"
                        {...formik.getFieldProps('competitionName')}
                    />
                    {formik.touched.competitionName && formik.errors.competitionName ? (
                        <div>{formik.errors.competitionName}</div>
                    ) : null}

                    <label htmlFor="year">Last Name</label>
                    <input
                        id="year"
                        type="text"
                        {...formik.getFieldProps('year')}
                    />
                    {formik.touched.year && formik.errors.year ? (
                        <div>{formik.errors.year}</div>
                    ) : null}


                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    )

}

export default CompetitionCreationForm