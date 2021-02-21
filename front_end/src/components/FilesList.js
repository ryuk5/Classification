import React, { useEffect, useState } from 'react'
import { getData, addData } from '../actions/dataActions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const FilesList = () => {
    const dispatch = useDispatch()
    const { loading, data } = useSelector((state) => ({ loading: state.data.loading, data: state.data.data }))

    useEffect(() => {
        console.log("Component just up")
        dispatch(getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayData = data.map((elt, index) => (
        <>
            <div key={index} className="card mb-4">
                <h5 className="card-header">File {index +1}</h5>
                <div className="card-body">
                    <h5 className="card-title">{elt.file_path}</h5>
                    <p className="card-text">To classify your file pleas click bellow.</p>
                    <Link to={`/${elt.id}`} className="btn btn-primary">Click</Link>
                </div>
            </div>
        </>
    ))

    const [file, setFile] = useState({})

    const handleChange = (e) => {
        setFile({ 'file_path': e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addData(file))
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