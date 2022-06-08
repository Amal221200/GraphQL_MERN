import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECT } from '../query/projectQueries'

const EditProjectForm = ({ project }) => {
    const [form, setForm] = useState({ id: project.id, name: project.name, status: "", description: project.description })
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { ...form },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    })

const handleChange = (e) => {
    setForm({ ...form, [e['target']['name']]: e['target']['value'] })
}

const handleSubmit = (e) => {
    e.preventDefault()
    const { name, status, description } = form

    updateProject(name, status, description)
}

// if (loading) return null
// if (error) return <h1>Something Went Wrong</h1>

return (
    <div className='mt-5'>
        <h3>Updata Form</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='name' className="form-label">Name</label>
                <input type="text" className='form-control' id='name' name='name' value={form.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor='description' className="form-label">Description</label>
                <textarea className='form-control' id='description' name='description' value={form.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor='status' className="form-label">Status</label>
                <select className='form-select' name="status" id="status" value={form.status} onChange={handleChange}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit" className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
        </form>
    </div>
)
}

export default EditProjectForm