import { GET_DATA, ADD_DATA, DELETE_DATA, CLASSIFY_DATA, LOADING_DATA, GENERATE_PLOT, PLOT_GENERATED, GENERATE_AUDIO_DATA, CLEAR_DATA_GENERATION } from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const setDataLoading = () => ({
    type: LOADING_DATA
})

export const getData = () => (dispatch) => {
    dispatch(setDataLoading())

    axios.get("/api/data/")
        .then(res => dispatch({
            type: GET_DATA,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addData = (data) => (dispatch) => {
    axios.post("/api/data/create", data)
        .then(res => dispatch({
            type: ADD_DATA,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteData = (file) => (dispatch) => {
    axios.post(`/api/data/delete/${file.id}`, file)
    .then(res =>  dispatch({
        type: DELETE_DATA,
        payload: file
    })) 
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const classify = (classification) => (dispatch) => {
    axios.post('/api/data/classify', classification)
    .then(res => {
        console.log("Working")
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const generatePlot = (file) => (dispatch) => {
    dispatch({
        'type': GENERATE_PLOT
    })
    
    axios.post('/api/generate_plot', file)
    .then(res => {
        dispatch({
            type: PLOT_GENERATED
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const generateAudioData = () => dispatch => {
    axios.get('/api/hidden/mass_create')
    .then(res => {
        dispatch({
            type: GENERATE_AUDIO_DATA
        })

    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const clearGeneratedData = () => ({
    type: CLEAR_DATA_GENERATION
})