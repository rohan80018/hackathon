import { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import DataContext from '../context/DataContext'


const PrivateRoute =({children}) => {
    // console.log("hello")
//   const authenticated = true;
    let {authToken} = useContext(DataContext)

    if (!authToken) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute