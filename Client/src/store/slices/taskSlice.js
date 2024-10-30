import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils";
import axios from "axios";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: {},
        loading: false,
        error: null,
        message:null,
    },

    reducers :{
        
        // Get Tasks
        getTaskRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        getTaskSuccess(state, action){
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },

        getTaskFailed(state, action){
            state.tasks = {};
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        clearErrors(state){
            state.error = null;
        },

        clearMessage(state) {
            state.message = null;
        },

    }
})

export const getTask = (filter) => async(dispatch)=>{
    dispatch(taskSlice.actions.getTaskRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/task/tasks`, {
            params: {filter},
            withCredentials: true
        });

        console.log(response)
        dispatch(taskSlice.actions.getTaskSuccess(response.data));
    } catch (error) {
        dispatch(taskSlice.actions.getTaskFailed(error.response?.data?.message || "Failed to fetch tasks"))
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch(taskSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
    dispatch(taskSlice.actions.clearMessage());
};

export default taskSlice.reducer;