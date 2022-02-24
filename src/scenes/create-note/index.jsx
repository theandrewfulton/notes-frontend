import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { backend } from "../../data"

export const CreateNote = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

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
        try {
            if (id) {
                await backend.put(`/notes/${id}`, {
                    title,
                    body
                })
                // if success:
                navigate(`/notes/${id}`)
            } else {
                await backend.post("/notes", {
                    title,
                    body
                })
                navigate("/")
            }
        } catch (error) {
            // error messages will go here
        }
    }
    return (
        <form onSubmit={createNote}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="title" />
            <textarea onChange={(e) => setBody(e.target.value)} value={body} placeholder="body" />
            <input type="submit" value="Submit" />
        </form>
    )
}