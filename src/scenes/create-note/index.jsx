import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { backend } from "../../data"

export const CreateNote = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(id) {
            backend.get(`/notes/${id}`)
            .then(({ data }) => {
                setTitle(data.title)
                setBody(data.body)
            })
        }
    },[id],)

    const createNote = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading to true
        setLoading(true)
        // remove error message
        setErrorMessage("")
        try {
            if (id) {
                await backend.put(`/notes/${id}`, {
                    title,
                    body
                })
                // if success:
                setLoading(false)
                navigate(`/notes/${id}`)
            } else {
                await backend.post("/notes", {
                    title,
                    body
                })
                setLoading(false)
                navigate("/")
            }
        } catch (error) {
            // If fail:
            // display error message
            setError(true)  
            setErrorMessage(error.message)
            // stop loading
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{errorMessage}</p>}
            <form onSubmit={createNote}>
                <input className="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="title" />
                <textarea onChange={(e) => setBody(e.target.value)} value={body} placeholder="body" />
                <input type="submit" value="Submit" />
                <button value="Discard"/>
            </form>
        </>
    )
}