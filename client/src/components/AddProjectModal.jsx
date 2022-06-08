import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { FaList } from 'react-icons/fa'
import { GET_PROJECTS } from '../query/projectQueries'
import { GET_CLIENTS } from '../query/clientQueries'

const AddProjectModal = () => {
    const [form, setForm] = useState({ name: "", status: "new", description: "", clientId: "" })
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { ...form },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({
                query: GET_PROJECTS
            })

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    const { loading, error, data } = useQuery(GET_CLIENTS)

    const handleChange = (e) => {
        setForm({ ...form, [e['target']['name']]: e['target']['value'] })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, status, description, clientId } = form
        if (!name || !status || !description || !clientId) {
            return alert('Please fill in all the fields')
        }

        addProject(name, status, description)
        setForm({ name: '', status: 'new', description: '', clientId: '' })
    }

    if (loading) return null
    if (error) return <h1>Something Went Wrong</h1>

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                        <div className="d-flex align-items-center">
                            <FaList className='icon' />
                            New Project
                        </div>
                    </button>

                    <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
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
                                        <div className="mb-3">
                                            <label htmlFor='clientId' className="form-label">Client</label>
                                            <select className='form-select' name="clientId" id="clientId" value={form.clientId} onChange={handleChange}>
                                                <option defaultChecked>Select Client</option>
                                                {data.clients.map(client => (
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default AddProjectModal