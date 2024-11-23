"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export type FormData = {
  id: string; // Cédula de ciudadanía
  phone: string; // Teléfono móvil
  fullName: string; // Nombre completo
  email: string; // Correo electrónico
  gender: string; // Género
};

export function FormUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const sendData = async (response: FormData) => {
    console.log("Datos enviados:", response);
    setLoading(true)
    await axios.post("/api/email", response);
    setOpen(false);
    reset();
    toast("Correo enviado correctamente", {
      description: `
        Nombre: ${response.fullName} | Correo Electrónico: ${response.email}
      `,
    });
    setLoading(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-[24px] h-[3rem] px-7 bg-bgPrimary font-semibold hover:bg-primary1 w-[max-content]"
          onClick={() => setOpen(true)}
        >
          Simula tu crédito ahora
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh - Xpx)]">
        <DialogHeader>
          <DialogTitle>Simular crédito</DialogTitle>
          <DialogDescription>
            Llena este formulario con tus datos para solicitar un microcrédito
            con <span className="font-bold">SALU</span>.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(sendData)}
          className="grid gap-4 py-4"
          noValidate
        >
          {/* Cédula de Ciudadanía */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Cédula de ciudadanía
            </Label>
            <Input
              id="id"
              placeholder="123456789"
              className={`col-span-3 ${errors.id ? "border-red-500" : "border-gray-300"
                }`}
              {...register("id", { required: "Este campo es obligatorio." })}
            />
            {errors.id && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.id.message}
              </p>
            )}
          </div>

          {/* Teléfono móvil */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono móvil
            </Label>
            <Input
              id="phone"
              placeholder="3001234567"
              className={`col-span-3 ${errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              {...register("phone", {
                required: "Este campo es obligatorio.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Debe ser un número de 10 dígitos.",
                },
              })}
            />
            {errors.phone && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Nombre completo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Nombre completo
            </Label>
            <Input
              id="fullName"
              placeholder="Juan Pérez"
              className={`col-span-3 ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              {...register("fullName", {
                required: "Este campo es obligatorio.",
              })}
            />
            {errors.fullName && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Correo electrónico */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Correo electrónico
            </Label>
            <Input
              id="email"
              placeholder="correo@ejemplo.com"
              className={`col-span-3 ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              {...register("email", {
                required: "Este campo es obligatorio.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Debe ser un correo electrónico válido.",
                },
              })}
            />
            {errors.email && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Género */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Género
            </Label>
            <select
              id="gender"
              className={`col-span-3 border rounded-md h-10 px-2 ${errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              {...register("gender", { required: "Selecciona una opción." })}
            >
              <option value="">Selecciona tu género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.gender && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.gender.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-bgPrimary font-semibold hover:bg-primary1 w-[max-content]"
            >
              {loading ? "Enviando datos.." : "Enviar datos"}
              {loading && <LoadingSpinner/>} 
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
