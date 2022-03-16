import Alert from '@mui/material/Alert'

export const Error = ({errorMessage}) => {
    return (
        <Alert variant="filled" severity="error">{errorMessage}</Alert>
    )
}