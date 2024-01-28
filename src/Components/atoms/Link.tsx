import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className }) => (
  <a
    href={href}
    className={
      className ? className : `text-[14px] text-link-blue font-semibold`
    }
  >
    {children}
  </a>
);
