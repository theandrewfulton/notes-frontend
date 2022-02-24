import axios from "axios"

// sets url to the backend depending in whether a production or development environment is detected.

export const setBackendUrl = () => {
    // if (process.env.NODE_ENV === "production") {
    //     return "https://productionurl.com"
    // }

    if (process.env.NODE_ENV === "development") {
        return process.env.REACT_APP_API_URL || "http://localhost:4000"
    }
}

// declare backendUrl

const backendUrl = setBackendUrl()

// create const using axios for backend to be accessible throughout application
export const backend = axios.create({
    baseURL: backendUrl
})