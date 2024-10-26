import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/react";

function FriendInvitationsSettings() {
  return (
    <div className="space-y-6 p-6">
      {/* Zarządzanie zaproszeniami */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Zarządzanie Zaproszeniami
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Lista przykładowych zaproszeń */}
          <div className="space-y-2">
            <p className="text-md font-medium">Zaproszenia od użytkowników:</p>
            <div className="flex justify-between items-center">
              <span>Jan Kowalski (wspólni znajomi: 5)</span>
              <div className="space-x-2">
                <Button size="sm">Akceptuj</Button>
                <Button size="sm" color="danger">
                  Odrzuć
                </Button>
                <Button size="sm" color="warning">
                  Zablokuj
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Ustawienia przyjmowania zaproszeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Ustawienia Przyjmowania Zaproszeń
        </CardHeader>
        <CardBody className="space-y-4">
          <Select label="Kto może wysyłać zaproszenia" className="w-full">
            <SelectItem key="everyone">Wszyscy</SelectItem>
            <SelectItem key="friendsOfFriends">Znajomi znajomych</SelectItem>
            <SelectItem key="contactsOnly">Tylko osoby z kontaktów</SelectItem>
          </Select>
          <Switch>Blokuj zaproszenia od osób spoza kontaktów</Switch>
        </CardBody>
      </Card>

      {/* Historia zaproszeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Historia Zaproszeń
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Przykładowa historia zaproszeń */}
          <div className="space-y-2">
            <p className="text-md font-medium">Wysłane zaproszenia:</p>
            <div className="flex justify-between items-center">
              <span>Anna Nowak (oczekujące)</span>
              <div className="space-x-2">
                <Button size="sm">Wyślij ponownie</Button>
                <Button size="sm" color="danger">
                  Wycofaj
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Automatyczne akceptowanie zaproszeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Automatyczne Akceptowanie Zaproszeń
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Akceptuj zaproszenia od znajomych znajomych
          </Switch>
          <Select label="Zaufane kontakty" className="w-full">
            <SelectItem key="trusted1">Piotr Zieliński</SelectItem>
            <SelectItem key="trusted2">Kasia Kwiatkowska</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Filtrowanie i blokowanie zaproszeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Filtrowanie i Blokowanie Zaproszeń
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch>Ukryj zaproszenia od nowych kont</Switch>
          <Switch defaultSelected>
            Blokuj zaproszenia od kont zgłoszonych jako spam
          </Switch>
        </CardBody>
      </Card>

      {/* Powiadomienia o nowych zaproszeniach */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Powiadomienia o Nowych Zaproszeniach
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Powiadomienia o nowych zaproszeniach</Switch>
          <Select label="Typ powiadomień" className="w-full">
            <SelectItem key="onScreen">Na ekranie</SelectItem>
            <SelectItem key="email">E-mailem</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default FriendInvitationsSettings;
