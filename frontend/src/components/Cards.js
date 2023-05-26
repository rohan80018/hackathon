import {Heading, Card, CardBody, CardHeader, CardFooter, Text, Image, Center, Flex} from "@chakra-ui/react"
import ReactTimeAgo from 'react-time-ago'
import { Link } from "react-router-dom"

export default function Cards({data}){
  return(
    
    <Card boxShadow="2px 2px 8px 2px rgb(182, 180, 180)"  minH="276px">
      
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
        <Flex w="100svw" justify="flex-end">
          <Text fontSize="12px" as="i" color="gray" fontWeight="600">
          Uploaded <ReactTimeAgo date={data.date} locale="en-US"/>
          </Text>  
        </Flex>
      </CardFooter>
    </Card>
    // </Link>
  )
}