import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Button, Input } from "@nextui-org/react";

interface Props {
  title: string | React.ReactNode;
  setVisible: (visible: boolean) => void;
  addServer: (name: string, handleType: string) => void;
  visible: boolean;
}

const NewServerModal = ({ visible, title, setVisible, addServer }: Props) => {
  const [name, setName] = React.useState("");
  const [modalStatus, setModalStatus] = React.useState("create");

  const closeHandler = () => {
    setVisible(false);
    setModalStatus("create");
  };

  const handleAddServer = () => {
    addServer(name, modalStatus);
    setName("");
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      onClose={closeHandler}
      className="z-50"
      isOpen={visible}
    >
      <ModalContent>
        <ModalHeader>
          <div>
            {modalStatus === "create" ? "Create a server" : "Join a server"}
            <br />
            <span className="flex flex-row items-center justify-center ml-1">
              or{" "}
              <Button
                size="sm"
                className="ml-2 mt-1 text-md"
                onPress={() => {
                  setModalStatus(modalStatus === "create" ? "join" : "create");
                  setName("");
                }}
              >
                {modalStatus === "create" ? "Join a server" : "Create a server"}
              </Button>
            </span>
            <p className="text-gray-500 mt-3">
              By {modalStatus === "create" ? "creating" : "joining"} a server,
              you will have access to free text-based channels to use amongst
              your friends.
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            color="primary"
            size="lg"
            placeholder={
              modalStatus === "create"
                ? "Enter a server name"
                : "Enter a server invite code"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleAddServer} className="bg-blue w-full">
            {modalStatus === "create" ? "Create" : "Join"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewServerModal;
