import { Flex,Link , Text, Box, FormControl, FormLabel, FormErrorMessage, Input, Button} from "@chakra-ui/react"
import { useContext,useState } from "react"
import DataContext from "../context/DataContext"

export default function Register({toggle}) {
  const {loginUser} =useContext(DataContext)
  let [userErr,setUserErr] = useState({})
  let [emailErr, setEmailErr] = useState({})
  let [validErr, setValidErr] = useState({})
  let [passErr,setPassErr] = useState({})

  function userLogin(){
    console.log("123")
  }
  function clearErr(){
    setEmailErr({})
    setUserErr({})
    setPassErr({})
    setValidErr({})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    console.log("iuerjhjk")
    clearErr()
    if(event.target.password.value === event.target.confirm.value){
      console.log("in")
      clearErr()
      let response = await fetch(`http://127.0.0.1:8000/hackathon/auth/users/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          username:event.target.username.value,
          email:event.target.email.value,
          password:event.target.password.value
        })
      })
      let data = await response.json();
      console.log(data)
      if (response.status === 400) {
        if(data.email){
          setEmailErr({"email":data.email})
        }
        if(data.username){
          setUserErr({"user": data.username})
        }
        if(data.password){
          setValidErr({"valid":data.password})
        }
      }else if (response.status === 201){
        clearErr()
        loginUser(event.target.username.value, event.target.password.value)
      }
    }else{
      setPassErr({"password":"Password don't match"})
    }
  }

  return (
    <Flex direction="column" justify="center">
    <Box h={[61]} >
      <Text fontSize="24px" color="grey" as="b">Welcome </Text>
      <Text fontSize="16px">Please enter your details.</Text>
    </Box>
    <Box h={[300]} w={[500]} pt="4px">
    <form onSubmit={handleSubmit}>
      <Flex direction="column">
        {/* <FormControl isInvalid={Object.keys(err).length}> */}
          <Flex direction="column">
            
            <FormLabel fontSize="14px">Username</FormLabel>
            <FormControl isInvalid={Object.keys(userErr).length}>
              {userErr.user && (
                <FormErrorMessage>
                  {userErr.user}
                </FormErrorMessage>
              )}
              <Input
                bg="#f0f0f0"
                type="text"
                name="username"
                id="username"
                color="black"
                //   w={[100, 300, 400]}
                
              />
            </FormControl>
            
            <FormLabel fontSize="14px">Email</FormLabel>
            <FormControl isInvalid={Object.keys(emailErr).length}>
              {emailErr.email && (
                <FormErrorMessage>
                  {emailErr.email}
                </FormErrorMessage>
              )}
              <Input
                bg="#f0f0f0"
                type="email"
                name="email"
                id="email"
                color="black"
                //   w={[100, 300, 400]}
                
              />
            </FormControl>

            <FormLabel fontSize="14px">Password</FormLabel>
            <FormControl isInvalid={Object.keys(validErr).length}>
              {validErr.valid && (
                <FormErrorMessage>
                  {validErr.valid}
                </FormErrorMessage>
              )}
              <Input
                //   bg="#fae0de"
                bg="#f0f0f0"
                type="password"
                name="password"
                id="password"
                color="black"
                //   w={[100, 300, 400]}
                
              />
            </FormControl>
            
            <FormLabel fontSize="14px">Confirmn Password</FormLabel>
            <FormControl isInvalid={Object.keys(passErr).length}>
              {passErr && (
                <FormErrorMessage>
                  {passErr.password}
                </FormErrorMessage>
              )}
              <Input
                //   bg="#fae0de"
                bg="#f0f0f0"
                type="password"
                name="confirm"
                id="confirm"
                color="black"
                //   w={[100, 300, 400]}
              />
            </FormControl>
          </Flex>
        {/* </FormControl> */}
        <br></br>
        <Button
          mb="5px"
          type="submit"
          bg="#d8e3e8"
        //   w={[100, 300, 400]}
      
        >
          Login
        </Button>
      </Flex>
    </form>
    <Text fontSize="12px">
      Already have an account? 
      <Link onClick={()=>toggle("login")}>
        <span style={{ color: "blue" }}> Log In</span>
      </Link>
    </Text>
  </Box>
  </Flex>
  )
}