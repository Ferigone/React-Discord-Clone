import React from "react";
import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

interface Props {
    visible: boolean;
    title: string | React.ReactNode;
    setVisible: (visible: boolean) => void;
    addChannel: (name: string) => void;
}

const NewChannelModal = ({ visible, title, setVisible, addChannel }: Props) => {
    const [name, setName] = React.useState("");

    const closeHandler = () => {
        setVisible(false);
    };

    const handleAddChannel = () => {
        addChannel(name);
        setName("")
    };
    return (
        <div>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                onClose={closeHandler}
            >
                <ModalHeader>
                    <p id="modal-title">
                        Create a Channel
                        <br />
                    </p>
                </ModalHeader>
                <ModalBody>
                    <Input
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder='Enter a Channel name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onPress={handleAddChannel} className="bg-blue w-full">
                        Create
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default NewChannelModal;