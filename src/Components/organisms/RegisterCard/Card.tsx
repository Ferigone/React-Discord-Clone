import React, { FormEventHandler, useState, useEffect } from "react";
import { Header } from "@atoms/Header";
import { Label } from "@atoms/Label";
import { InputComponent } from "@atoms/Input";
import { Link } from "@nextui-org/react";
import { Button } from "@atoms/Button";

type RegisterCardProps = {
  onSubmit: FormEventHandler;
  isLoading?: Boolean;
};

const RegisterCard: React.FC<RegisterCardProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  useEffect(() => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    // Check if passwords match
    setDoPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (isEmailValid && doPasswordsMatch) {
      onSubmit(event);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary p-[32px] rounded-[20px] z-10">
      <Header />
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <InputComponent
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e)}
          required
          autocomplete="off"
          error={!isEmailValid}
          errorMessage="Niepoprawny format e-maila"
          label={
            <Label htmlFor="email" required>
              ADRES E-MAIL
            </Label>
          }
        />

        <Label htmlFor="username" required>
          NAZWA UŻYTKOWNIKA
        </Label>
        <InputComponent
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e)}
          required
          autocomplete="off"
        />

        <Label htmlFor="password" required>
          HASŁO
        </Label>
        <InputComponent
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e)}
          required
        />
        <Label htmlFor="confirm-password" required>
          POTWIERDŹ HASŁO
        </Label>
        <InputComponent
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e)}
          required
        />
        {!doPasswordsMatch && (
          <span className="text-red-500">Hasła się nie zgadzają</span>
        )}

        <Button
          isLoading={isLoading}
          disabled={!isEmailValid || !doPasswordsMatch}
        >
          Zarejestruj się
        </Button>
      </form>
      <p className="text-gray-500 flex flex-row justify-center items-center gap-2 mt-2 text-sm font-semibold">
        Masz już konto?
        <Link href="/login" className="text-sky-500 text-sm">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;
