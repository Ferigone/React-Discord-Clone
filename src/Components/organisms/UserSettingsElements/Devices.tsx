import React from "react";

const Devices = () => {
  return (
    <div>
      Zarządzanie urządzeniami: Lista urządzeń, na których użytkownik jest
      zalogowany (nazwa urządzenia, system operacyjny, data ostatniego
      logowania). Opcja „Wyloguj ze wszystkich urządzeń” dla szybkiego
      wylogowania się z każdego miejsca poza bieżącym urządzeniem. Powiadomienia
      o nowych logowaniach: Możliwość włączenia powiadomień o nowych logowaniach
      z nieznanych urządzeń. Informacje o potencjalnie podejrzanej aktywności i
      opcja natychmiastowego zablokowania dostępu. Szybkie połączenie z
      urządzeniami audio i wideo: Ustawienia domyślnego mikrofonu, głośników i
      kamery dla rozmów głosowych/wideo. Możliwość testowania wybranych urządzeń
      audio/wideo bez konieczności rozpoczęcia rozmowy. Synchronizacja urządzeń:
      Opcje synchronizacji ustawień aplikacji między urządzeniami, aby zmiany
      wprowadzone na jednym były dostępne na wszystkich. Możliwość wyboru, które
      ustawienia są synchronizowane (np. preferencje audio, powiadomienia).
      Kontrola dostępu do aplikacji na urządzeniach mobilnych: Opcje logowania
      na urządzeniach mobilnych (np. kod PIN, odcisk palca, rozpoznawanie
      twarzy). Wybór, czy aplikacja wymaga dodatkowego uwierzytelnienia przy
      uruchamianiu na urządzeniach mobilnych. Autoryzacja nowych urządzeń: Opcja
      wymogu dodatkowego potwierdzenia, gdy konto jest logowane na nowym
      urządzeniu (np. kod wysłany na e-mail). Historia autoryzacji urządzeń z
      możliwością usunięcia starych lub podejrzanych.
    </div>
  );
};

export default Devices;
