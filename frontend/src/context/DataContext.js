import {createContext, useState} from "react"
import jwt_decode from 'jwt-decode'
import {useNavigate} from "react-router-dom";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({children}) => {
  let navigate = useNavigate();

  let [user, setUser] = useState(null)
  let [authToken, setAuthToken] = useState(()=>
    localStorage.getItem('token') ? 
    JSON.parse(localStorage.getItem('token')) : null
  )
  let [loginErr,setLoginErr] = useState(false)

  async function loginUser(username, password) {
    let response = await fetch('http://127.0.0.1:8000/hackathon/token/', {
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body :JSON.stringify({
        "username":username,
        "password":password
      })
    })
    if (response.status === 200){
      let data = await response.json()
      setLoginErr(false)
      setUser(jwt_decode(data.access))
      setAuthToken(data)
      localStorage.setItem("token", JSON.stringify(data))
      navigate("/");
    }else if (response.status === 401 || response.status === 400){
      setLoginErr(true)
    }
  }

  function logoutUser() {
    localStorage.removeItem("token");
    navigate("/login");
    setAuthToken(null);
    setUser(null);
  }

  const contextData = {
    loginUser: loginUser,
    loginErr: loginErr,
    user: user,
    logoutUser: logoutUser,
    authToken: authToken
  }
  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  )
}