import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider, Button } from "@nextui-org/react";

function TextAndImagesSettings() {
  return (
    <div className="space-y-6 p-6">
      {/* Wyświetlanie obrazów i multimediów */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Wyświetlanie obrazów i multimediów
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Automatyczne ładowanie obrazów i multimediów
          </Switch>
          <Switch defaultSelected>Wyświetlaj podglądy linków w czacie</Switch>
        </CardBody>
      </Card>

      {/* Filtry treści */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Filtry treści</CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Ukryj wrażliwe treści</Switch>
          <Select
            label="Ustawienia filtru dla wybranych kontaktów"
            className="w-full"
          >
            <SelectItem key="allow">Pozwól na wszystkie treści</SelectItem>
            <SelectItem key="filter">Włącz filtr</SelectItem>
            <SelectItem key="manual">Ręczne oznaczanie treści</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Ustawienia emoji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Ustawienia emoji
        </CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz styl emoji" className="w-full">
            <SelectItem key="standard">Standardowe</SelectItem>
            <SelectItem key="animated">Animowane</SelectItem>
          </Select>
          <Switch defaultSelected>
            Automatycznie zamieniaj tekst na emoji
          </Switch>
        </CardBody>
      </Card>

      {/* Rozmiar tekstu w czacie */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Rozmiar tekstu w czacie
        </CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz rozmiar tekstu" className="w-full">
            <SelectItem key="small">Mały</SelectItem>
            <SelectItem key="medium">Średni</SelectItem>
            <SelectItem key="large">Duży</SelectItem>
          </Select>
          <Slider
            step={1}
            minValue={12}
            maxValue={24}
            defaultValue={16}
            aria-label="Dostosuj rozmiar tekstu"
            showTooltip
            className="max-w-md"
          />
          <Switch defaultSelected>
            Dynamiczne powiększenie tekstu po kliknięciu
          </Switch>
        </CardBody>
      </Card>

      {/* Wyświetlanie formatowania tekstu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Wyświetlanie formatowania tekstu
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Wyświetlaj tekst sformatowany</Switch>
          <Switch>Wyłącz formatowanie tekstu</Switch>
        </CardBody>
      </Card>

      {/* Linki i hiperłącza */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Linki i hiperłącza
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Automatycznie wykrywaj i podkreślaj linki
          </Switch>
          <Switch defaultSelected>Otwieraj linki w trybie podglądu</Switch>
        </CardBody>
      </Card>

      {/* Animacje obrazów (GIF-y) */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Animacje obrazów (GIF-y)
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Odtwarzaj GIF-y automatycznie</Switch>
          <Select
            label="Dostosuj możliwość wysyłania GIF-ów"
            className="w-full"
          >
            <SelectItem key="all">Pozwól wszystkim</SelectItem>
            <SelectItem key="selected">Tylko wybrani użytkownicy</SelectItem>
            <SelectItem key="none">Nie pozwalaj na GIF-y</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Przechowywanie obrazów */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Przechowywanie obrazów
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Automatycznie zapisuj otrzymane multimedia
          </Switch>
          <Select label="Czas przechowywania multimediów" className="w-full">
            <SelectItem key="manual">Do ręcznego usunięcia</SelectItem>
            <SelectItem key="7days">Przechowuj przez 7 dni</SelectItem>
            <SelectItem key="30days">Przechowuj przez 30 dni</SelectItem>
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

export default TextAndImagesSettings;
