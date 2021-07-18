import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:'',
    data: null,
}

export const fetchCategories = createAsyncThunk(
    'categorie/fetchCategories',
    async () => {
        const response = await axios.get('http://localhost:8081/categorie/all');
        return response.data;
    }
)

const categoriesSlice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.loading = 'Loading ...';
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.loading = 'fulfilled';
            state.data =  action.payload;
        },
        [fetchCategories.rejected]:(state) => {
            state.loading = 'rejected';
        }
    }
})

export default categoriesSlice.reducer;