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

        // Create Task

        createTaskRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        createTaskSuccess(state, action) {
            state.task = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
        },
        createTaskFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        
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
            // state.message = action.payload.message;
        },

        getTaskFailed(state, action){
            state.tasks = {};
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        // Update Task 
        updateTaskRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        // Update Task

        updateTaskSuccess(state, action){
            console.log(action.payload.message)
            state.tasks = action.payload.task;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
        },

        updateTaskFailed(state, action) {
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

export const createTask = (taskData) => async (dispatch) => {
    dispatch(taskSlice.actions.createTaskRequest());
    try {
      const response = await axios.post(`${baseUrl}/api/task/create`, taskData, {
        withCredentials: true,
      });
      dispatch(taskSlice.actions.createTaskSuccess(response.data));
    } catch (error) {
      dispatch(taskSlice.actions.createTaskFailed(error.response?.data?.message || "Failed to create task"));
    }
};

export const updateTask = (taskId, taskData) => async (dispatch) => {
    dispatch(taskSlice.actions.updateTaskRequest());
    try {
        const response = await axios.patch(`${baseUrl}/api/task/tasks/${taskId}`, taskData, {
            withCredentials: true,
        });
        dispatch(taskSlice.actions.updateTaskSuccess(response.data));
    } catch (error) {
        dispatch(taskSlice.actions.updateTaskFailed(error.response?.data?.message));
    }
};

export const getTask = (filter) => async(dispatch)=>{
    dispatch(taskSlice.actions.getTaskRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/task/tasks`, {
            params: {filter},
            withCredentials: true
        });

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