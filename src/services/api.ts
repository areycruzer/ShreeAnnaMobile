import axios from 'axios';
import { Platform } from 'react-native';

// Use your machine's IP address for physical device testing
// const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Add response interceptor to handle network errors gracefully
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.message === 'Network Error') {
            console.warn('⚠️ API Network Error: Mock server might not be running');
            // Return a rejected promise with a user-friendly message
            return Promise.reject(new Error('Unable to connect to server. Please check your connection.'));
        }
        return Promise.reject(error);
    }
);

export default api;
