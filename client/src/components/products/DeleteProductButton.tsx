import React, { ReactNode, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

interface IDeleteButtonProps {
  name: string;
  children: ReactNode;
  confirmedFunction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function DeleteProductButton({ children, confirmedFunction, name }: IDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button colorScheme={"red"} variant="outline" onClick={() => setOpen(true)}>
        {children}
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete:</Text>
            <Text fontWeight="bold" display="inline">
              {name}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="outline" colorScheme="red" onClick={confirmedFunction}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>{" "}
      </Modal>
    </>
  );
}
