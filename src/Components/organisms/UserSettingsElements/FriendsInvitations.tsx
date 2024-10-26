import React from "react";

const FriendsInvitations = () => {
  return (
    <div>
      Zarządzanie zaproszeniami: Lista otrzymanych zaproszeń do znajomych z
      opcjami akceptacji, odrzucenia lub zablokowania nadawcy. Możliwość
      podglądu wspólnych znajomych z osobą wysyłającą zaproszenie (jeśli
      istnieją). Ustawienia przyjmowania zaproszeń: Opcja wyboru, kto może
      wysyłać zaproszenia do znajomych: wszyscy, znajomi znajomych lub tylko
      osoby z kontaktów użytkownika. Możliwość wyłączenia zaproszeń od osób
      spoza kontaktów lub użytkowników nieznajomych. Historia zaproszeń:
      Przegląd historii wysłanych zaproszeń z informacją, czy zostały
      zaakceptowane, odrzucone lub pozostają bez odpowiedzi. Możliwość ponownego
      wysłania zaproszenia lub wycofania go, jeśli jest w oczekujących.
      Automatyczne akceptowanie zaproszeń: Opcja automatycznego akceptowania
      zaproszeń od znajomych znajomych (opcjonalnie). Możliwość tworzenia listy
      zaufanych kontaktów, od których zaproszenia są automatycznie akceptowane.
      Filtrowanie i blokowanie zaproszeń: Opcja filtrowania zaproszeń, aby
      ukrywać potencjalnie niechciane zaproszenia (np. od nowo zarejestrowanych
      kont). Możliwość ustawienia automatycznego blokowania zaproszeń od kont,
      które zostały zgłoszone lub oznaczone jako spamerskie. Powiadomienia o
      nowych zaproszeniach: Włączenie/wyłączenie powiadomień o nowych
      zaproszeniach. Opcje powiadomień, np. powiadomienia na ekranie lub
      e-mailem, gdy pojawi się nowe zaproszenie.
    </div>
  );
};

export default FriendsInvitations;
