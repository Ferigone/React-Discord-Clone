import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/react";

function LanguageSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Wybór języka aplikacji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Wybór Języka Aplikacji</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz język" className="w-full">
            <SelectItem key="en">Angielski</SelectItem>
            <SelectItem key="pl">Polski</SelectItem>
            <SelectItem key="es">Hiszpański</SelectItem>
            <SelectItem key="fr">Francuski</SelectItem>
            <SelectItem key="de">Niemiecki</SelectItem>
          </Select>
          <Switch defaultSelected>Ustaw język zgodnie z preferencjami systemowymi</Switch>
        </CardBody>
      </Card>

      {/* Tłumaczenie wiadomości */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Tłumaczenie Wiadomości</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz automatyczne tłumaczenie wiadomości</Switch>
          <Switch>Ręczne tłumaczenie wiadomości</Switch>
          <p className="text-sm text-gray-600">
            Kliknij „Przetłumacz” na wiadomości, aby przetłumaczyć ją na język aplikacji.
          </p>
        </CardBody>
      </Card>

      {/* Ustawienia regionalne */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Ustawienia Regionalne</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Format daty i godziny" className="w-full">
            <SelectItem key="24h">24-godzinny</SelectItem>
            <SelectItem key="12h">12-godzinny</SelectItem>
          </Select>
          <Select label="Waluta" className="w-full">
            <SelectItem key="usd">USD - Dolar amerykański</SelectItem>
            <SelectItem key="eur">EUR - Euro</SelectItem>
            <SelectItem key="pln">PLN - Złoty polski</SelectItem>
          </Select>
          <Select label="Jednostki miary" className="w-full">
            <SelectItem key="metric">Metryczne</SelectItem>
            <SelectItem key="imperial">Imperialne</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Automatyczna transliteracja */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Automatyczna Transliteracja</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz automatyczną transliterację</Switch>
          <p className="text-sm text-gray-600">
            Transliteracja może być przydatna w komunikacji między różnymi alfabetami.
          </p>
        </CardBody>
      </Card>

      {/* Spersonalizowane sugestie językowe */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Spersonalizowane Sugestie Językowe</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Wyświetlaj sugestie tłumaczeń i zmiany języka</Switch>
          <p className="text-sm text-gray-600">
            Sugestie językowe będą wyświetlane na podstawie najczęściej używanych języków.
          </p>
        </CardBody>
      </Card>

      {/* Zapisz język na urządzeniu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Zapisz Język na Urządzeniu</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Zapisz język tylko na tym urządzeniu</Switch>
          <Switch>Zsynchronizuj język na wszystkich urządzeniach</Switch>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default LanguageSettings;
