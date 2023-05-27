import {createContext, useState} from "react"
import jwt_decode from 'jwt-decode'
import {useNavigate} from "react-router-dom";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({children}) => {
  let navigate = useNavigate();

  let [admin,setAdmin] = useState(()=>
  localStorage.getItem('admin') ? 
  JSON.parse(localStorage.getItem('admin')) : false
)


  let [user, setUser] = useState(()=>
    localStorage.getItem('user') ? 
    JSON.parse(localStorage.getItem('user')) : null
    )
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
      localStorage.setItem('user', JSON.stringify(jwt_decode(data.access)))
      setAuthToken(data)
      localStorage.setItem("token", JSON.stringify(data))
      setAdmin(jwt_decode(data.access).admin)
      localStorage.setItem('admin', JSON.stringify(jwt_decode(data.access).admin))
      navigate("/events");
    }else if (response.status === 401 || response.status === 400){
      setLoginErr(true)
    }
  }

  function logoutUser() {
    localStorage.removeItem("token")
    localStorage.removeItem("admin");
    localStorage.removeItem("user")
    navigate("/login");
    setAuthToken(null);
    setUser(null);
    setAdmin(false)
  }

  // Home.js
  const [userHackathonEvent, setUserHackathonEvent] = useState({})

  async function getUserHackathon() {
    let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/${jwt_decode(authToken.access).user_id}/`)

    let data = await response.json()
    console.log(data)
    if (response.status === 201){
      Object.keys(data).length?
      setUserHackathonEvent(data):
      setUserHackathonEvent({message:"No events yet"})
    }
  }

  // HackathonDetail.js
  const [eventData, setEventData] = useState({})
  async function getEventData(eventId){
    let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/${jwt_decode(authToken.access).user_id}/?id=${eventId}`)
    let data =await response.json()
    console.log(data)
    if (response.status === 201){
      setEventData(data)
    }
  }

  // SubDetail.js
  const [subData, setSubData] = useState({})
  async function getSubDetail(userId,subId){
    console.log(userId, subId)
    let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/submissions/${userId}/?id=${subId}`)
    let data = await response.json()
    console.log(response)
    if (response.status === 200){
      setSubData(data)
    }
  }

  const contextData = {
    admin: admin ,setAdmin: setAdmin,
    loginUser: loginUser,
    loginErr: loginErr,
    user: user,
    logoutUser: logoutUser,
    authToken: authToken,
    setLoginErr: setLoginErr,

    getUserHackathon: getUserHackathon,userHackathonEvent: userHackathonEvent, setUserHackathonEvent:setUserHackathonEvent,

    getEventData: getEventData, eventData:eventData, setEventData: setEventData,

    getSubDetail: getSubDetail, subData: subData, setSubData: setSubData,
  }
  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  )
}