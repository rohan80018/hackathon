import NavBar from "./NavBar";
import waves from "../images/waves.png"
import { Flex, Box, Image, Text, Button,Center,IconButton, Tooltip} from "@chakra-ui/react"
import DataContext from "../context/DataContext";
import {Link, useParams} from "react-router-dom"
import {useEffect, useContext, useState} from "react"
import { CalendarIcon, DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons'


export default function SubDetail(){
  let{admin, subData, setSubData, getSubDetail} = useContext(DataContext)

  const params = useParams()
  const userId= params.userId
  const subId = params.subId
  
  async function handleFav(){
    let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/submissions/${userId}/?id=${subId}`,{
      method : "PATCH",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        "isFav":subData.isFav?false:true
      })
    })
    let data = await response.json()
    console.log(data)
    if (response.status === 200){
      setSubData(data)
    } 
  }
  useEffect(()=>{
    getSubDetail(userId, subId)
  },[])

  let date = new Date(subData.createDate)
  let createDate = date.toDateString().slice(3)

  let start_date = new Date(subData.startDate)
  let startDate = start_date.toDateString().slice(3)

  let end_date = new Date(subData.endDate)
  let endDate = end_date.toDateString().slice(3)


  if(!Object.keys(subData).length){
    return (<h1>loading</h1>)
  }
  return (
    <>
      <NavBar />
      <Flex minH="300px" bg="#003145" backgroundImage={waves} >

        <Flex  w="100svw" justify="space-around">
          <Flex  w={[800]} pl="60px" pr="20px" pb="8px" direction="column" justify='space-evenly'>
            <Flex minW="300px" gap="3rem">
              <Image src={`http://127.0.0.1:8000${subData.image}`} boxSize="100px" borderRadius='12px'/>
              <Center><Text fontSize="34px"  color="white" fontWeight={700} fontFamily="Bahnschrift">{subData.title}</Text></Center>
            </Flex>
            <Flex direction="column" gap="6px">
              <Text fontSize="18px" color="white" fontWeight="600">{subData.summary}</Text>
              <Flex h="30px" align="center" justify="space-between" borderRadius="24px" gap="3px" pl={admin?"8px":"0px"} maxW="200px">
                {admin&&<IconButton onClick={handleFav} bg="transparent" _hover={{bg:"transparent"}} icon={<StarIcon _hover={{transform:"scale(1.1)"}} color={subData.isFav?"white":"gray.400"} boxSize="6" />} />}
                
                {admin&&<Text pb="5px" fontSize="28px" color="gray.600">|</Text>}
              
                <Flex bg="whiteAlpha.300" justify="space-evenly" h="30px" borderRadius='24px' align="center" w="130px">
                  <CalendarIcon color="white"/>
                  <Text color="white"> {createDate}</Text>
                </Flex>
              </Flex>
              
            </Flex>
          </Flex>
          <Flex w={[300]} direction="column" align="center" justify="center" gap="1rem">
            <Link to={"#"} >
              <Tooltip hasArrow bg="blue.400" isDisabled={true} placement='top' label="Can't edit, event already started">
                <Button leftIcon={<EditIcon/>} w="100px" borderWidth="2px" fontWeight="700" variant='outline' colorScheme="blue" >
                  Edit
                </Button>
              </Tooltip>
            </Link>
            <Tooltip hasArrow bg="red.300" placement='bottom' label="Warning ! Event including submissions will be deleted">
              <Button leftIcon={<DeleteIcon/>} w="100px" borderWidth="2px" fontWeight="700" colorScheme="red" variant='outline'>Delete</Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100svw" pt="20px">
        <Box  w="70%"  pl="120px">
          <Text  decoration="underline" fontSize="24px" fontWeight="600">Description</Text>
          <br></br>
          <Text fontSize="17px" fontWeight="500" className="pre-line">
            {subData.description}
          </Text>
        </Box>
        <Flex border={'2px solid black'} w="30%" pt="2px" pl="20px" direction="column" pr="80px">
          <Text fontSize="18px" fontWeight="500" color="gray">Hackathon</Text>
          <Text fontSize="22px" fontWeight="500">{subData.name}</Text>
          <Flex w="195px" justify="space-between" align="center">
            <CalendarIcon color="gray.500" boxSize="4" /> 
            <Text fontSize="13px" color="gray.500" fontWeight="500">{startDate} - {endDate}</Text>
          </Flex>
          <Flex direction="column" bg="red">

          </Flex>
        </Flex>
      </Flex>
    </>
  )
}