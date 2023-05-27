import {Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,Text} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"


export default function DialogModal(props){
  const { isOpen, onOpen, onClose } = useDisclosure()

  function deleteFun(){
    onClose()
    props.onDelete()
  }

  return(
    <>
      
      <Button onClick={onOpen} leftIcon={<DeleteIcon/>} w="100px" borderWidth="2px" fontWeight="700" colorScheme="red" variant='outline'>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This event will be deleted including the submissions !</Text>
            Are you sure to delete ?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='outline' colorScheme="red" onClick={deleteFun}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}