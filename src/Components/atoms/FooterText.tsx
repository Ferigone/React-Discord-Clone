import { Link } from "@nextui-org/react";
import React from "react";

export const FooterText: React.FC = () => (
  <p className="text-[14px] text-light-gray">
    Potrzebujesz konta?
    <Link href="/register" className="text-link-blue mx-2 text-[14px] font-semibold">
      Zarejestruj się
    </Link>
  </p>
);
