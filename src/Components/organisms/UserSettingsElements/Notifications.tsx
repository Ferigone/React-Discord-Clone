import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider, Button } from "@nextui-org/react";

function NotificationsSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Ustawienia powiadomień ogólnych */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia Ogólne</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz/Wyłącz wszystkie powiadomienia</Switch>
          <Select label="Poziom szczegółowości powiadomień" className="w-full">
            <SelectItem key="all">Wszystkie powiadomienia</SelectItem>
            <SelectItem key="important">Tylko najważniejsze</SelectItem>
            <SelectItem key="priority">Priorytetowe</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Powiadomienia o wiadomościach */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia o Wiadomościach</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Częstotliwość powiadomień" className="w-full">
            <SelectItem key="immediate">Natychmiastowe</SelectItem>
            <SelectItem key="hourly">Co godzinę</SelectItem>
            <SelectItem key="off">Wyłącz</SelectItem>
          </Select>
          <Select label="Wycisz powiadomienia od" className="w-full">
            <SelectItem key="selectedContacts">Wybrane kontakty</SelectItem>
            <SelectItem key="selectedGroups">Wybrane grupy</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Dźwięki powiadomień */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dźwięki Powiadomień</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Dźwięk dla wiadomości prywatnych" className="w-full">
            <SelectItem key="sound1">Dźwięk 1</SelectItem>
            <SelectItem key="sound2">Dźwięk 2</SelectItem>
            <SelectItem key="mute">Wycisz</SelectItem>
          </Select>
          <Select label="Dźwięk dla wiadomości grupowych" className="w-full">
            <SelectItem key="sound1">Dźwięk 1</SelectItem>
            <SelectItem key="sound2">Dźwięk 2</SelectItem>
            <SelectItem key="mute">Wycisz</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Powiadomienia o połączeniach głosowych/wideo */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia o Połączeniach</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Powiadomienia o przychodzących połączeniach</Switch>
          <Select label="Powiadomienia od" className="w-full">
            <SelectItem key="friends">Znajomi</SelectItem>
            <SelectItem key="groups">Wybrane grupy</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Powiadomienia push */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia Push</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Otrzymuj powiadomienia push</Switch>
          <Select label="Tryb 'Nie przeszkadzać'" className="w-full">
            <SelectItem key="night">W nocy</SelectItem>
            <SelectItem key="workHours">Godziny pracy</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Podgląd powiadomień */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Podgląd Powiadomień</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz podgląd treści wiadomości</Switch>
          <Switch>Podgląd treści na zablokowanym ekranie</Switch>
        </CardBody>
      </Card>

      {/* Harmonogram powiadomień */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Harmonogram Powiadomień</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Harmonogram" className="w-full">
            <SelectItem key="work">Godziny pracy</SelectItem>
            <SelectItem key="night">W nocy</SelectItem>
          </Select>
          <Switch defaultSelected>Automatyczne wyciszenie w trybie 'Do Not Disturb'</Switch>
        </CardBody>
      </Card>

      {/* Powiadomienia o aktywności znajomych */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia o Aktywności Znajomych</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Powiadomienia o aktywności znajomych</Switch>
          <Select label="Ogranicz powiadomienia do" className="w-full">
            <SelectItem key="selectedContacts">Wybrani znajomi</SelectItem>
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

export default NotificationsSettings;
