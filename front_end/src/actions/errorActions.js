import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => { //the 3rd param is optional
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
}; 

// CLEAR ERRORS 
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};