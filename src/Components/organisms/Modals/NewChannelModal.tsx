import React from "react";
import {
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Switch,
} from "@nextui-org/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { FaLock, FaLockOpen, FaMicrophone } from "react-icons/fa";
import { RiHashtag } from "react-icons/ri";


interface Props {
  visible: boolean;
  title: string | React.ReactNode;
  setVisible: (visible: boolean) => void;
  addChannel: (name: string) => void;
}

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;
  

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "flex m-0 text-content2 hover:border-solid hover:border-2 hover:border-content2 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-content2 data-[selected=true]:bg-content2 data-[selected=true]:text-white"
        ),
        input: "hidden",
        label: "flex-1 text-md font-bold",
        wrapper: "", //Check element
      }}
    >
      {children}
    </Radio>
  );
};

const NewChannelModal = ({ visible, title, setVisible, addChannel }: Props) => {
  const [name, setName] = React.useState("");
  const [channelType, setChannelType] = React.useState("text");
  const [isPrivate, setIsPrivate] = React.useState(false);

  const closeHandler = () => {
    setName("");
    setChannelType("text");
    setIsPrivate(false);
    setVisible(false);
  };

  const handleAddChannel = () => {
    addChannel(name);
    setName("");
    setChannelType("text");
    setIsPrivate(false);
  };
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        onClose={closeHandler}
        isOpen={visible}
      >
        <ModalContent>
          <ModalHeader>
            <p id="modal-title">
              Create a Channel
              <br />
            </p>
          </ModalHeader>
          <ModalBody>
            <RadioGroup defaultValue={channelType} onValueChange={(value)=>{
              setChannelType(value)
            }}>
              <CustomRadio value="text">Text</CustomRadio>
              <CustomRadio value="voice">Voice</CustomRadio>
            </RadioGroup>
            <Input
              fullWidth
              size="lg"
              placeholder="Enter a Channel name"
              value={name}
              startContent={
                channelType === "text" ? (
                  <RiHashtag className="mt-1 mx-2" />
                ) : (
                  <FaMicrophone className="mt-1 mx-2" />
                )
              }
              onChange={(e) => setName(e.target.value)}
            />
            <Switch
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  //selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                ),
              }}
              color="primary"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <FaLock className={className} />
                ) : (
                  <FaLockOpen className={className} />
                )
              }
              defaultSelected={isPrivate}
              onValueChange={(value) => setIsPrivate(value)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Private channel</p>
                <p className="text-tiny text-default-400">
                  When a channel is private, it can only be viewed or joined by
                  invitation.
                </p>
              </div>
            </Switch>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleAddChannel} className="bg-blue w-full">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewChannelModal;
