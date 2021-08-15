import Card from "../components/UI/Card";
import Footer from "../components/UI/Footer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../store/categoriesSlice";
import './Resultats.module.css'
import grid from './Resultats.module.css'

const Resultats = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categorie.data)
    const loadingState = useSelector(state => state.categorie.loading)

    return (
        <>
            {loadingState === 'Loading ...' && <h3>Chargement en cours</h3>}

            {loadingState === 'fulfilled' &&
            <Card>
                <h1>Page resultats</h1>

                {categories.map(category => {
                    return (
                        <>
                            <h2>{category.categoryName}</h2>
                            <table>
                                <thead>
                                <th>Grimpeur</th>
                                <th>Total blocs sortis</th>

                                </thead>
                                <tbody>
                                {category.competitors.map(competitor => {
                                    return (
                                        <tr>
                                            <td>{competitor.firstname} {competitor.lastname}</td>
                                            <td className={grid.succes}> Total blocs réussis
                                                : {competitor.boulderSuccess === null ? 0 : (competitor.boulderSuccess.length - 1)}</td>
                                            {competitor.boulderSuccess && competitor.boulderSuccess.map(succes => {
                                                    return (
                                                        <td>{succes}</td>
                                                    )
                                                }
                                            )}

                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </>
                    )
                })}


                <Footer/>
            </Card>}
        </>
    )
}

export default Resultats;