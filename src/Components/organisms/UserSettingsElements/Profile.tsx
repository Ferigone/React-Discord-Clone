import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Button, Switch } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from '@nextui-org/table';

export default function SettingsTab() {
  return (
    <div className="settings-tab-container">
      {/* Profile Editing Section */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Edytuj Profil</h3>
        </CardHeader>
        <CardBody>
          <Input label="Wyświetlana Nazwa" placeholder="Twoja nazwa" className="mb-4" />
          <Input
            label="Opis/Status"
            placeholder="Twoje motto lub obecny stan"
            className="mb-4"
          />
          <div className="flex items-center mb-4">
            <span className="mr-2">Status:</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Wybierz status</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Status">
                <DropdownItem key="online">Dostępny</DropdownItem>
                <DropdownItem key="invisible">Niewidoczny</DropdownItem>
                <DropdownItem key="busy">Zajęty</DropdownItem>
                <DropdownItem key="offline">Offline</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Input
            label="Status Tekstowy"
            placeholder="Tekst widoczny dla znajomych"
          />
        </CardBody>
      </Card>

      {/* Profile Color & Theme Section */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Kolor Profilu i Motywy</h3>
        </CardHeader>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Wybierz kolor akcentu</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Kolor akcentu">
              <DropdownItem key="default">Domyślny</DropdownItem>
              <DropdownItem key="dark">Ciemny</DropdownItem>
              <DropdownItem key="light">Jasny</DropdownItem>
              <DropdownItem key="custom">Niestandardowy</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p className="text-sm mt-4">Motyw lub tło profilu (jeśli przewidziane)</p>
        </CardBody>
      </Card>

      {/* Privacy Settings Section */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Ustawienia Prywatności Profilu</h3>
        </CardHeader>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Widoczność profilu</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Widoczność">
              <DropdownItem key="public">Publiczny</DropdownItem>
              <DropdownItem key="friends">Tylko znajomi</DropdownItem>
              <DropdownItem key="private">Prywatny</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="flex items-center mt-4">
            <span className="mr-2">Kto może widzieć zdjęcie profilowe:</span>
            <Switch />
          </div>
        </CardBody>
      </Card>

      {/* Friends & Block List Section */}
      <Card className="mb-6">
        <CardHeader>
          <h3>Znajomi i Lista Blokad</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Friends List">
            <TableHeader>
              <TableColumn>Nick</TableColumn>
              <TableColumn>Akcja</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Replace the rows below with dynamic content */}
              <TableRow key="1">
                <TableCell>Friend 1</TableCell>
                <TableCell>
                  <Button variant="flat" size="sm">Usuń</Button>
                  <Button variant="flat" size="sm">Ukryj</Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Friend 2</TableCell>
                <TableCell>
                  <Button variant="flat" size="sm">Usuń</Button>
                  <Button variant="flat" size="sm">Ukryj</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Notification Settings Section */}
      <Card>
        <CardHeader>
          <h3>Dostosowanie Powiadomień</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center">
            <span className="mr-2">Powiadomienia o interakcjach z profilem:</span>
            <Switch />
          </div>
          <p className="text-sm mt-4">Ustawienia prywatności dotyczące widoczności aktywności</p>
        </CardBody>
      </Card>
    </div>
  );
}
