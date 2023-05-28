import {Grid,Text, Button, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,Input,Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  PopoverBody,
  PopoverFooter,Center,Heading,
  PopoverArrow,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Icon,
  CloseButton} from "@chakra-ui/react"
import { TriangleDownIcon, Search2Icon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from "react"
import DataContext from "../context/DataContext"
import React from 'react'

import Cards from "./Cards"
import { Link } from "react-router-dom"

export default function Tablets(props) {
  let{setUserHackathonEvent,user,userHackathonEvent,getEventData, getUserHackathon, admin,setEventData, eventData} = useContext(DataContext)

  const [newest, setNewest] = useState(true)  
  let [search,setSearch] = useState("")
  console.log(admin)
  useEffect(()=>{
    if(admin&&props.type==="admin"){
      // "submissions()"
    }else if(admin){
      getUserHackathon()
    }
  },[])
  
  function helll(){
    console.log(admin&&props.type==="admin"?"clicked admin sub":"cliked admin")

  }
  async function handleSearch(event){
    if(search&&event.key==="Enter"&&props.type==="admin"){
      let response = await fetch(`http://127.0.0.1:8000/hackathon/submissions/search/${eventData.id}/?search=${search}`)
      let data= await response.json()
      if (response.status===201){
        setEventData((prev)=>{
          return ({...prev, submissions:data})
        })
      }
    }
    else if(event.key==="Enter"&&search){
      let response = await fetch(`http://127.0.0.1:8000/hackathon/listings/${user.user_id}/?search=${search}`)
      let data= await response.json()
      if (response.status===201){
        Object.keys(data).length?
        setUserHackathonEvent(data):
        setUserHackathonEvent({message:"No Events"})
      }
    }
  }
  function cancelSearch(){
    setSearch("")
    props.type==="admin"?getEventData(eventData.id):getUserHackathon()
    
  }

  function inputSearch(event){
    setSearch(event.target.value)
  }
  
  if (props.type==="admin"&&!Object.keys(eventData).length){
    return(<h1>Loading submissions</h1>)
  }
  else if(props.type!=="admin"&& !Object.keys(userHackathonEvent).length){
    return (<h1>Loading event</h1>)
  }
  // console.log(userHackathonEvent)
  
    // let renderData =props.type==="admin"?newest? eventData.submissions.slice(0).reverse().map((data)=>
    //     <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id} type="submissions"/></Link>):
    //   eventData.submissions.map((data)=>(<Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} type="submissions" key={data.id} /></Link>))
    // : newest? userHackathonEvent.slice(0).reverse().map((data)=>(
    //     <Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id} /> </Link>
    //   )):userHackathonEvent.map((data)=>(<Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id}/></Link>))
  
    // eventData.submissions.length&&newest?eventData.submissions.map((data)=>data.isFav&&<Cards data={data} key={data.id}/>):
    // eventData.submissions.slice(0).reverse().map((data)=>data.isFav&&<Cards data={data} key={data.id}/>)

  return (
    <Tabs position="relative" variant="unstyled" size="lg" w="1300px" h="355px" >
        
        {/* {admin&&<TabList><Tab>Hackathon Events</Tab></TabList>} */}
        {/* {admin&&props.type==="admin"?
          <TabList>
          <Tab>All Submissions</Tab>
          <Tab>Favourite Submissions</Tab>
          </TabList>
        :<TabList><Tab>Hackathon Events</Tab></TabList>} */}
        <TabList>
          <Flex w="100svw">
            <Flex w="60svw">
              <Tab onClick={helll}>{admin&&props.type==="admin"?"All Submissions":"Hackathon Events"}</Tab>
              <Tab>{admin&&props.type==="admin"?"Favourite Submissions":""}</Tab>
            </Flex>
            {/* <Flex bg="red" justify="space-between"> */}
              <Flex w="25svw"  justify="space-between" >
                <InputGroup size="md">
                  <InputLeftElement
                    mt="4px"
                    pointerEvents="none"
                    children={<Search2Icon color="gray.400" />}
                    size="md"
                  />
                  {search?<InputRightElement
                    mt="4px"
                    mr="20px"
                    children={<CloseButton onClick={cancelSearch} size="md" color="gray.600"/>}
                  />:""}
                  
                    {/* <CloseButton/> */}
                    
                  {/* </InputRightElement> */}
                  <Input pb="2px" onKeyDown={handleSearch} onChange={inputSearch} value={search} variant='filled' mt="7px" h="35px" borderRadius="24px" w="265px" placeholder={admin&&props.type==="admin"?"Search Submissions":"Search Hackathon"} />
                </InputGroup>
                {/* <Input  pb="2px" variant='filled' mt="7px" h="35px" borderRadius="24px" w="200px" placeholder="Search Hackathon"/> */}
                <Popover >
                  <PopoverTrigger>
                    <Button pb="2px" w="115px" borderRadius="24px" h="35px" mt="7px" rightIcon={<TriangleDownIcon />}>{newest?"Newest":"Oldest"}</Button>
                  </PopoverTrigger>
                  <PopoverContent w="150px">
                    <PopoverArrow />
                    {/* <PopoverCloseButton /> */}
                    {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                    <PopoverBody>
                      <Flex direction='column' justify={"space-around"}>
                        <Button bg={newest?"#accbe3":""} onClick={()=>setNewest(true)}>Newest</Button>
                        <Button bg={newest?"":"#accbe3"} onClick={()=>setNewest(false)}>Oldest</Button>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            {/* </Flex> */}
          </Flex>
        </TabList>

        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        {admin&&props.type==="admin"?
          <TabPanels>
            <TabPanel>
              {eventData.submissions.length?
                <Grid templateColumns='repeat(3, 1fr)' gap={9}>
                  {newest? eventData.submissions.slice(0).reverse().map((data)=>
                    <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} >
                      <Cards data={data} key={data.id} type="submissions"/>
                    </Link>)
                  :
                  eventData.submissions.map((data)=>(
                    <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} >
                      <Cards data={data} type="submissions" key={data.id} />
                    </Link>))
                  }
                </Grid>
                :
                <Flex justify="center" mt="40px">
                  <Text fontSize="24px">No Submissions yet</Text>
                </Flex>
              }
            </TabPanel>

            <TabPanel>
              {(eventData.submissions.filter(data=>data.isFav===true).length)
              ?
              <Grid templateColumns='repeat(3, 1fr)' gap={9}>
                {!newest?
                  eventData.submissions.map((data)=>data.isFav&&
                  <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} >
                    <Cards data={data} key={data.id}/>
                  </Link>)
                :
                eventData.submissions.slice(0).reverse().map((data)=>data.isFav&&
                  <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} >
                    <Cards data={data} key={data.id}/>
                  </Link>)
                }
              </Grid>
              :
                <Flex justify="center" mt="40px">
                  <Text fontSize="24px">No Favourites yet</Text>
                </Flex>
              }
            </TabPanel>
          </TabPanels>
        :
          <TabPanels>
            <TabPanel>
              {/* <Grid templateColumns='repeat(3, 1fr)' gap={9}> */}
                {!userHackathonEvent.message?
                  <Grid templateColumns='repeat(3, 1fr)' gap={9}>
                    {newest? userHackathonEvent.slice(0).reverse().map((data)=>(
                      <Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} >
                        <Cards data={data} key={data.id} /> 
                      </Link>))
                    :
                    userHackathonEvent.map((data)=>(
                      <Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} >
                        <Cards data={data} key={data.id}/>
                      </Link>))
                    }
                  </Grid>:
                  <Flex justify="center" mt="40px">
                    <Text fontSize="24px">{userHackathonEvent.message}</Text>
                  </Flex>
                }
                
                {/* {renderData} */}
              {/* </Grid> */}
            </TabPanel>
          </TabPanels>
        }
      </Tabs>
  )
}