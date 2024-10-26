import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Input } from "@nextui-org/react";

function ProfileSettings() {
  return (
    <div className="space-y-6 p-6">
      
      {/* Edytuj profil */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Edytuj Profil</CardHeader>
        <CardBody className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zdjęcie profilowe</label>
            <Input type="file" accept="image/*" className="w-full" />
          </div>
          <Input label="Wyświetlana nazwa" placeholder="Twoja nazwa" className="w-full" />
          <Input label="Opis / Status" placeholder="Twoje motto lub stan" className="w-full" />
        </CardBody>
      </Card>

      {/* Dostosowanie statusu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dostosowanie Statusu</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Status" className="w-full">
            <SelectItem key="available">Dostępny</SelectItem>
            <SelectItem key="invisible">Niewidoczny</SelectItem>
            <SelectItem key="busy">Zajęty</SelectItem>
            <SelectItem key="offline">Offline</SelectItem>
          </Select>
          <Input label="Status tekstowy" placeholder="Napisz status" className="w-full" />
        </CardBody>
      </Card>

      {/* Kolor profilu i motywy */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Kolor Profilu i Motywy</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Wybierz kolor akcentu" className="w-full">
            <SelectItem key="blue">Niebieski</SelectItem>
            <SelectItem key="green">Zielony</SelectItem>
            <SelectItem key="red">Czerwony</SelectItem>
            <SelectItem key="custom">Niestandardowy...</SelectItem>
          </Select>
          <Switch>Dodaj niestandardowy motyw lub tło</Switch>
        </CardBody>
      </Card>

      {/* Ustawienia prywatności profilu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Ustawienia Prywatności Profilu</CardHeader>
        <CardBody className="space-y-4">
          <Select label="Widoczność profilu" className="w-full">
            <SelectItem key="public">Publiczny</SelectItem>
            <SelectItem key="friendsOnly">Widoczny tylko dla znajomych</SelectItem>
            <SelectItem key="private">Prywatny</SelectItem>
          </Select>
          <Switch>Blokuj, kto może widzieć zdjęcie profilowe</Switch>
        </CardBody>
      </Card>

      {/* Znajomi i lista blokad */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Znajomi i Lista Blokad</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <p className="text-md font-medium">Lista znajomych:</p>
            <div className="flex justify-between items-center">
              <span>Jan Kowalski</span>
              <div className="space-x-2">
                <Button size="sm">Usuń</Button>
                <Button size="sm" color="warning">Ukryj</Button>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-md font-medium">Zablokowani użytkownicy:</p>
            <div className="flex justify-between items-center">
              <span>Anna Nowak</span>
              <Button size="sm" color="danger">Odblokuj</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Dostosowanie powiadomień profilu */}
      <Card shadow="sm" className="w-full">
        <CardHeader className="text-lg font-semibold">Dostosowanie Powiadomień Profilu</CardHeader>
        <CardBody className="space-y-4">
          <Switch>Powiadomienia o interakcjach z profilem (np. kto oglądał profil)</Switch>
          <Switch>Ukryj informacje o widoczności aktywności</Switch>
        </CardBody>
      </Card>

      {/* Przycisk zapisu */}
      <Button color="primary" className="mt-6 w-full md:w-auto self-center">
        Zapisz ustawienia
      </Button>
    </div>
  );
}

export default ProfileSettings;
