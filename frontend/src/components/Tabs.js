import {Grid,Text, Button, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,Input,Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  PopoverBody,
  PopoverFooter,Center,Heading,
  PopoverArrow,
  
  InputLeftElement,
  InputGroup} from "@chakra-ui/react"
import { TriangleDownIcon, Search2Icon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from "react"
import DataContext from "../context/DataContext"
import React from 'react'

import Cards from "./Cards"
import { Link } from "react-router-dom"

export default function Tablets(props) {
  let{userHackathonEvent, getUserHackathon, admin, eventData} = useContext(DataContext)

  const [newest, setNewest] = useState(true)  
  console.log(admin)
  useEffect(()=>{
    if(admin&&props.type==="admin"){
      // "submissions()"
    }else if(admin){
      getUserHackathon()
    }
  },[])
  
  // function sortToggle(toggle){
  //   toggle?setNewest(true):setNewest(false)

  // }
  
  if (props.type==="admin"&&!Object.keys(eventData).length){
    return(<h1>Loading events</h1>)
  }
  else if(props.type!=="admin"&& !Object.keys(userHackathonEvent).length){
    return (<h1>Loading submissions</h1>)
  }
  // console.log(userHackathonEvent)
  
    let renderData =props.type==="admin"?newest? eventData.submissions.slice(0).reverse().map((data)=>
        <Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id} type="submissions"/></Link>):
      eventData.submissions.map((data)=>(<Link to={`/events/${eventData.id}/${data.user}/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} type="submissions" key={data.id} /></Link>))
    : newest? userHackathonEvent.slice(0).reverse().map((data)=>(
        <Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id} /> </Link>
      )):userHackathonEvent.map((data)=>(<Link to={`/events/${data.id}`} style={{"maxWidth":"400px"}} ><Cards data={data} key={data.id}/></Link>))
  
  

  return (
    <Tabs position="relative" variant="unstyled" size="lg" w="1300px" >
        
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
              <Tab>{admin&&props.type==="admin"?"All Submissions":"Hackathon Events"}</Tab>
              <Tab>{admin&&props.type==="admin"?"Favourite Submissions":""}</Tab>
            </Flex>
            <Flex  justify="flex-end">
              <Flex w="23svw" justify={"space-between"}>
                <InputGroup size="md">
                  <InputLeftElement
                    mt="4px"
                    pointerEvents="none"
                    children={<Search2Icon color="gray.400" />}
                    size="sm"
                  />
                  <Input pb="2px" variant='filled' mt="7px" h="35px" borderRadius="24px" w="220px" placeholder={admin&&props.type==="admin"?"Search Submissions":"Search Hackathon"} />
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
            </Flex>
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
              {eventData.submissions.length?<Grid templateColumns='repeat(3, 1fr)' gap={9}>
                {renderData}
              </Grid>:
              <Flex justify="center" mt="40px">
                <Text fontSize="24px">No Submissions yet</Text>
              </Flex>}
            </TabPanel>
            <TabPanel>
              
            </TabPanel>
          </TabPanels>:
          <TabPanels>
            <TabPanel>
              <Grid templateColumns='repeat(3, 1fr)' gap={9}>
                {renderData}
              </Grid>
            </TabPanel>
          </TabPanels>
        }
      </Tabs>
  )
}