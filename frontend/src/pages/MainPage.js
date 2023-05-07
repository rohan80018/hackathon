import {Button,Flex, Slide, Box, useDisclosure} from "@chakra-ui/react"
import LoginPage from "./Login"
import Register from "./Register"
import {useState} from "react"

function MainPage() {
  const { isOpen, onToggle } = useDisclosure()
  const [page, setPage] = useState("login")

  function pageToogle() {
    if (page === "login"){
      setPage("register")
    }
    else{
      setPage("login")
    }
  }

  return(
    <>
      <Button onClick={onToggle}>
klwmefk
      </Button>
      <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Flex
          // p={[150]}
          pt={[100]}
          pb={[150]}
          // pb={[2]}
          color='white'
          // mt={[200]}
          mr={[300]}
          ml={[300]}
          // mb={[150]}
          bg='teal.500'
          rounded='md'
          shadow='md'
          justify="center"
        >
          {page==="login"?<LoginPage toggle={pageToogle}/>:
          <Register toggle={pageToogle}/>}
        </Flex>
      </Slide>
    </>
  )
}
export default MainPage