import {Flex, Image, Center, Text } from "@chakra-ui/react"
import logo from "../images/hack-logo.jpg"
import { Link } from "react-router-dom"
import DataContext from "../context/DataContext"
import {useContext} from "react"

export default function NavBar() {
  let {logoutUser} = useContext(DataContext)

  return(
    <Flex justify={"space-between"} bg="white" pl="5%" pr="5%" h="64px">
      <Link to="/">
        <Image h="64px" src={logo}/>
      </Link>
      <Center>
        <Link>  
          <Text as="b" color="#595959" _hover={{ color: '#343634' }}  onClick={logoutUser} >Logout </Text>
        </Link>
      </Center>
    </Flex>
  )
}