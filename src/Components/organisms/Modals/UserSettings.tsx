import {
  Modal,
  ModalContent,
  ModalBody,
  Divider,
  Listbox,
  ListboxItem,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import Accessibility from "@organisms/UserSettingsElements/Accessibility";

import Account from "@organisms/UserSettingsElements/Account";
import Advanced from "@organisms/UserSettingsElements/Advanced";
import Appearance from "@organisms/UserSettingsElements/Appearance";
import Beta from "@organisms/UserSettingsElements/Beta";
import Devices from "@organisms/UserSettingsElements/Devices";
import FriendsInvitations from "@organisms/UserSettingsElements/FriendsInvitations";
import Language from "@organisms/UserSettingsElements/Language";
import Notifications from "@organisms/UserSettingsElements/Notifications";
import PrivacySafety from "@organisms/UserSettingsElements/PrivacySafety";
import Profile from "@organisms/UserSettingsElements/Profile";
import TextImages from "@organisms/UserSettingsElements/TextImages";
import VoiceVideo from "@organisms/UserSettingsElements/VoiceVideo";

import { logout } from "@store/reducers/userSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function App({ isOpen, onClose }) {
  const [selected, setSelected] = React.useState("profile");
  const dispatch = useDispatch();

  const settingsMenu = [
    {
      type: "category",
      name: "User Settings",
      description:
        "Personalize your account and privacy settings to feel safe and comfortable during conversations.",
      items: [
        { name: "Your account", key: "account", component: <Account /> },
        { name: "Profile", key: "profile", component: <Profile /> },
        {
          name: "Privacy & Safety",
          key: "privacy",
          component: <PrivacySafety />,
        },
        { name: "Devices", key: "devices", component: <Devices /> },
        {
          name: "Friend invitations",
          key: "invitations",
          component: <FriendsInvitations />,
        },
      ],
    },
    {
      type: "category",
      name: "App Settings",
      description:
        "Customize the appearance and behavior of the app to your needs – from notifications, through language, to sound and image settings.",
      items: [
        { name: "Appearance", key: "appearance", component: <Appearance /> },
        { name: "Language", key: "language", component: <Language /> },
        {
          name: "Notifications",
          key: "notifications",
          component: <Notifications />,
        },
        {
          name: "Accessibility",
          key: "accessibility",
          component: <Accessibility />,
        },
        { name: "Text & Images", key: "text", component: <TextImages /> },
        { name: "Voice & Video", key: "voice", component: <VoiceVideo /> },
        { name: "Advanced", key: "advanced", component: <Advanced /> },
      ],
    },
    {
      type: "category",
      name: "What's New",
      description:
        "Stay up to date with the latest updates, changes, and new features we are adding to the app.",
      items: [
        {
          name: "Changelog",
          key: "changelog",
          component: null,
          disabled: true,
        },
        {
          name: "Release notes",
          key: "releases",
          component: null,
          disabled: true,
        },
        { name: "Beta", key: "beta", component: <Beta /> },
      ],
    },
  ];

  const disabledItems = settingsMenu.map((category) =>
    category.items.filter((item) => item.disabled)
  );

  const selectedComponent = settingsMenu
    .find((category) => category.items.find((item) => item.key === selected))
    ?.items.find((item) => item.key === selected)?.component;

  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="flex w-full flex-col justify-center items-center">
              <ModalBody className="w-[1200px] py-16 flex flex-row gap-4">
                <ScrollShadow className="modal-max-h pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent pb-4">
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

                    <Divider className="my-4" />

                    {/* Logout button */}
                    <Button
                      className="text-small w-full text-red-500 font-semibold"
                      variant="flat"
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      Logout
                    </Button>

                    {/* Info about app version and api version */}
                    <div className="mt-8">
                      <p className="text-default-400 text-small">
                        App Version: 1.0.0
                      </p>
                      <p className="text-default-400 text-small">
                        API Version: 1.0.0
                      </p>
                    </div>
                  </div>
                </ScrollShadow>
                <div className="flex-1 relative">
                  <ScrollShadow className="modal-max-h  pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow pb-4">
                    {/* Content for the selected menu item can be rendered here */}
                    {selectedComponent && selectedComponent}
                  </ScrollShadow>
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
