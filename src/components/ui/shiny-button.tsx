"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const primaryLinkClass =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold bg-[#2551AF] text-white border-2 border-transparent shadow-md transition-all hover:bg-white hover:text-[#2551AF] hover:border-[#2551AF]";

export const ShinyButton = ({ children, href, className, onClick, ...props }: ShinyButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(primaryLinkClass, className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn(primaryLinkClass, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
