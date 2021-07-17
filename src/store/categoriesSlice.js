import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

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
        [fetchCategories.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
})

export default categoriesSlice.reducer;