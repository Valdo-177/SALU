"use client";

import Image from "next/image";
import Logo from "./logo";
import user from "@/assets/svg/Credito1.svg";
import BackgroundShapes from "./background-shapes";
import logo from "@/assets/svg/SaluLogo.svg";

interface LandingPageProps {
  onNext: () => void;
}

export default function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div className="relative sm:min-h-screen sm:max-h-screen h-full flex flex-col justify-center fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="page-container w-full max-w-7xl mx-auto">
        <div className="content-container flex flex-col-reverse md:flex-row items-center justify-center sm:justify-between gap-8 md:gap-12">
          <div className="illustration-container w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative z-10">
              <Image
                src={user}
                alt="Paciente en silla de ruedas con médico"
                width={400}
                height={400}
                className="object-contain w-[10rem] sm:w-full h-auto max-w-[300px] sm:max-w-[220px] xl:max-w-[220px] 2xl:max-w-[400px]"
                priority
              />
            </div>
          </div>

          <div className="form-container w-full text-center md:text-right border border-red-800">
            <div className="flex items-center md:items-end flex-col mb-8 md:mb-12">
              <Image
                src={logo}
                alt="Logo SALU"
                width={400}
                height={400}
                className="object-contain h-[3rem] sm:h-[4rem] w-auto mb-4"
                priority
              />
              <h1 className="text-4xl sm:text-5xl __className_3ea024 md:text-6xl lg:text-8xl font-bold text-primary mb-2 w-full sm:w-max">
                Consulta ahora,
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-accent">
                Paga después
              </h2>
            </div>

            <div className="flex flex-col space-y-4 w-full sm:w-auto">
              <button
                className="btn-primary w-full sm:w-auto px-6 py-3 text-lg sm:text-xl"
                onClick={() => onNext()}
              >
                Solicitar Un Crédito
              </button>

              <button
                className="btn-primary bg-opacity-80 w-full sm:w-auto px-6 py-3 text-lg sm:text-xl"
                onClick={() => onNext()}
              >
                Retomar Mi Solicitud
              </button>

              {/* <div className="text-center md:text-right mt-8">
                <a
                  href="#"
                  className="text-primary underline font-medium text-lg sm:text-xl hover:text-primary/80 transition-colors"
                >
                  Ingresar A Mi Cuenta
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
