import { 
  Card, CardHeader, CardBody, Button, Avatar, Input, 
  Switch, Table, TableHeader, TableBody, TableRow, TableCell, 
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, 
  TableColumn
} from "@nextui-org/react";

export default function SettingsTab() {
  const logins = [
    { date: "2024-01-01", location: "New York, USA", device: "Chrome" },
    { date: "2024-01-02", location: "London, UK", device: "Safari" },
    { date: "2024-01-03", location: "Warsaw, Poland", device: "Firefox" },
  ];

  return (
    <div className="space-y-6">
      {/* Informacje o koncie */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar src="path_to_profile_image.jpg" size="lg" />
            <div>
              <p>Nazwa Użytkownika</p>
              <Input placeholder="Zmień nazwę użytkownika" />
            </div>
          </div>
          <Button variant="flat">Edytuj</Button>
        </CardHeader>
        <CardBody>
          <p>Email: user@example.com</p>
          <p>Status konta: Aktywne</p>
          <p>Data rejestracji: 01/01/2022</p>
        </CardBody>
      </Card>

      {/* Zmień hasło */}
      <Card>
        <CardHeader>
          <h3>Zmień Hasło</h3>
        </CardHeader>
        <CardBody>
          <Input type="password" label="Aktualne Hasło" />
          <Input type="password" label="Nowe Hasło" />
          <Input type="password" label="Potwierdź Nowe Hasło" />
          <p>Hasło powinno mieć co najmniej 8 znaków, zawierać cyfry oraz znaki specjalne.</p>
          <Button variant="flat" className="mt-4">Zaktualizuj Hasło</Button>
        </CardBody>
      </Card>

      {/* Dwuetapowa weryfikacja */}
      <Card>
        <CardBody>
          <h3>Dwuetapowa Weryfikacja (2FA)</h3>
          <Switch title="Włącz 2FA" />
          <p>2FA dodaje dodatkową warstwę bezpieczeństwa, wymagając drugiego sposobu weryfikacji.</p>
        </CardBody>
      </Card>

      {/* Aktywność logowania */}
      <Card>
        <CardHeader>
          <h3>Aktywność Logowania</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Aktywność Logowania">
            <TableHeader>
                <TableColumn>Data</TableColumn>
                <TableColumn>Lokalizacja</TableColumn>
                <TableColumn>Urządzenie</TableColumn>
            </TableHeader>
            <TableBody>
              {logins.map((login, index) => (
                <TableRow key={index}>
                  <TableCell>{login.date}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell>{login.device}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="flat" className="mt-4">Wyloguj ze wszystkich urządzeń</Button>
        </CardBody>
      </Card>

      {/* Usunięcie konta */}
      <Card>
        <CardHeader>
          <h3>Usuń Konto</h3>
          <p>Usunięcie konta jest trwałe i nieodwracalne.</p>
        </CardHeader>
        <CardBody>
          <Button variant="flat">Usuń Konto</Button>
          <Button variant="flat" className="ml-4">Dezaktywuj Konto</Button>
        </CardBody>
      </Card>

      {/* Powiązane konta */}
      <Card>
        <CardHeader>
          <h3>Powiązane Konta</h3>
        </CardHeader>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Zarządzaj Powiązanymi Kontami</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Powiązane Konta">
              <DropdownItem key="google">Konto Google</DropdownItem>
              <DropdownItem key="facebook">Konto Facebook</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
    </div>
  );
}
