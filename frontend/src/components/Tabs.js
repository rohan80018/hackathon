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
import { ArrowDownIcon, TriangleDownIcon, Search2Icon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from "react"
import DataContext from "../context/DataContext"
import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function Tablets(props) {
  let{userHackathonEvent, getUserHackathon} = useContext(DataContext)

  const [newest, setNewest] = useState(true)  

  useEffect(()=>{
    getUserHackathon()
  },[])
  
  if (!Object.keys(userHackathonEvent).length){
    return(<h1>Loading</h1>)
  }
  console.log(userHackathonEvent)
  let eventData = newest? userHackathonEvent.map((data)=>(
    // <Flex>
    //   <Flex>

    //   </Flex>
    //   <Text>{data.summary}</Text>
    // </Flex>
    <Card key={data.id}>
      <CardHeader>
        <Flex justify="space-around">
          <Image src={`http://127.0.0.1:8000${data.image}`} boxSize="90px" borderRadius="9px"/>
          <Center w="200px">
            <Heading size='md'>
            {data.title}
            </Heading>
          </Center>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {data.summary}
        </Text>
      </CardBody>
      <CardFooter>
        <ReactTimeAgo date={data.date} locale="en-US"/>
      </CardFooter>
    </Card>
  )):""

  return (
    <Tabs position="relative" variant="unstyled" size="lg" w="1300px" >
        <TabList>
          <Tab>Hackathon Events</Tab>
          <Flex w="70svw" justify="flex-end">
            <Flex w="23svw" justify={"space-between"}>
              <InputGroup size="md">
                <InputLeftElement
                  mt="4px"
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                  size="sm"
                />
                <Input pb="2px" variant='filled' mt="7px" h="35px" borderRadius="24px" w="220px" placeholder="Search Hackathon" />
              </InputGroup>
              {/* <Input  pb="2px" variant='filled' mt="7px" h="35px" borderRadius="24px" w="200px" placeholder="Search Hackathon"/> */}
              <Popover>
                <PopoverTrigger>
                  <Button pb="2px" w="110px" borderRadius="24px" h="35px" mt="7px" rightIcon={<TriangleDownIcon />}>{newest?"newest":"oldest"}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                  <PopoverBody>
                    <Flex direction='column' h="80px" justify={"space-around"}>
                      <Button borderRadius="24px" w="170px" h="35px" colorScheme={newest?"teal":"gray"} onClick={()=>setNewest(true)}>newest</Button>
                      <Button borderRadius="24px" w="170px" h="35px" colorScheme={newest?"gray":"teal"} onClick={()=>setNewest(false)}>oldest</Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
          
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Grid templateColumns='repeat(3, 1fr)' gap={9}>
              {eventData}
            </Grid>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
  )
}