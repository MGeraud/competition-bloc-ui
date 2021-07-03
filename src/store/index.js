import {configureStore} from "@reduxjs/toolkit";

const store =configureStore(
    {
        reducer:{
            competition: competitionSlice.reducer,
        }
    }
);

export default store;