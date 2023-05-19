import { useState, useContext } from "react"
import DataContext from "../context/DataContext"
import NavBar from "./NavBar"
import {Flex,InputGroup, InputLeftElement, Text,Input, Textarea, Image, Box, FormErrorMessage, FormControl, FormLabel,} from "@chakra-ui/react"
import upload from "../images/upload.png"

export default function CreatePage(props){
  let {admin} = useContext(DataContext)
  let [desErr,setDesErr] = useState(false)
  let [selectImage, setSelectImage] = useState("")
  let [formValue,setFormValue] = useState({
    "title":"",
    "summary":"",
    "description":"",
    "image":""
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
    console.log(name, value)
    // if(para==="image"){
    //   // setSelectImage(event.target.files[0])
    // // console.log(event.target.files[0])

    if (event.target.files){
      setSelectImage(event.target.files[0])
    }
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
    <Box className='create-div'>
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
              className="create-textarea" 
              value={formValue.description}
              placeholder="Write a description of your event to what to do in this event"
              name="description"
              onChange={handleChange}
              onKeyUp={handleKeyDown}
            />
            <Flex justify="space-between">
              <Box>
                <FormErrorMessage>error</FormErrorMessage>
              </Box><Box>
                <Text color="gray.500" fontSize="13px" fontWeight="600">{formValue.description.length}/3000 characters</Text>
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Cover Image</FormLabel>
            <InputGroup size="md" h="70px">
                <InputLeftElement
                  ml="40px"
                  mt="20px"
                  pointerEvents="none"
                  children={<Image src={props.data?`http://127.0.0.1:8000${props.data.image}`: selectImage?URL.createObjectURL(selectImage):upload} className="image-input-icon"/>}
                  w="65px"
                />
                <Input h="80px" onChange={handleChange} pt="20px" type='file' borderStyle="dashed" borderWidth="3px" value={formValue.image} name="image" className="image-input"/>
                </InputGroup>
            {/* <Input type='file' borderStyle="dashed" borderWidth="3px" className="image-input"
              
            /> */}
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Flex>
      </Box>
    </Box>
  )
} 