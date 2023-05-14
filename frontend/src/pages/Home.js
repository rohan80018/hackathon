import { Flex, Box, Image, Text, Button} from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useContext } from "react"
import DataContext from "../context/DataContext"
import waves from "../images/waves.png"
import idea from "../images/idea1.png"
import Tablets from "../components/Tabs"

export default function HomePage() {
  let {admin} = useContext(DataContext)
  function print(){
    console.log(admin)
  }
  return(
    <>
      <NavBar />
      <Flex h="300px" bg="#003145" backgroundImage={waves} >
        {admin?
        <Flex  w="100svw" justify="space-around">
          <Flex w={[800]} pl="80px" pr="20px" pb="8px" direction="column" justify='space-evenly'>
            <Text fontSize="50px" color="white" fontWeight={700} fontFamily="Bahnschrift">
              Hackathon Event
            </Text>
            <Text fontSize="18px" color="white" fontWeight="600">
              Lorem ipsum dolor sit amet consectetur. Urna cursus amet pellentesque in parturient purus
              feugiat faucibus. Congue laoreet duis porta turpis eget suspendisse ac pharetra amet. Vel
              nisl tempus nec vitae.
            </Text>
            <Button size="md" w="120px" colorScheme='green'>Create Event</Button>
          </Flex>
          <Box w={[300]}>
            <Image  src={idea}/>
          </Box>
        </Flex>
        :<h1>jkw</h1>}
      </Flex>
      {/* <Flex bg="red" h="390px" direction="column">
        <Flex h="15%" bg="blue">

        </Flex>
        <Grid h="80%">

        </Grid>
      </Flex> */}
      <Flex w="100svw" justify="center" h="390px">
        <Tablets />
      </Flex>
    </>
  )
}

// 729338
//