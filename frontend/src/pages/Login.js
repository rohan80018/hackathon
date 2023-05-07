import { Flex,Link , Text, Box, FormControl, FormLabel, FormErrorMessage, Input, Button} from "@chakra-ui/react"
import { useContext } from "react"
import DataContext from "../context/DataContext"

export default function LoginPage({toggle}) {
  let {loginUser, loginErr} = useContext(DataContext)


  function userLogin(event) {
    event.preventDefault()
    loginUser(event.target.username.value,event.target.password.value)
  } 

  return(
    <Flex direction="column">
      <Box h={[61]} >
        <Text fontSize="24px" color="grey" as="b">Welcome back!</Text>
        <Text fontSize="16px">Please enter login credentials</Text>
      </Box>
      <Box h={[300]} w={[500]} pt="4px">
      <form onSubmit={userLogin}>
        <Flex direction="column">
          <FormControl isInvalid={loginErr}>
            <Flex direction="column">
              {loginErr && (
                <FormErrorMessage>
                  Username/ Password invalid
                </FormErrorMessage>
              )}
              <FormLabel fontSize="14px">Username</FormLabel>
              <Input
                bg="#f0f0f0"
                type="text"
                name="username"
                id="username"
                color="black"
                //   w={[100, 300, 400]}
                
              />
              <FormLabel fontSize="14px">Password</FormLabel>
              <Input
                //   bg="#fae0de"
                bg="#f0f0f0"
                type="password"
                name="password"
                id="password"
                //   w={[100, 300, 400]}
                
              />
            </Flex>
          </FormControl>
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
        Don't have an account? 
        <Link onClick={()=>toggle("register")}>
          <span style={{ color: "blue" }}> Sign Up</span>
        </Link>
      </Text>
    </Box>
    </Flex>
  )
}