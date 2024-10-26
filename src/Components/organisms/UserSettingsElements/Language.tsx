import React from "react";

const Language = () => {
  return (
    <div>
      Wybór języka aplikacji: Lista dostępnych języków z możliwością ich zmiany
      na wybrany język interfejsu. Opcja automatycznego ustawienia języka
      zgodnie z preferencjami systemowymi. Tłumaczenie wiadomości: Opcja
      włączenia funkcji tłumaczenia wiadomości w czasie rzeczywistym. Możliwość
      ręcznego tłumaczenia wiadomości na język aplikacji (np. kliknięcie opcji
      „Przetłumacz”). Ustawienia regionalne: Format daty i godziny dostosowany
      do regionu (np. 24-godzinny lub 12-godzinny zegar). Opcja ustawienia
      waluty, jednostek miary (metryczne/imperialne), i innych specyficznych
      ustawień regionalnych, jeśli aplikacja tego wymaga. Automatyczna
      transliteracja (jeśli przewidziane): Opcja włączenia transliteracji dla
      wiadomości napisanych w alfabecie innym niż domyślny język użytkownika.
      Przydatne dla użytkowników komunikujących się w językach z różnymi
      alfabetami. Spersonalizowane sugestie językowe: Opcja wyświetlania
      powiadomień z sugestiami tłumaczeń lub zapytaniami, czy użytkownik chce
      zmienić język na ten, którego najczęściej używa w wiadomościach. Możliwość
      włączenia/wyłączenia tych sugestii. Zapisz język na urządzeniu: Opcja
      zapisu wybranego języka tylko na bieżącym urządzeniu lub synchronizacji
      języka na wszystkich urządzeniach powiązanych z kontem.
    </div>
  );
};

export default Language;
