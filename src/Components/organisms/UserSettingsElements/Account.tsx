import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

function YourAccountSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Informacje o koncie */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Informacje o Koncie</CardHeader>
        <CardBody className="space-y-4">
          <Input label="Nazwa użytkownika" placeholder="Twoja nazwa użytkownika" className="w-full" />
          <Input label="Adres e-mail" placeholder="twójemail@example.com" disabled className="w-full" />
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">Status konta:</p>
            <span className="text-green-500">Aktywne</span>
          </div>
          <div className='my-4'></div>
          <Input type="file" accept="image/*" label="Zdjęcie profilowe" labelPlacement='inside' className="w-full mt-8" />
          <p className="text-sm text-gray-600">Data rejestracji: 15.03.2022</p>
        </CardBody>
      </Card>

      {/* Zmień hasło */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Zmień Hasło</CardHeader>
        <CardBody className="space-y-4">
          <Input label="Obecne hasło" type="password" className="w-full" />
          <Input label="Nowe hasło" type="password" className="w-full" />
          <Input label="Potwierdź nowe hasło" type="password" className="w-full" />
          <p className="text-sm text-gray-600">
            Wskazówka: Użyj co najmniej 8 znaków, w tym liter, cyfr i symboli, aby utworzyć silne hasło.
          </p>
        </CardBody>
      </Card>

      {/* Dwuetapowa weryfikacja */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dwuetapowa Weryfikacja (2FA)</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz dwuetapowe uwierzytelnianie</Switch>
          <Select label="Metoda autoryzacji" className="w-full">
            <SelectItem key="app">Aplikacja autoryzacyjna</SelectItem>
            <SelectItem key="sms">SMS</SelectItem>
          </Select>
          <p className="text-sm text-gray-600">
            Zwiększ bezpieczeństwo konta przez dodatkowe uwierzytelnienie przy logowaniu.
          </p>
          <Button color="primary" className="mt-2">Skonfiguruj 2FA</Button>
        </CardBody>
      </Card>

      {/* Aktywność logowania */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Aktywność Logowania</CardHeader>
        <CardBody className="space-y-4">
          {/* Przykładowa lista aktywności logowania */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Data: 12.10.2023, Lokalizacja: Warszawa, Urządzenie: iPhone</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Data: 10.10.2023, Lokalizacja: Kraków, Urządzenie: MacBook Pro</span>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="warning" className="w-full">Wyloguj ze wszystkich urządzeń</Button>
        </CardFooter>
      </Card>

      {/* Usunięcie konta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Usunięcie Konta</CardHeader>
        <CardBody className="space-y-4">
          <p className="text-sm text-gray-600">
            Usunięcie konta jest trwałe i skutkuje utratą wszystkich danych. Możesz również wybrać tymczasową dezaktywację.
          </p>
          <Button color="danger" className="w-full">Usuń konto</Button>
          <Button color="warning" className="w-full">Dezaktywuj konto</Button>
        </CardBody>
      </Card>

      {/* Powiązane konta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powiązane Konta</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <p className="text-md font-medium">Połączone konta:</p>
            <div className="flex justify-between items-center">
              <span>Facebook</span>
              <Button size="sm" color="danger">Odłącz</Button>
            </div>
            <div className="flex justify-between items-center">
              <span>Google</span>
              <Button size="sm" color="danger">Odłącz</Button>
            </div>
          </div>
          <Button color="primary" className="w-full">Dodaj nowe konto</Button>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default YourAccountSettings;
