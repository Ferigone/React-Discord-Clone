import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Input } from "@nextui-org/react";

function DevicesSettings() {
  return (
    <div className="space-y-6 p-6">
      {/* Zarządzanie urządzeniami */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Zarządzanie Urządzeniami
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Przykładowa lista urządzeń */}
          <div className="space-y-2">
            <p className="text-md font-medium">Zalogowane urządzenia:</p>
            <div className="flex justify-between items-center">
              <span>iPhone 12 (iOS) - Ostatnie logowanie: 10.10.2023</span>
              <Button size="sm" color="danger">
                Wyloguj
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span>MacBook Pro (macOS) - Ostatnie logowanie: 09.10.2023</span>
              <Button size="sm" color="danger">
                Wyloguj
              </Button>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="warning" className="w-full">
            Wyloguj ze wszystkich urządzeń
          </Button>
        </CardFooter>
      </Card>

      {/* Powiadomienia o nowych logowaniach */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Powiadomienia o Nowych Logowaniach
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Włącz powiadomienia o logowaniach z nowych urządzeń
          </Switch>
          <p className="text-sm text-gray-600">
            Otrzymuj powiadomienia o logowaniach z nieznanych urządzeń i
            potencjalnie podejrzanej aktywności.
          </p>
        </CardBody>
      </Card>

      {/* Szybkie połączenie z urządzeniami audio i wideo */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Szybkie Połączenie z Urządzeniami Audio i Wideo
        </CardHeader>
        <CardBody className="space-y-4">
          <Select label="Domyślny mikrofon" className="w-full">
            <SelectItem key="mic1">Mikrofon 1</SelectItem>
            <SelectItem key="mic2">Mikrofon 2</SelectItem>
          </Select>
          <Select label="Domyślne głośniki" className="w-full">
            <SelectItem key="speaker1">Głośniki 1</SelectItem>
            <SelectItem key="speaker2">Głośniki 2</SelectItem>
          </Select>
          <Select label="Domyślna kamera" className="w-full">
            <SelectItem key="camera1">Kamera 1</SelectItem>
            <SelectItem key="camera2">Kamera 2</SelectItem>
          </Select>
          <Button className="mt-4">Przetestuj wybrane urządzenia</Button>
        </CardBody>
      </Card>

      {/* Synchronizacja urządzeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Synchronizacja Urządzeń
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Włącz synchronizację ustawień aplikacji
          </Switch>
          <Select label="Wybierz synchronizowane ustawienia" className="w-full">
            <SelectItem key="audio">Preferencje audio</SelectItem>
            <SelectItem key="notifications">Powiadomienia</SelectItem>
            <SelectItem key="all">Wszystkie ustawienia</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Kontrola dostępu do aplikacji na urządzeniach mobilnych */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Kontrola Dostępu na Urządzeniach Mobilnych
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch>Włącz dodatkowe uwierzytelnianie (PIN, odcisk palca)</Switch>
          <Select label="Metoda uwierzytelniania" className="w-full">
            <SelectItem key="pin">Kod PIN</SelectItem>
            <SelectItem key="fingerprint">Odcisk palca</SelectItem>
            <SelectItem key="face">Rozpoznawanie twarzy</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Autoryzacja nowych urządzeń */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Autoryzacja Nowych Urządzeń
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Wymagaj autoryzacji dla nowych urządzeń
          </Switch>
          <p className="text-sm text-gray-600">
            Wymagaj potwierdzenia przy logowaniu na nowych urządzeniach za
            pomocą kodu wysłanego na e-mail.
          </p>
          {/* Przykładowa historia autoryzacji */}
          <div className="space-y-2">
            <p className="text-md font-medium">Historia autoryzacji:</p>
            <div className="flex justify-between items-center">
              <span>Windows PC - Autoryzowano 05.10.2023</span>
              <Button size="sm" color="danger">
                Usuń
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span>Android Tablet - Autoryzowano 12.09.2023</span>
              <Button size="sm" color="danger">
                Usuń
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default DevicesSettings;
