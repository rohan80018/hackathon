import {Button, Text, Flex, Center, Slide, Box, useDisclosure} from "@chakra-ui/react"
import LoginPage from "./Login"
import Register from "./Register"
import {useState, useContext} from "react"
import main from "../images/main1.jpg"
import DataContext from "../context/DataContext"

function MainPage() {
  let {setLoginErr} = useContext(DataContext)
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
  function nothing(){
    setLoginErr(false)
    setPage("login")
  }

  return(
    <>
      <Box onClick={isOpen?onToggle:nothing} h="100svh" _hover={isOpen?{cursor:"pointer"}:{}} backgroundImage={main} backgroundSize="1200px 750px" filter='auto' blur={isOpen?"1px":"0px"} brightness={isOpen?'80%':"100%"}>
        <Flex direction="column" justify="center" align="center"  background="white" w={[1000]} h={[600]} className="custom-div">
          <Flex direction="column" mb="50px">
            <Text fontSize="80px" fontFamily="cursive" fontWeight='700' color="#d98d1c">Hackathon</Text>
            <Box w={[500]}>
              <Text fontSize="20px" fontWeight="500" lineHeight="20px">Lorem ipsum dolor sit amet. Ut libero mollitia non quis deleniti sed modi autem aut deserunt culpa aut quidem omnis. Ut quod praesentium et perferendis voluptas est nulla rerum aut esse ipsum hic maxime sapiente.</Text>
            </Box>
          </Flex>
          <Button onClick={onToggle}  colorScheme="orange" variant='outline'>
            Get Started
          </Button>
        </Flex>
      </Box>
      <Slide direction='bottom'  in={isOpen}  style={{  zIndez:10, maxWidth:"60%",position:"fixed",left:"20%"}}>
        <Flex
          h={[500]}
          w={[900]}
          // p={[150]} no
          // pt={[100]}
          // pb={[79]}
          // pb={[2]} no
          // color='white'
          // mt={[200]} no
          // mr={[300]}
          // ml={[300]}
          // mb={[150]} no
          bg='#ffa621'
          rounded='md'
          shadow='md'
          align="center"
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