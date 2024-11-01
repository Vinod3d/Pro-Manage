import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        analytics: {
            backlog: 0,
            todo: 0,
            inProgress: 0,
            done: 0,
            lowPriority: 0,
            moderatePriority: 0,
            highPriority: 0,
            dueDateTasks: 0,
        },
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        fetchAnalyticsRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchAnalyticsSuccess(state, action) {
            state.analytics = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        fetchAnalyticsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAnalyticsErrors(state) {
            state.error = null;
        },
        clearAnalyticsMessage(state) {
            state.message = null;
        },
    },
});

export const fetchAnalyticsData = () => async (dispatch) => {
    dispatch(analyticsSlice.actions.fetchAnalyticsRequest());
    try {
        const response = await axios.get(`${baseUrl}/api/task/tasks/analytics`, {
            withCredentials: true,
        });
        dispatch(analyticsSlice.actions.fetchAnalyticsSuccess(response.data));
        console.log(response)
    } catch (error) {
        dispatch(analyticsSlice.actions.fetchAnalyticsFailed(error.response?.data?.message || "Failed to fetch analytics"));
    }
};

export const { clearAnalyticsErrors, clearAnalyticsMessage } = analyticsSlice.actions;
export default analyticsSlice.reducer;
