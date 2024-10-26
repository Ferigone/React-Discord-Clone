import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider, Button } from "@nextui-org/react";

function AppearanceSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Motyw aplikacji */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Motyw Aplikacji</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz motyw" className="w-full">
            <SelectItem key="light">Jasny</SelectItem>
            <SelectItem key="dark">Ciemny</SelectItem>
            <SelectItem key="system">Automatyczny (dopasowany do systemu)</SelectItem>
          </Select>
          <Switch>Włącz niestandardowy motyw kolorystyczny</Switch>
        </CardBody>
      </Card>

      {/* Kolor akcentu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Kolor Akcentu</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz kolor akcentu" className="w-full">
            <SelectItem key="blue">Niebieski</SelectItem>
            <SelectItem key="green">Zielony</SelectItem>
            <SelectItem key="red">Czerwony</SelectItem>
            <SelectItem key="custom">Niestandardowy...</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Personalizacja interfejsu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Personalizacja Interfejsu</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Rozmiar tekstu" className="w-full">
            <SelectItem key="standard">Standardowy</SelectItem>
            <SelectItem key="medium">Średni</SelectItem>
            <SelectItem key="large">Duży</SelectItem>
          </Select>
          <Select label="Rodzaj czcionki" className="w-full">
            <SelectItem key="sans">Sans-serif</SelectItem>
            <SelectItem key="serif">Serif</SelectItem>
            <SelectItem key="mono">Monospace</SelectItem>
          </Select>
          <Select label="Układ interfejsu" className="w-full">
            <SelectItem key="default">Domyślny</SelectItem>
            <SelectItem key="compact">Zwarty</SelectItem>
            <SelectItem key="expanded">Rozszerzony</SelectItem>
          </Select>
        </CardBody>
      </Card>

      {/* Animacje i przejścia */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Animacje i Przejścia</CardHeader>
        <CardBody className="space-y-4">
          <Switch>Włącz animacje interfejsu</Switch>
          <Slider
            step={0.1}
            minValue={0.5}
            maxValue={2.0}
            defaultValue={1.0}
            aria-label="Szybkość animacji"
            showTooltip
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Przezroczystość okna */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Przezroczystość Okna</CardHeader>
        <CardBody className="space-y-4">
          <Slider
            step={0.1}
            minValue={0}
            maxValue={1}
            defaultValue={1}
            aria-label="Ustaw przezroczystość okna"
            showTooltip
            className="max-w-md"
          />
          <Switch>Wyłącz przezroczystość</Switch>
        </CardBody>
      </Card>

      {/* Resetowanie ustawień wyglądu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Resetowanie Ustawień Wyglądu</CardHeader>
        <CardBody className="space-y-4">
          <Button color="danger" className="w-full">Przywróć domyślny wygląd</Button>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default AppearanceSettings;
