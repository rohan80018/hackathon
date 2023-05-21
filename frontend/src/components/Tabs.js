import {Grid,Text, Button, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,Input,Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  PopoverBody,
  PopoverFooter,Center,Heading,
  PopoverArrow,
  PopoverCloseButton,
  InputLeftElement,
  InputGroup,Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react"
import { TriangleDownIcon, Search2Icon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from "react"
import DataContext from "../context/DataContext"
import React from 'react'

import Cards from "./Cards"

export default function Tablets(props) {
  let{userHackathonEvent, getUserHackathon, admin} = useContext(DataContext)

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

  if (!Object.keys(userHackathonEvent).length){
    return(<h1>Loading</h1>)
  }
  console.log(userHackathonEvent)
  let eventData = newest? userHackathonEvent.slice(0).reverse().map((data)=>(
    <Cards data={data} />
  )):userHackathonEvent.map((data)=>(<Cards data={data}/>))

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
                    children={<Search2Icon color="gray.300" />}
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
              <p>panel 1</p>
            </TabPanel>
            <TabPanel>
              <p>panel 2</p>
            </TabPanel>
          </TabPanels>:
          <TabPanels>
            <TabPanel>
              <Grid templateColumns='repeat(3, 1fr)' gap={9}>
                {eventData}
              </Grid>
            </TabPanel>
          </TabPanels>
        }
      </Tabs>
  )
}