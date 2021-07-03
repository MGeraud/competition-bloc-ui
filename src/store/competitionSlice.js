import {createSlice} from "@reduxjs/toolkit";

const competitionSlice =createSlice(
    {
        name: 'competition',
        initialState: {
            competitionName: '',
            year:'2021',
            categories: []
        },
        reducers:{
            addCompetition(state,action){

            }
        }
    }
);

export const competitionAction = competitionSlice.actions;
export default competitionSlice;