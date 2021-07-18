import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../store/categoriesSlice";

const AjoutBlocs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)
    return (
        <>
            <h2>Insérer formulaire ajout blocs</h2>
            {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}
            {loadingState === 'fulfilled' &&
            <ul>
                {categories.map((categorie) => (
                    <li>{categorie.categoryName}</li>
                ))}
            </ul>}
        </>
    )
}

export default AjoutBlocs;