import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider, Button } from "@nextui-org/react";

function AccessibilitySettings() {
  return (
    <div className="space-y-6 p-6">
      {/* Rozmiar tekstu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Rozmiar tekstu
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
        </CardBody>
      </Card>

      {/* Wysoki kontrast */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Wysoki kontrast
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Tryb wysokiego kontrastu</Switch>
          <Select label="Wybierz motyw kontrastowy" className="w-full">
            <SelectItem key="dark-on-light">
              Ciemny tekst na jasnym tle
            </SelectItem>
            <SelectItem key="light-on-dark">
              Jasny tekst na ciemnym tle
            </SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Narrator tekstu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Narrator tekstu
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz syntezator mowy</Switch>
          <Select label="Prędkość narratora" className="w-full">
            <SelectItem key="slow">Wolno</SelectItem>
            <SelectItem key="normal">Normalnie</SelectItem>
            <SelectItem key="fast">Szybko</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Napisy w czasie rzeczywistym */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Napisy w czasie rzeczywistym
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Włącz napisy do rozmów wideo/głosowych
          </Switch>
          <Select label="Rozmiar czcionki napisów" className="w-full">
            <SelectItem key="small">Mały</SelectItem>
            <SelectItem key="medium">Średni</SelectItem>
            <SelectItem key="large">Duży</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Redukcja animacji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Redukcja animacji
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Ogranicz animacje interfejsu</Switch>
          <Select label="Dostosuj animacje" className="w-full">
            <SelectItem key="off">Wyłącz animacje</SelectItem>
            <SelectItem key="slow">Spowolnij animacje</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Tryb dużych przycisków */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Tryb dużych przycisków
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>Włącz duże przyciski</Switch>
        </CardBody>
      </Card>

      {/* Automatyczne powiększenie */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">
          Automatyczne powiększenie
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch defaultSelected>
            Włącz automatyczne powiększenie elementów
          </Switch>
          <Slider
            step={0.1}
            minValue={1}
            maxValue={3}
            defaultValue={1.5}
            aria-label="Poziom powiększenia"
            showTooltip
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default AccessibilitySettings;
