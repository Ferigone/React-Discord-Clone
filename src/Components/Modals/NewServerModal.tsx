import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

interface Props {
    visible: boolean;
    title: string | React.ReactNode;
    setVisible: (visible: boolean) => void;
    addServer: (name: string, handleType: string) => void;
}

const NewServerModal = ({ visible, title, setVisible, addServer }: Props) => {
    const [name, setName] = React.useState("");
    const [modalStatus, setModalStatus] = React.useState('create');
    const closeHandler = () => {
        setVisible(false);
        setModalStatus('create');
    };

    const handleAddServer = () => {
        addServer(name, modalStatus);
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
                        {modalStatus === 'create' ? 'Create a server' : 'Join a server'}
                        <br />
                        <span className="flex flex-row items-center justify-center ml-1">
                            or <Button size="xs" color="gradient" shadow auto className="ml-2 mt-1 text-md" onPress={
                                () => {
                                    setModalStatus(modalStatus === 'create' ? 'join' : 'create');
                                    setName("");
                                }
                            }>
                                {modalStatus === 'create' ? 'Join a server' : 'Create a server'}
                            </Button>
                        </span>
                        <Text size={12} className="text-gray-500 mt-3">
                            By {modalStatus === 'create' ? 'creating' : 'joining'} a server, you will have access to free
                            text-based channels to use amongst your friends.
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>

                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder={modalStatus === 'create' ? 'Enter a server name' : 'Enter a server invite code'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer justify="center">
                    <Button onPress={handleAddServer} className="bg-blue w-full">
                        {modalStatus === 'create' ? 'Create' : 'Join'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewServerModal;