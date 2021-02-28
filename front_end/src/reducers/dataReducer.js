import { GET_DATA, ADD_DATA, DELETE_DATA, CLASSIFY_DATA, LOADING_DATA, GENERATE_PLOT, PLOT_GENERATED, GENERATE_AUDIO_DATA, CLEAR_DATA_GENERATION } from '../actions/types'

const initialState = {
    data: [],
    loading: false,
    dataGeneration: false,
    plots: false
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

        case GENERATE_PLOT:
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }

        case PLOT_GENERATED:
            return {
                ...state,
                loading: false,
                plots: true
            }

        case GENERATE_AUDIO_DATA:
            return {
                ...state,
                dataGeneration: true
            }   

        case CLEAR_DATA_GENERATION:
            return {
                ...state,
                dataGeneration: false
            }

        default:
            return state
    }
}