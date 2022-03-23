// import alert from material-ui
import Alert from '@mui/material/Alert'

export const Error = ({errorMessage}) => {
    return (
        <Alert variant="filled" severity="error">
        {errorMessage.map((error) => (
            <>
            {error}
            <br/>
            </>
          ))}
          </Alert>
    )
}