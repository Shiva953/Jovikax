'use client'

import React from "react";
import Link from "next/link";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function PopUpButton({title, linkToPun} : {title:string, linkToPun:string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button color="primary" type="submit" onPress={onOpen}>Make Joke</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Thanks for Sharing!</ModalHeader>
              <ModalBody>
                <p>
                  You can visit the punchline here
                </p>
                <Input
                    isReadOnly
                    type="link"
                    variant="bordered"
                    defaultValue={linkToPun}
                    className="max-w-xs"
                    />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Link href={linkToPun}>
                    <Button color="primary">Visit Pun</Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}