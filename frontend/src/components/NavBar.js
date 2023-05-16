import {Flex, Image, Center, Text, Popover, PopoverBody, PopoverTrigger,Button, PopoverContent } from "@chakra-ui/react"
import logo from "../images/hack-logo.jpg"
import { Link } from "react-router-dom"
import DataContext from "../context/DataContext"
import {useContext} from "react"
import { TriangleDownIcon} from '@chakra-ui/icons'

export default function NavBar() {
  let {logoutUser, user} = useContext(DataContext)

  return(
    <Flex justify={"space-between"} bg="white" pl="5%" pr="5%" h="55px">
      <Link to="/">
        <Image h="55px" src={logo}/>
      </Link>
      <Center>
        <Popover >
          <PopoverTrigger>
            <Button pb="2px"  borderRadius="24px" h="35px" rightIcon={<TriangleDownIcon />}>{user.username}</Button>
          </PopoverTrigger>
          <PopoverContent w="150px">
            <PopoverBody>
              <Flex direction='column' justify={"space-around"}>
                {/* <Button bg={newest?"#accbe3":""} onClick={()=>setNewest(true)}>Newest</Button>
                <Button bg={newest?"":"#accbe3"} onClick={()=>setNewest(false)}>Oldest</Button> */}
                <Button onClick={logoutUser} bg="">
                  Logout
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* <Link>  
          <Text as="b" color="#595959" _hover={{ color: '#343634' }}  onClick={logoutUser} >Logout </Text>
        </Link> */}
      </Center>
    </Flex>
  )
}