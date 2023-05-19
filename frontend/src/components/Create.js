import { useState, useContext } from "react"
import DataContext from "../context/DataContext"
import NavBar from "./NavBar"
import {Flex,InputGroup, InputLeftElement,Button, Text,Input, Textarea, Image, Box, FormErrorMessage, FormControl, FormLabel,} from "@chakra-ui/react"
import upload from "../images/upload.png"

export default function CreatePage(props){
  let {admin} = useContext(DataContext)
  let [desErr,setDesErr] = useState(false)
  let [selectImage, setSelectImage] = useState("")
  let [formValue,setFormValue] = useState({
    "title":"",
    "summary":"",
    "description":"",
    "image":"",
    "start_date":"",
    "end_date":"",
    "reward":""
  })

function handleSubmit(event){
  event.preventDefault()
  console.table(formValue)
}

  function handleKeyDown(event){
    const {name,value} = event.target
    if(event.key==="Backspace"&&formValue.description.length>=3000){
      console.log("now")
      
      setFormValue((prev) => {
        return {...prev, [name]:value.slice(0,-1)}
      })
    }
  }

  function handleChange(event){
    const {name,value} = event.target

    if (event.target.files){
      setSelectImage(event.target.files[0])
    }
    if(formValue.description.length<3000){
      setDesErr(false)
      setFormValue((prev) => {
        return {...prev, [name]:value}
      })
    }else if (formValue.description.length>=3000){
      setDesErr("3000")
    }
  }

  let date= new Date()
  date.setDate(date.getDate()+1)
  let month = date.getMonth()+1
  let minDate= `${date.getFullYear()}-${month<= 9?`0${month}`:month}-${date.getDate()}`

  date.setDate(date.getDate()+30)
  let maxMonth = date.getMonth()+1
  let maxDate= `${date.getFullYear()}-${maxMonth<= 9?`0${maxMonth}`:maxMonth}-${date.getDate()}`

  let endMaxDate= ""
  let endMinDate = ""
  if (formValue.start_date){
    let newDate = new Date(formValue.start_date)
    newDate.setDate(newDate.getDate()+30)
    let endMinMonth = newDate.getMonth()+1
    endMinDate = `${newDate.getFullYear()}-${endMinMonth<= 9?`0${endMinMonth}`:endMinMonth}-${newDate.getDate()}`
    

    newDate.setDate(newDate.getDate()+30)
    let endMaxMonth = newDate.getMonth()+1
    endMaxDate = `${newDate.getFullYear()}-${endMaxMonth<= 9?`0${endMaxMonth}`:endMaxMonth}-${newDate.getDate()}`
  }

  return(
    <Box className='create-div'>
      <NavBar/>
      <Box bg="#d9e9fa" minH="93svh" p="50px" pr="100px">
        <form onSubmit={handleSubmit}>
        <Flex bg="white" borderRadius="9px" direction="column" gap="20px" p="30px" w="1100px">
          <Text fontSize="28px" fontWeight="600">{!props.type?"New Hackathon Event":"Edit Event"}</Text>
          
          
          <FormControl >
          <FormLabel>Title</FormLabel>
            <Input type='text'  
              placeholder="Title of your event"
              onChange={handleChange}
              name="title"
              value={formValue.title}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <FormControl>
          <FormLabel>Summary</FormLabel>
            <Input type='text'  
              placeholder="A short summary of your event"
              onChange={handleChange}
              name="summary"
              value={formValue.summary}
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
            <InputGroup size="md" h="80px">
                <InputLeftElement
                  ml="40px"
                  mt="20px"
                  pointerEvents="none"
                  children={<Image src={props.data?`http://127.0.0.1:8000${props.data.image}`: selectImage?URL.createObjectURL(selectImage):upload} className="image-input-icon"/>}
                  w="65px"
                />
                <Input h="80px" onChange={handleChange} pt="20px" type='file' borderStyle="dashed" borderWidth="3px" value={formValue.image} name="image" className="image-input"/>
                </InputGroup>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <Flex justify="space-between">
            <Box w="45%">
              <FormControl>
                <FormLabel>Event Start Date</FormLabel>
                <Input type='date' min={minDate} max={maxDate}
                onChange={handleChange}
                name="start_date"
                value={formValue.start_date}
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </Box>
            <Box w="45%">
              <FormControl>
                <FormLabel>Event End Date</FormLabel>
                <Input type='date' disabled={formValue.start_date?false:true} max={endMaxDate} min={endMinDate}
                onChange={handleChange}
                name="end_date"
                value={formValue.end_date}
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <FormControl>
            <FormLabel>Reward</FormLabel>
            <Input type='text'  
              placeholder="Make a reward for this event"
              onChange={handleChange}
              name="reward"
              value={formValue.reward}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <Button w="200px" colorScheme="whatsapp" type="submit">Start Event</Button>
        </Flex>
        </form>
      </Box>
    </Box>
  )
} 