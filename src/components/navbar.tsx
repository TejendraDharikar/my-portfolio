"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href="#home">
          <MenuItem active={active} setActive={setActive} item="Home" />
        </Link>
        <Link href="#about">
          <MenuItem active={active} setActive={setActive} item="About" />
        </Link>
        <Link href="#projects">
          <MenuItem active={active} setActive={setActive} item="Projects" />
        </Link>
        <Link href="#contact">
          <MenuItem active={active} setActive={setActive} item="Contact" />
        </Link>
      </Menu>
    </div>
  );
}