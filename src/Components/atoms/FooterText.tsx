import React from "react";
import { Link } from "@atoms/Link"; // Adjust the import path as needed

export const FooterText: React.FC = () => (
  <p className="text-[14px] text-light-gray">
    Potrzebujesz konta?
    <Link href="" className="text-link-blue mx-2 text-[14px] font-semibold">
      Zarejestruj się
    </Link>
  </p>
);
