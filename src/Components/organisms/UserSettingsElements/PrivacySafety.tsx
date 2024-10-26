import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Input } from "@nextui-org/react";

function PrivacySafetySettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Ustawienia prywatności */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Ustawienia Prywatności</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Widoczność profilu" className="w-full">
            <SelectItem key="everyone">Wszyscy</SelectItem>
            <SelectItem key="friends">Znajomi</SelectItem>
            <SelectItem key="nobody">Nikt</SelectItem>
          </Select>
          <Switch>Ukryj status online</Switch>
          <Switch>Ukryj ostatnie logowanie</Switch>
          <Switch>Ukryj lokalizację</Switch>
        </CardBody>
      </Card>

      {/* Blokowanie i zarządzanie użytkownikami */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Blokowanie i Zarządzanie Użytkownikami</CardHeader>
        <CardBody className="space-y-4">
          {/* Lista zablokowanych użytkowników */}
          <div className="space-y-2">
            <p className="text-md font-medium">Zablokowani użytkownicy:</p>
            <div className="flex justify-between items-center">
              <span>Jan Kowalski</span>
              <Button size="sm" color="danger">Odblokuj</Button>
            </div>
          </div>
          <Switch>Wycisz użytkowników (mute)</Switch>
        </CardBody>
      </Card>

      {/* Bezpieczeństwo wiadomości */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Bezpieczeństwo Wiadomości</CardHeader>
        <CardBody className="space-y-4">
          <Switch>Filtruj wiadomości od nieznajomych</Switch>
          <Switch>Ukrywaj obrazy i linki z zewnętrznych źródeł</Switch>
          <Switch>Ostrzegaj przed otwieraniem nieznanych linków</Switch>
        </CardBody>
      </Card>

      {/* Zarządzanie zaproszeniami */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Zarządzanie Zaproszeniami</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Kto może wysyłać zaproszenia" className="w-full">
            <SelectItem key="everyone">Wszyscy</SelectItem>
            <SelectItem key="friendsOfFriends">Znajomi znajomych</SelectItem>
            <SelectItem key="nobody">Nikt</SelectItem>
          </Select>
          <Switch>Wyłącz zaproszenia od nieznajomych</Switch>
        </CardBody>
      </Card>

      {/* Powiadomienia o podejrzanej aktywności */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiadomienia o Podejrzanej Aktywności</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Powiadomienia o logowaniu z nieznanych urządzeń</Switch>
          <Switch>Alert przy zmianie hasła</Switch>
        </CardBody>
      </Card>

      {/* Dwuetapowe uwierzytelnianie (2FA) */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dwuetapowe Uwierzytelnianie (2FA)</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz 2FA</Switch>
          <Select label="Metoda autoryzacji" className="w-full">
            <SelectItem key="app">Aplikacja mobilna</SelectItem>
            <SelectItem key="sms">SMS</SelectItem>
          </Select>
          <Button color="primary" className="mt-2">Skonfiguruj 2FA</Button>
        </CardBody>
      </Card>

      {/* Kontrola dostępu do danych */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Kontrola Dostępu do Danych</CardHeader>
        <CardBody className="space-y-4">
          <Switch>Zezwól na zbieranie danych użytkownika</Switch>
          <Button color="warning" className="w-full">Przejrzyj zgromadzone dane</Button>
          <Button color="danger" className="w-full">Usuń wszystkie dane użytkownika</Button>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default PrivacySafetySettings;
