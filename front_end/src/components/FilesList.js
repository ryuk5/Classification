import React, { useEffect, useState } from 'react'
import { getData, addData, generateAudioData, clearGeneratedData } from '../actions/dataActions'
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from "react-router-dom";

const FilesList = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const { loading, data, dataGeneration } = useSelector((state) => ({ loading: state.data.loading, data: state.data.data, 'dataGeneration': state.data.dataGeneration }))

    const generatePlot = (file) => {
        history.push(`/${file.id}`);
    }

    useEffect(() => {
        dispatch(getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayData = data.map((elt, index) => (
        <div key={elt.id} className="card mb-4">
            <h5 className="card-header">File {index + 1}</h5>
            <div className="card-body">
                <h5 className="card-title">{elt.file_path}</h5>
                <p className="card-text">To classify your file pleas click bellow.</p>
                <button type="button" onClick={() => generatePlot(elt)} className="btn btn-primary">Click</button>
            </div>
        </div>
    ))

    const [file, setFile] = useState({})

    const handleChange = (e) => {
        setFile({ 'file_path': e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addData(file))
    }

    const handleClick = () => {
        dispatch(generateAudioData())
    }

    const clear = () => {
        dispatch(clearGeneratedData())
    }
    return (
        <>
            <div className="container">
                {loading === true ? (<p>Loading...</p>) : (
                    <>
                        <div className="data">
                            <form onSubmit={handleSubmit} className="row g-3 mt-4 mb-4">
                                <div className="col-auto">
                                    <label for="file_path" className="visually-hidden">New File Path</label>
                                    <input onChange={handleChange} type="text" className="form-control" id="file_path" placeholder="File Path" />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary mb-3">Add File</button>
                                </div>
                            </form>

                            <div className="col-auto">
                                <button onClick={handleClick} className="btn btn-success mb-3">Generate Files</button>                                
                            </div>
                            {dataGeneration === true && (
                                <div class="alert alert-success" role="alert">
                                    Files generated successfully <button onClick={clear} className="btn btn-danger">Close this alert</button>
                                </div>
                            )}
                            <div className="wrapper">
                                {displayData}
                            </div>

                        </div>

                    </>
                )}
            </div>
        </>
    )
}

export default FilesList