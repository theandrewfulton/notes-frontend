import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../../data'

export const UserDetails = () => {
    const {id} = useParams()
    // const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const navigate = useNavigate()

      useEffect(() => {
        backend.get(`/users/${id}`)
            .then(({ data }) => setUser(data))
            // .catch((error) => {
            //     setError(true)  
            //     setErrorMessage(error.message)
            //     })
            //   .finally ((setLoading(false)))
    }, [id])

     // List delete method
     const deleteUser = async (id, index) => {
        // const navigate = useNavigate()
        // set loading to true 
        // setLoading(true)
        try {
          // send request to backend
          await backend.delete(`/users/${id}`)
            // clear jwt in local storage
            localStorage.clear()
            // redirect to home page
            // useEffect(() => {
                navigate("/")
            // },[])
        } catch (error) {
            // setError(true)  
            // setErrorMessage(error.message)
        }
  
      }

    return (
        <>
        {/* {loading && <p className="loading">Loading...</p>} */}
        {/* {error && <p className="error">{errorMessage}</p>} */}
         <article>
              <p>{user.email}</p>
              {/* <p>{note.body}</p> */}
              {/* edit button */}
              <Link key={id} to={`/users/update/${id}`}><button>Edit</button></Link>
              {/* delete button */}
              <button onClick={() => deleteUser(id)}>DELETE</button>
            </article>
        </>
    )
}