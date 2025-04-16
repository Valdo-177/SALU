"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import LogoSalu from "@/assets/svg/Logo";
import { scrollToSection } from "@/utils/scroolTo";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const isDas = path?.includes("/admin");

  console.log("isDas: ", isDas);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        !isDas && "fixed"
      } top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-md shadow-sm" : "bg-primary"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          {/* <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
            <span className="text-xl font-bold">S</span>
            <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent shadow-glow-accent"></div>
          </div>
          <span>SALU</span> */}
          {/* <Image src={} alt="Logo de SALU"/> */}
          <LogoSalu className="scale-[0.7]" />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex absolute md:static top-20 left-0 right-0 flex-col md:flex-row gap-6 bg-primary md:bg-transparent items-center p-6 md:p-0 shadow-md md:shadow-none z-50`}
        >
          <Link
            href="#quienes-somos"
            className="text-white hover:text-secondary transition-colors font-medium hover:underline"
          >
            ¿Quiénes somos?
          </Link>
          <Link
            href="#servicios"
            className="text-white hover:text-secondary transition-colors font-medium hover:underline"
          >
            Servicios
          </Link>
          <Link
            href="#para-medicos"
            className="text-white hover:text-secondary transition-colors font-medium hover:underline"
          >
            Para Médicos
          </Link>
          <Link
            href="#mision-vision"
            className="text-white hover:text-secondary transition-colors font-medium hover:underline"
          >
            Misión y Visión
          </Link>
          <Link
            href="#contacto"
            className="text-white hover:text-secondary transition-colors font-medium hover:underline"
          >
            Contacto
          </Link>
          <Button
            onClick={() => scrollToSection("contacto")}
            className="md:ml-4 rounded-full bg-white text-black shadow-glow-accent hover:bg-white px-[1rem] py-1 h-9"
          >
            Agenda tu cita
          </Button>
        </nav>
      </div>
    </header>
  );
}
