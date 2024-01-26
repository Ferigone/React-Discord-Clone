import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Dropdown } from "@nextui-org/react";

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
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        Create a Channel
                        <br />
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder='Enter a Channel name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer justify="center">
                    <Button onPress={handleAddChannel} className="bg-blue w-full">
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewChannelModal;