import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Button, Input, Textarea } from "@nextui-org/react";

function BetaSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Dołącz do programu Beta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dołącz do Programu Beta</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Zapisz się do programu beta</Switch>
          <p className="text-sm text-gray-600">
            Dołączając do programu beta, możesz testować nowe funkcje przed ich oficjalnym wydaniem.
            Wersje beta mogą zawierać błędy i być niestabilne.
          </p>
        </CardBody>
      </Card>

      {/* Zgłaszanie opinii i błędów */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Zgłaszanie Opinii i Błędów</CardHeader>
        <CardBody className="space-y-4">
          <Textarea label="Twoja opinia lub zgłoszenie błędu" placeholder="Opisz swoje doświadczenia..." className="w-full" />
          <Button color="primary">Wyślij opinię</Button>
          <p className="text-sm text-gray-600">
            Pomóż nam ulepszyć aplikację, dzieląc się swoimi opiniami lub zgłaszając problemy.
          </p>
        </CardBody>
      </Card>

      {/* Podgląd nadchodzących funkcji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Podgląd Nadchodzących Funkcji</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Funkcja: Tryb ciemny 2.0</p>
            <p className="text-sm text-gray-600">Nowa wersja trybu ciemnego z dodatkowymi opcjami personalizacji.</p>
            <Switch>Aktywuj tryb ciemny 2.0</Switch>
          </div>
          <div className="space-y-2 mt-4">
            <p className="font-medium">Funkcja: Rozszerzona historia powiadomień</p>
            <p className="text-sm text-gray-600">Możliwość przeglądania historii powiadomień w jednym miejscu.</p>
            <Switch>Aktywuj rozszerzoną historię powiadomień</Switch>
          </div>
        </CardBody>
      </Card>

      {/* Historia zmian i notatki do wersji Beta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Historia Zmian i Notatki do Wersji Beta</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Wersja 1.2.0-beta</p>
            <p className="text-sm text-gray-600">- Dodano nową opcję trybu ciemnego 2.0</p>
            <p className="text-sm text-gray-600">- Poprawiono stabilność połączeń audio</p>
            <p className="text-sm text-gray-600">Znane problemy: Drobnym błędem jest znikająca ikona w menu.</p>
          </div>
        </CardBody>
      </Card>

      {/* Automatyczne aktualizacje wersji Beta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Automatyczne Aktualizacje Wersji Beta</CardHeader>
        <CardBody className="space-y-4">
          <Switch>Włącz automatyczne aktualizacje wersji beta</Switch>
          <Switch>Powiadomienia o nowych aktualizacjach wersji beta</Switch>
        </CardBody>
      </Card>

      {/* Powrót do stabilnej wersji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Powrót do Stabilnej Wersji</CardHeader>
        <CardBody className="space-y-4">
          <p className="text-sm text-gray-600">
            Jeśli napotykasz problemy w wersji beta, możesz wrócić do stabilnej wersji aplikacji. Uwaga: niektóre ustawienia mogą zostać zresetowane.
          </p>
          <Button color="warning">Powrót do stabilnej wersji</Button>
        </CardBody>
      </Card>

      {/* Oświadczenie dotyczące wersji Beta */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Oświadczenie dotyczące Wersji Beta</CardHeader>
        <CardBody className="space-y-4">
          <p className="text-sm text-gray-600">
            Wersja beta aplikacji jest przeznaczona wyłącznie do testowania i może zawierać błędy. Udział w programie beta może być czasowo ograniczony w zależności od rozwoju aplikacji.
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

export default BetaSettings;
