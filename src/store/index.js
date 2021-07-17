import {configureStore} from "@reduxjs/toolkit";
import competitionSlice from "./competitionSlice";
import categoriesSlice from "./categoriesSlice";



const store =configureStore(
    {
        reducer:{
            competition: competitionSlice,
            categorie:categoriesSlice,
        }
    }
);

export default store;