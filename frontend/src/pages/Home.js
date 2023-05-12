import { Flex, Box } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useContext } from "react"
import DataContext from "../context/DataContext"

export default function HomePage() {
  let {admin} = useContext(DataContext)
  function print(){
    console.log(admin)
  }
  return(
    <>
      <NavBar />
      <Box h="416px" bg="blue">
        <button onClick={print}>{admin?"Click":"no"}</button>
        {/* {admin} */}
      </Box>
    </>
  )
}
