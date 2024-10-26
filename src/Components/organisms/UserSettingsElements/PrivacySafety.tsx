import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Switch } from '@nextui-org/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from '@nextui-org/table';
import { Button, Input } from '@nextui-org/react';

export default function SettingsPrivacy() {
  return (
    <div className="privacy-settings-container">
      {/* Profile Visibility Control */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Kontrola Widoczności Profilu</h3>
        </CardHeader>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Kto może zobaczyć profil</Button>
            </DropdownTrigger>
            <DropdownMenu aria-title="Widoczność profilu">
              <DropdownItem key="all">Wszyscy</DropdownItem>
              <DropdownItem key="friends">Znajomi</DropdownItem>
              <DropdownItem key="nobody">Nikt</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="flex flex-col mt-4">
            <Switch title="Ukryj status online" />
            <Switch title="Ukryj ostatnie logowanie" className="mt-2" />
            <Switch title="Ukryj lokalizację" className="mt-2" />
          </div>
        </CardBody>
      </Card>

      {/* Blocking & User Management */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Blokowanie i Zarządzanie Użytkownikami</h3>
        </CardHeader>
        <CardBody>
          <Table aria-title="Blocked Users">
            <TableHeader>
              <TableColumn>Nick</TableColumn>
              <TableColumn>Akcja</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Replace these rows with dynamic data */}
              <TableRow key="1">
                <TableCell>BlockedUser1</TableCell>
                <TableCell>
                  <Button variant="flat" size="sm">Usuń blokadę</Button>
                  <Button variant="flat" size="sm" className="ml-2">Wycisz</Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>BlockedUser2</TableCell>
                <TableCell>
                  <Button variant="flat" size="sm">Usuń blokadę</Button>
                  <Button variant="flat" size="sm" className="ml-2">Wycisz</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Input placeholder="Dodaj użytkownika do blokady" className="mt-4" />
        </CardBody>
      </Card>

      {/* Message Security */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Bezpieczeństwo Wiadomości</h3>
        </CardHeader>
        <CardBody>
          <Switch title="Filtruj wiadomości od nieznajomych" />
          <Switch title="Ukryj obrazy i linki zewnętrzne" className="mt-2" />
          <Switch title="Ostrzegaj przed nieznanymi linkami" className="mt-2" />
        </CardBody>
      </Card>

      {/* Invitation Management */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Zarządzanie Zaproszeniami</h3>
        </CardHeader>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Kto może wysyłać zaproszenia</Button>
            </DropdownTrigger>
            <DropdownMenu aria-title="Opcje zaproszeń">
              <DropdownItem key="everyone">Wszyscy</DropdownItem>
              <DropdownItem key="friendsOfFriends">Tylko znajomi znajomych</DropdownItem>
              <DropdownItem key="nobody">Nikt</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Switch title="Wyłącz zaproszenia od nieznajomych" className="mt-4" />
        </CardBody>
      </Card>

      {/* Suspicious Activity Notifications */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Powiadomienia o Podejrzanej Aktywności</h3>
        </CardHeader>
        <CardBody>
          <Switch title="Powiadomienia o nieznanych logowaniach" />
          <Switch title="Powiadomienia o zmianie hasła" className="mt-2" />
        </CardBody>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Dwuetapowe Uwierzytelnianie (2FA)</h3>
        </CardHeader>
        <CardBody>
          <Switch title="Włącz 2FA" />
          <Dropdown className="mt-4">
            <DropdownTrigger>
              <Button variant="bordered">Metoda Autoryzacji</Button>
            </DropdownTrigger>
            <DropdownMenu aria-title="Metody 2FA">
              <DropdownItem key="app">Aplikacja Mobilna</DropdownItem>
              <DropdownItem key="sms">SMS</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>

      {/* Data Access Control */}
      <Card>
        <CardHeader>
          <h3>Kontrola Dostępu do Danych</h3>
        </CardHeader>
        <CardBody>
          <Switch title="Zezwalaj na zbieranie danych użytkownika" />
          <Button variant="bordered" className="mt-4">Przeglądaj zgromadzone dane</Button>
          <Button variant="flat" color="danger" className="mt-2">Usuń zgromadzone dane</Button>
        </CardBody>
      </Card>
    </div>
  );
}
