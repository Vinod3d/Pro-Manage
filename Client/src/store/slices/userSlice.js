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

        // Logout

        logoutSuccess: (state, action)=>{
            state.user = action.payload.success && null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = action.payload.message;
        },

        logoutFailed: (state, action)=>{
            console.log(action.payload)
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.message = null;
        },


        checkSession: (state, action)=>{
            state.isAuthenticated = action.payload.loggedIn && true;
            state.user = action.payload.user ? action.payload.user : null;
        },

        checkSessionFailed: (state, action)=>{
            state.isAuthenticated = false;
            state.error = action.payload;
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

        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());

    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const logout = () => async (dispatch) =>{
    try {
        const response = await axios.get(`${baseUrl}/api/user/logout`, {
            withCredentials: true,
        });


        dispatch(userSlice.actions.logoutSuccess(response.data));
        dispatch(userSlice.actions.clearErrors());
        
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message))
    }

}

export const checkAuthSession = () => async(dispatch) =>{
    try {
        const response = await axios.get(`${baseUrl}/api/check-session`, {
            withCredentials: true,
        });

        console.log(response)

        dispatch(userSlice.actions.checkSession(response.data))
    } catch (error) {
        dispatch(userSlice.actions.checkSessionFailed(error.response.data.message))
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
    dispatch(userSlice.actions.clearMessage());
};


export default userSlice.reducer;