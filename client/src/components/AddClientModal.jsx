import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { FaUser } from 'react-icons/fa'
import { GET_CLIENTS } from '../query/clientQueries'

const AddClientModal = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "" })
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { ...form },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            })

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })

    const handleChange = (e) => {
        setForm({ ...form, [e['target']['name']]: e['target']['value'] })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, phone } = form
        if (!name || !email || !phone) {
            return alert('Please fill in all the fields')
        }

        addClient(name, email, phone)
        setForm({ name: '', email: '', phone: '' })
    }

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className='icon' />
                    Add Client
                </div>
            </button>

            <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor='name' className="form-label">Name</label>
                                    <input type="text" className='form-control' id='name' name='name' value={form.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='email' className="form-label">Email</label>
                                    <input type="email" className='form-control' id='email' name='email' value={form.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='phone' className="form-label">Phone</label>
                                    <input type="tel" className='form-control' id='phone' name='phone' value={form.phone} onChange={handleChange} />
                                </div>
                                <button type="submit" className='btn btn-secondary' data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientModal