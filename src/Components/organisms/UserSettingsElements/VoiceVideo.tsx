import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider, Button } from "@nextui-org/react";

function VoiceAndVideoSettings() {
  return (
    <div className="space-y-6 p-6">
      {/* Wybór urządzeń audio i wideo */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Wybór urządzeń audio i wideo
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
          <Button className="mt-4">
            Przetestuj wybrane urządzenia
          </Button>
        </CardBody>
      </Card>

      {/* Jakość dźwięku i obrazu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Jakość dźwięku i obrazu
        </CardHeader>
        <CardBody className="space-y-4">
          <Select label="Jakość dźwięku" className="w-full">
            <SelectItem key="low">Niska</SelectItem>
            <SelectItem key="medium">Średnia</SelectItem>
            <SelectItem key="high">Wysoka</SelectItem>
          </Select>
          <Select label="Jakość obrazu" className="w-full">
            <SelectItem key="480p">480p</SelectItem>
            <SelectItem key="720p">720p</SelectItem>
            <SelectItem key="1080p">1080p</SelectItem>
          </Select>
          <Slider
            step={1}
            minValue={15}
            maxValue={60}
            defaultValue={30}
            aria-label="Liczba klatek na sekundę"
            showTooltip
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Redukcja szumów i echa */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Redukcja szumów i echa
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Redukcja szumów w tle</Switch>
          <Switch defaultSelected>Tłumienie echa</Switch>
        </CardBody>
      </Card>

      {/* Automatyczna regulacja głośności mikrofonu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Automatyczna regulacja głośności mikrofonu
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Automatyczna regulacja głośności</Switch>
          <Slider
            step={1}
            minValue={0}
            maxValue={100}
            defaultValue={50}
            aria-label="Ręczna regulacja czułości mikrofonu"
            showTooltip
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Push-to-talk */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Push-to-talk</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz "Push-to-talk"</Switch>
          <Select label="Wybierz klawisz dla Push-to-talk" className="w-full">
            <SelectItem key="ctrl">Ctrl</SelectItem>
            <SelectItem key="shift">Shift</SelectItem>
            <SelectItem key="alt">Alt</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Tło wideo */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Tło wideo</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Rozmycie tła</Switch>
          <Select label="Wybierz wirtualne tło" className="w-full">
            <SelectItem key="background1">Tło 1</SelectItem>
            <SelectItem key="background2">Tło 2</SelectItem>
            <SelectItem key="custom">Dodaj własne tło</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Automatyczne wyciszanie i wyłączanie kamery */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Automatyczne wyciszanie i wyłączanie kamery
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Automatyczne wyciszenie mikrofonu przy dołączaniu
          </Switch>
          <Switch defaultSelected>
            Automatyczne wyłączenie kamery przy dołączaniu
          </Switch>
          <Switch>
            Wycisz dźwięk i wyłącz wideo przy niskim poziomie baterii
          </Switch>
        </CardBody>
      </Card>

      {/* Powiadomienia dźwiękowe i wizualne */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Powiadomienia dźwiękowe i wizualne
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Powiadomienia o dołączeniu/opuszczeniu rozmowy
          </Switch>
          <Switch defaultSelected>Wycisz powiadomienia podczas rozmowy</Switch>
        </CardBody>
      </Card>

      {/* Test połączenia */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Test połączenia
        </CardHeader>
        <CardBody className="space-y-4">
          <Button>Przetestuj jakość połączenia</Button>
          <p className="text-sm text-gray-600">
            Sprawdź stabilność połączenia i otrzymaj sugestie dotyczące poprawy
            jakości rozmowy.
          </p>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default VoiceAndVideoSettings;
