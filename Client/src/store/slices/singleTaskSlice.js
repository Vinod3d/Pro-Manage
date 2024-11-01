import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const singleTaskSlice = createSlice({
    name: 'singleTask',
    initialState: {
      task: null,
      loading: false,
      error: null,
    },
    reducers: {
        fetchTaskRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTaskSuccess(state, action) {
            state.task = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchTaskFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        
        clearErrors(state){
            state.error = null;
        },

        clearMessage(state) {
            state.message = null;
        },
    },
});


export const fetchTaskById = (taskId) => async (dispatch) => {
    dispatch(singleTaskSlice.actions.fetchTaskRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/task/${taskId}`, {
            withCredentials: true,
        });
        dispatch(singleTaskSlice.actions.fetchTaskSuccess(response.data));
    } catch (error) {
        dispatch(singleTaskSlice.actions.fetchTaskFailed(error.response?.data?.message || "Failed to fetch task"));
    }
};

export const clearErrors = () => (dispatch) => {
    dispatch(singleTaskSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
    dispatch(singleTaskSlice.actions.clearMessage());
};

export default singleTaskSlice.reducer;