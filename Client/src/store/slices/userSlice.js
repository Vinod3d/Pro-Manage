import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../../utils";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user:{},
        error: null,
        message:null,
        isAuthenticated: false,
    },

    reducers : {
        // register

        registerRequest(state){
            state.loading = true;
            state.user = {};
            state.error =  null;
            state.message = null;
            state.isAuthenticated =  false;
        },

        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.newUser;
            state.isAuthenticated = false;
            state.error = null;
            state.message = action.payload.message;
        },

        registerFailed(state, action) {
            state.loading = false;
            state.user = {},
            state.error = action.payload;
            state.isAuthenticated = false;
        },


        // Login

        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            state.message = action.payload.message
        },

        loginFailed: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.message = null;
        },



        clearErrors: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        }
    }
})


export const registerUser = (userData) => async (dispatch) =>{
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(
            `${baseUrl}/api/user/register`, 
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());
    } catch (error) {
        dispatch(userSlice.actions.registerFailed(error.response.data.message))
    }
}


export const loginUser = (email, password) => async (dispatch) =>{
    dispatch(userSlice.actions.loginRequest());
    try {
        const  response = await axios.post(
            `${baseUrl}/api/user/login`,
            {email, password},
            {
                withCredentials: true,
                headers : {
                    "Content-Type" : "application/json",
                }
            }
        );

        console.log(response)

        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());

    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
    dispatch(userSlice.actions.clearMessage());
};


export default userSlice.reducer;