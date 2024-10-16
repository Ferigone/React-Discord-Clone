import React from "react";
import {
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";

interface Props {
  visible: boolean;
  title: string | React.ReactNode;
  setVisible: (visible: boolean) => void;
  addChannel: (name: string) => void;
}

export const CustomRadio = (props) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "flex m-0 text-content2 hover:border-solid hover:border-2 hover:border-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-content2 data-[selected=true]:bg-content2 data-[selected=true]:text-white",
        ),
        input: "hidden",
        label: "flex-1 text-md font-bold",
        wrapper: "" //Check element
      }}
    >
      {children}
    </Radio>
  );
};

const NewChannelModal = ({ visible, title, setVisible, addChannel }: Props) => {
  const [name, setName] = React.useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  const handleAddChannel = () => {
    addChannel(name);
    setName("");
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
            <RadioGroup>
              <CustomRadio value="text">Text</CustomRadio>
              <CustomRadio value="voice">Voice</CustomRadio>
            </RadioGroup>
            <Input
              fullWidth
              size="lg"
              placeholder="Enter a Channel name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
