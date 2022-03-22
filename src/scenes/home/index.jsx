import { Redirect } from '../../components/redirect'

export const Home = () => {
// Call the redirect helper which redirects to notes if there is a jwt in localStorage
 Redirect()

    return (
        <p>This is the homepage</p>
    )
}