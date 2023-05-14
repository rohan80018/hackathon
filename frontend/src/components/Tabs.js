import {Grid, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,Input} from "@chakra-ui/react"

export default function Tablets() {
  return (
    <Tabs position="relative" variant="unstyled" size="lg" w="1300px" >
        <TabList>
          <Tab>Hackathon Events</Tab>
          <Flex w="70svw" justify="flex-end">
            <Input pb="2px" variant='filled' mt="6px" h="35px" borderRadius="24px" w="200px" placeholder="Search Hackathon"/>
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
            <p>one!</p>
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