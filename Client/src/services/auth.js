import axios from 'axios'
import { baseUrl } from '../utils';

export const checklogin = async () => {
    const res = await axios.get(`${baseUrl}/api/check-session`, {
        withCredentials: true,
    });
    return res.data;
};