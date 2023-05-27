import NavBar from "./NavBar";
import waves from "../images/waves.png"
import { Flex, Box, Image, Text, Button,Center, Tooltip,useToast} from "@chakra-ui/react"
import DataContext from "../context/DataContext";
import {Link, useParams, useNavigate} from "react-router-dom"
import {useEffect, useContext, useState,useRef} from "react"
import { CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import Tablets from "./Tabs";
import DialogModal from "./DialogModal";
import jwt_decode from 'jwt-decode'



export default function HackathonDetail(){
  let {admin, getEventData,setUserHackathonEvent, eventData, subData, authToken} = useContext(DataContext)
  const params = useParams()
  const eventId = params.eventId 
  let navigate= useNavigate()

  useEffect(()=>{
    getEventData(eventId)
  },[subData])

  let toast = useToast()
  const toastIdRef = useRef()

  async function onDelete(){
    let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/${jwt_decode(authToken.access).user_id}/?id=${eventId}`,{
      method:"DELETE",
      
    })
    let data = await response.json()
    if (response.status === 201){
      setUserHackathonEvent(data)
      toastIdRef.current = toast({
        title: "Event Deleted",
        position:"top",
        // description: "We've created your account for you.",
        status: 'success',
        duration: 7000,
        isClosable: true,
      })
      setTimeout(()=>{
        navigate("/events")
      },1000)
    }

  }

  if(!Object.keys(eventData)){
    return( <h1>Loading</h1>)
  }

  const now = new Date().getTime()
  console.log(now)
  console.log(eventData.startDate)

  let date = new Date(eventData.startDate)
  let startDate = date.toDateString().slice(3)

  let day =  new Date(eventData.endDate)
  let endDate = day.toDateString().slice(3)
  return(
    <>
      <NavBar/>
      <Flex minH="300px" bg="#003145" backgroundImage={waves} >

        <Flex  w="100svw" justify="space-around">
          <Flex  w={[800]} pl="80px" pr="20px" pb="8px" direction="column" justify='space-evenly'>
            <Flex minW="300px" gap="3rem">
              <Image src={`http://127.0.0.1:8000${eventData.image}`} boxSize="100px" borderRadius='12px'/>
              <Center><Text fontSize="34px"  color="white" fontWeight={700} fontFamily="Bahnschrift">{eventData.title}</Text></Center>
            </Flex>
            <Flex direction="column" gap="6px">
              <Text fontSize="18px" color="white" fontWeight="600">{eventData.summary}</Text>
              <Flex h="30px" align="center" justify="center" borderRadius="24px" gap="3px" bg="whiteAlpha.300" w="250px">
                <CalendarIcon color="white"/>
                <Text color="white">{startDate} - {endDate}</Text>
              </Flex>
              
            </Flex>
          </Flex>
          <Flex w={[300]} direction="column" align="center" justify="center" gap="1rem">
            <Link to={eventData.startDate>=now?`edit`:"#"} >
              <Tooltip hasArrow bg="blue.400" isDisabled={eventData.startDate>=now?true:false} placement='top' label="Can't edit, event already started">
                <Button leftIcon={<EditIcon/>} w="100px" borderWidth="2px" fontWeight="700" variant='outline' colorScheme="blue" >
                  Edit
                </Button>
              </Tooltip>
            </Link>
            <Tooltip hasArrow bg="red.300" placement='bottom' label="Warning ! Event including submissions will be deleted">
              <DialogModal type="event" onDelete={onDelete}/>
            </Tooltip>
          </Flex>
        </Flex>
        
        
      </Flex>
      <Box w="80svw" pt="20px" pl="120px">
        <Text decoration="underline" fontSize="24px" fontWeight="600">
          Description
        </Text>
        <br></br>
        <Text fontSize="17px" fontWeight="500" className="pre-line">
          {eventData.description}
        </Text>
      </Box>
      <Flex w="100svw" justify="center" mt="60px"> 
      <Tablets type={"admin"}/>
      </Flex>
    </>
  )
}