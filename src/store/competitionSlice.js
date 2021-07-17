import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const createCompetition = createAsyncThunk(
    'competition/createCompetition',
    async (competition) => {
        const response = await axios.post('http://localhost:8081/competition/creation' , competition);
        return response;
    }

)

const competitionSlice =createSlice(
    {
        name: 'competition',
        initialState: {
            competition: ''
        },
        reducers:{},
       extraReducers:{
            [createCompetition.fulfilled]: (state , {payload}) =>{
                state.competition = payload;
                console.log(state.competition)

            }
       }
    }
);


export default competitionSlice.reducer;