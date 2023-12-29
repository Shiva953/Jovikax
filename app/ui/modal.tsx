'use client'

import React from "react";
import Link from "next/link";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { redirect } from "next/navigation";
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
                <Button
                    variant="solid"
                    onClick={() => {redirect(linkToPun)}}
                    className="max-w-xs"><Link href={linkToPun}>Visit Pun</Link></Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}