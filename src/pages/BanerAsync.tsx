"use client";
import React, { useState } from "react";
import user from "@/assets/svg/userSalu.svg";
import bgBanner from "@/assets/svg/bgSaluGo.svg";
import logoBg from "@/assets/svg/logoSaluFon.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWaitlist } from "@/hooks/useWaitlist";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const BanerAsync = () => {
  const [email, setEmail] = useState("");
  const { addToWaitlist, loading } = useWaitlist();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Por favor, ingresa tu correo electrónico");
      return;
    }

    const result = await addToWaitlist(email);
    
    if (result.success) {
      toast.success("¡Gracias por registrarte! Te mantendremos informado.");
      setEmail("");
    } else {
      toast.error("Hubo un error al registrarte. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="bg-[#1A1B37] sm:bg-transparent overflow-hidden max-h-screen h-full min-h-screen relative">
      <Image
        src={bgBanner}
        alt="Fondo de imagen de SALU"
        className="hidden sm:block h-full w-full object-cover"
      />

      <Image
        src={logoBg}
        alt="Fondo de imagen de SALU"
        className="hidden sm:block absolute z-1 top-0 h-full w-full"
      />

      <div className="w-full sm:w-auto px-5 sm:px-0 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-20">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-[#E0B2D3]">¡Estamos trabajando!</h1>
          <p className="text-xl w-full sm:w-[80%] text-center text-[#DDE0EC]">
            Para brindarte acceso a salud privada de calidad.
            <br /> Muy pronto
            estaremos en línea.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl text-[#E0B2D3]">Déjanos tus datos</h2>
            <p className="text-xl w-full sm:w-[70%] text-center text-[#DDE0EC]">
              y sé parte de los primeros en recibir atención médica <b>¡Nos vemos
              el 18 de mayo!</b>
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-[70%]">
            <Input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              className="bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Enviar"}
            </Button>
          </div>
          <Image src={user} alt="Usuario de SALU" className="w-[70%] sm:w-[17rem] xl:w-[17rem]" />
        </div>
      </div>
    </div>
  );
};

export default BanerAsync;
