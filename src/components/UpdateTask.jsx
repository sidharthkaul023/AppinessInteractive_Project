import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const UpdateTask = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        id: id,
        text: '',
        day: ''
    })
    useEffect(() => {
        axios.get(`http://localhost:5000/tasks/${id}`)
            .then(res => {
                setValues({ ...values, text: res.data.text, day: res.data.day })
            })
            .catch(err => console.log(err))
    }, []);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/tasks/${id}`, values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <form className="add-form" onSubmit={handleSubmit} >
            <div className="form-control">
                <label>Task:</label>
                <input type="text" placeholder="Add Task" value={values.text}
                    onChange={e => setValues({ ...values, text: e.target.value })} />
            </div>
            <div className="form-control">
                <label>Day & Time:</label>
                <input type="text" placeholder="Add Day & Time" value={values.day}
                    onChange={e => setValues({ ...values, day: e.target.value })} />
            </div>

            <input className="btn btn-block" type="submit" value="Save Changes" />
        </form>
    )
}

export default UpdateTask


// <div className="form-control form-control-check">
// <label>Reminder:</label>
// <input type="checkbox" checked={reminder}
//     value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
// </div>