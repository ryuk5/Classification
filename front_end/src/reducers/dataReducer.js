import { GET_DATA, ADD_DATA, DELETE_DATA, CLASSIFY_DATA, LOADING_DATA } from '../actions/types'

const initialState = {
    data: [],
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false
            }

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
    
        default:
            return state
    }
}