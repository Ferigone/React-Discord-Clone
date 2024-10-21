import {
  Modal,
  ModalContent,
  ModalBody,
  Divider,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React from "react";

import Overview from "@organisms/ServerSettingsElements/Overview";
import Roles from "@organisms/ServerSettingsElements/Roles";
import Emoji from "@organisms/ServerSettingsElements/Emoji";
import Stickers from "@organisms/ServerSettingsElements/Stickers";
import Security from "@organisms/ServerSettingsElements/Security";
import Logs from "@organisms/ServerSettingsElements/Logs";
import Bans from "@organisms/ServerSettingsElements/Bans";
import Users from "@organisms/ServerSettingsElements/Users";
import Invites from "@organisms/ServerSettingsElements/Invites";

export default function App({ isOpen, onClose }) {
  const [selected, setSelected] = React.useState("overview");

  const settingsMenu = [
    {
      type: "category",
      name: "General",
      description: "General settings for the server",
      items: [
        { name: "Overview", key: "overview", component: <Overview /> },
        { name: "Roles", key: "roles", component: <Roles /> },
        { name: "Emoji", key: "emoji", component: <Emoji /> },
        {
          name: "Stickers",
          key: "stickers",
          disabled: true,
          component: <Stickers />,
        },
      ],
    },
    {
      type: "category",
      name: "Moderation",
      description: "Moderation settings for the server",
      items: [
        {
          name: "Security configuration",
          key: "security",
          disabled: true,
          component: <Security />,
        },
        { name: "Logs", key: "logs", component: <Logs /> },
        { name: "Bans", key: "bans", component: <Bans /> },
      ],
    },
    {
      type: "category",
      name: "Users management",
      description: "Manage users and invites",
      items: [
        { name: "Users", key: "users", component: <Users /> },
        { name: "Invites", key: "invites", component: <Invites /> },
      ],
    },
  ];

  const disabledItems = settingsMenu.map((category) =>
    category.items.filter((item) => item.disabled)
  );

  const selectedComponent = settingsMenu.find((category) =>
    category.items.find((item) => item.key === selected)
  )?.items.find((item) => item.key === selected)?.component;

  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="flex w-full flex-col justify-center items-center">
              <ModalBody className="w-[1200px] py-16 flex flex-row gap-4">
                <div className="w-[300px]">
                  {settingsMenu.map((category, index) => (
                    <div key={index}>
                      <div className="space-y-1">
                        <h4 className="text-medium font-medium">
                          {category.name}
                        </h4>
                        <p className="text-small text-default-400">
                          {category.description}
                        </p>
                      </div>
                      <Divider className="my-4" />
                      <Listbox
                        className="mb-4"
                        selectedKeys={[selected]}
                        disabledKeys={disabledItems
                          .flat()
                          .map((item) => item.key)}
                        onAction={(key: any) => {
                          setSelected(key);
                        }}
                      >
                        {category.items.map((item) => (
                          <ListboxItem
                            key={item.key}
                            className={`flex items-center space-x-4 text-small ${
                              selected === item.key
                                ? "text-blue-500 bg-primary-hover"
                                : "text-default-400"
                            }`}
                          >
                            {item.name}
                          </ListboxItem>
                        ))}
                      </Listbox>
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {/* Content for the selected menu item can be rendered here */}
                  {selectedComponent && selectedComponent}
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
