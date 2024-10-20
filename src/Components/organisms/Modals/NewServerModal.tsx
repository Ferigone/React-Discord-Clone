import React from "react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import SelectAvatar from "@molecules/SelectAvatar";

interface Props {
  title: string | React.ReactNode;
  setVisible: (visible: boolean) => void;
  addServer: (name: string, handleType: string) => void;
  visible: boolean;
}

const NewServerModal = ({ visible, title, setVisible, addServer }: Props) => {
  const [name, setName] = React.useState("");
  const [modalStatus, setModalStatus] = React.useState<"create" | "join">(
    "create"
  );
  const [error, setError] = React.useState<string | null>(null);

  const closeHandler = () => {
    setVisible(false);
    setModalStatus("create");
    setError(null); // Reset the error message on close
    setName(""); // Reset name on modal close
  };

  const handleAddServer = () => {
    if (name.trim().length === 0) {
      setError(
        modalStatus === "create"
          ? "Server name cannot be empty."
          : "Invite code cannot be empty."
      );
      return;
    }
    setError(null);
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
      <ModalContent className="pt-8">
        <ModalBody>
          <Tabs
            size="lg"
            selectedKey={modalStatus}
            onSelectionChange={(key) => {
              setModalStatus(key as "create" | "join")
              setError(null);
              setName("")
            }}
            variant="bordered"
            classNames={{
              tabList: "flex justify-between w-full",
              cursor: "w-full bg-content2",
              tab: "px-0 h-12 font-semibold",
              tabContent: "group-data-[selected=true]:text-white-500",
            }}
          >
            <Tab
              key="create"
              title="Create Server"
              className="flex flex-col justify-center items-center gap-2"
            >
              <h1 className="font-bold text-xl">Personalize your server</h1>
              <p className="font-semibold text-center">
                Customize your server with a name, image, and more to make it
                your own.
              </p>

              <div className="mt-4">
                <SelectAvatar />
              </div>
            </Tab>
            <Tab
              key="join"
              title="Join Server"
              className="flex flex-col justify-center items-center gap-2"
            >
              <h1 className="font-bold text-xl">Join a server</h1>
              <p className="font-semibold">
                Enter an invite code to join an existing server.
              </p>
            </Tab>
          </Tabs>

          <Input
            fullWidth
            color="primary"
            size="lg"
            isClearable
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: ["text-white/90", "placeholder:text-white/60"],
              inputWrapper: [
                "shadow-xl",
                "bg-content2",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "focus-within:!bg-default-200/50",
                "!cursor-text",
                "data-[hover=true]:bg-content2",
              ],
              clearButton: "text-white"
            }}
            placeholder={
              modalStatus === "create" ? "Server name" : "Invite code or link"
            }
            value={name}
            onValueChange={(value) => {
              setName(value);
              if (value.trim().length > 0) {
                setError(null); // Only clear error if input becomes valid
              }
            }}
            isInvalid={!!error}
            errorMessage={error}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleAddServer}
            className="bg-blue w-full font-semibold"
          >
            {modalStatus === "create" ? "Create" : "Join"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


export default NewServerModal;
