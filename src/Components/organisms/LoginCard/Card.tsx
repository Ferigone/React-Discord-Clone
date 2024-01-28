import React, { FormEventHandler } from "react";
import { Header } from "@atoms/Header";
import { Label } from "@atoms/Label";
import { Input } from "@atoms/Input";
import { Link } from "@atoms/Link";
import { Button } from "@atoms/Button";
import { FooterText } from "@atoms/FooterText";

type CardProps = {
  onSubmit: FormEventHandler;
};

const Card: React.FC<CardProps> = ({ onSubmit }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-primary p-[32px] rounded-[20px] z-10">
      <Header />
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <Label htmlFor="email" required>
          ADRES E-MAIL
        </Label>
        <Input type="text" id="email" required />
        <Label htmlFor="password">HASŁO</Label>
        <Input type="password" id="password" required />
        <Link href="">Nie pamiętasz hasła?</Link>
        <Button>Zaloguj się</Button>
        <FooterText />
      </form>
    </div>
  );
};

export default Card;
