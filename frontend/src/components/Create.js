import { useState, useContext } from "react"
import DataContext from "../context/DataContext"
import NavBar from "./NavBar"
import {Flex, Text,Input, Textarea, Image, Box, FormErrorMessage, FormControl, FormLabel,} from "@chakra-ui/react"

export default function CreatePage(props){
  let {admin} = useContext(DataContext)
  let [desErr,setDesErr] = useState(false)
  let [formValue,setFormValue] = useState({
    "title":"",
    "summary":"",
    "description":""
  })
  function handleKeyDown(event){
    const {name,value} = event.target
    if(event.key==="Backspace"&&formValue.description.length===3000){
      console.log("now")
      setDesErr(false)
      setFormValue((prev) => {
        return {...prev, [name]:value.slice(0,-1)}
      })
    }
  }

  function handleChange(event){
    const {name,value} = event.target
    if(formValue.description.length<3000){
      setDesErr(false)
      setFormValue((prev) => {
        return {...prev, [name]:value}
      })
    }else if (formValue.description.length===3000){
      setDesErr("3000")
    }
  }
  return(
    <>
      <NavBar/>
      <Box bg="#d9e9fa" minH="93svh" p="50px" pr="100px">
        <Flex bg="white" borderRadius="9px" direction="column" gap="20px" p="30px" w="1100px">
          <Text fontSize="28px" fontWeight="600">{!props.type?"New Hackathon Event":"Edit Event"}</Text>
          
          
          <FormControl >
          <FormLabel>Title</FormLabel>
            <Input type='text'  
              placeholder="Title of your event"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <FormControl>
          <FormLabel>Summary</FormLabel>
            <Input type='text'  
              placeholder="A short summary of your event"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={desErr}>
          <FormLabel>Description</FormLabel>
            <Textarea h="150px"  
              value={formValue.description}
              placeholder="Write a description of your event to what to do in this event"
              name="description"
              onChange={handleChange}
              onKeyUp={handleKeyDown}
            />
            <Flex>
              <FormErrorMessage>error</FormErrorMessage>
              {formValue.description.length}
            </Flex>
          </FormControl>
        </Flex>
      </Box>
    </>
  )
} 