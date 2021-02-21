import React, { useState } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player';
import { deleteData, classify } from '../actions/dataActions'
import { useHistory } from "react-router-dom";


const FileOperations = (props) => {
    const dispatch = useDispatch()
    const { data } = useSelector((state) => ({ 'data': state.data.data }))

    const [select, setSelect] = useState({})
    let history = useHistory();
    const handleDelete = (e) => {
        dispatch(deleteData(filtred_data[0]))
        history.push("/");
    }

    const handleClassification = (e) => {
        setSelect({ 'folder': e.target.value })
    }


    const filtred_data = data.filter(elt => (elt.id == props.match.params.id))
    const handleSubmit = (e) => {
        e.preventDefault()
        const classification = {
            'folder': select.folder,
            'file': filtred_data[0].file_path,
            'id': filtred_data[0].id
        }
        console.log(classification)
        dispatch(classify(classification))
        history.push("/");
    } 

    return (
        <div className="container">
            <form className="mt-4">
                <select onChange={handleClassification} id="classification" className="form-select" aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                </select>

                <div className="row g-3 align-items-center audio-wrapper">
                    <div className="col-auto">
                        <ReactAudioPlayer
                            src={require(`../files/${filtred_data[0].file_path}`).default}
                            autoPlay
                            controls
                        />
                    </div>
                    <div className="col-auto">
                        <button onClick={handleDelete} type="button" className="btn btn-danger btn-lg">Delete File</button>
                    </div>
                    <div className="col-auto">
                        <button onClick={handleSubmit} type="button" className="btn btn-success btn-lg">Classify File</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default FileOperations;