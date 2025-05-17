"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import user from "@/assets/svg/Credito4.svg";
import BackgroundShapes from "./background-shapes";
import { ChevronRight, Calendar } from "lucide-react";
import DatePicker from "./date-picker";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface PersonalInfoPageProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean; // Añadimos loading
}

export default function PersonalInfoPage({
  formData,
  updateFormData,
  onNext,
  onBack,
  loading = false,
}: PersonalInfoPageProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Por favor, ingresa un número de teléfono válido (10 dígitos)");
      return;
    }

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      toast.error("Por favor, ingresa un nombre válido");
      return;
    }

    if (!formData.idNumber || formData.idNumber.trim().length < 8) {
      toast.error("Por favor, ingresa un número de cédula válido");
      return;
    }

    if (!formData.gender) {
      toast.error("Por favor, selecciona un género");
      return;
    }

    if (!formData.birthDate) {
      toast.error("Por favor, selecciona una fecha de nacimiento");
      return;
    }

    if (!formData.position) {
      toast.error("Por favor, selecciona un cargo");
      return;
    }

    try {
      await updateFormData({
        phoneNumber: formData.phoneNumber,
        fullName: formData.fullName,
        idNumber: formData.idNumber,
        gender: formData.gender,
        birthDate: formData.birthDate,
        position: formData.position
      });
      onNext();
    } catch (error) {
      console.error("Error updating form data:", error);
      toast.error("Error al guardar los datos");
    }
  };

  const handleDateChange = (date: Date) => {
    setBirthDate(date);
    updateFormData({ birthDate: date.toISOString() });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen flex mt-[4rem] sm:mt-0 flex-col fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
      <BackgroundShapes />

      <div className="w-full relative z-20 max-w-7xl mx-auto py-6 sm:py-8 h-screen flex items-center">
        <div className="flex flex-col md:flex-row  items-center justify-between gap-8 md:gap-12 w-full">
          <div className="w-full md:w-1/2 hidden sm:flex justify-center md:justify-start sm:pl-[3rem] 2xl:pl-0 order-2 md:order-1">
            <div className="relative z-10">
              <Image
                src={user}
                alt="Ilustración médica"
                width={400}
                height={400}
                className="object-contain w-full h-auto max-w-[280px] sm:max-w-[200px] 2xl:max-w-[400px]"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
              Información Personal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium mb-1">
                  Nombre Completo
                </label>
                <Input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem]"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Número de teléfono
                  </label>
                  <Input
                    type="tel"
                    placeholder="Ingresa 10 dígitos"
                    className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem]"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      console.log('Updating phone number:', value); // Para debugging
                      updateFormData({ phoneNumber: value });
                    }}
                    required
                    maxLength={10}
                    pattern="\d{10}"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Número de Cédula
                  </label>
                  <Input
                    type="text"
                    placeholder="Número"
                    className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem]"
                    value={formData.idNumber}
                    onChange={(e) =>
                      updateFormData({ idNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Género
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => updateFormData({ gender: value })}
                    required
                  >
                    <SelectTrigger className="w-full h-[2.8rem]">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Correo Electrónico
                  </label>
                  <Input
                    type="email"
                    disabled
                    placeholder="Correo"
                    className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem]"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Fecha de Nacimiento
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Seleccionar"
                      className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem]"
                      value={formatDate(birthDate)}
                      onClick={() => setIsDatePickerOpen(true)}
                      readOnly
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setIsDatePickerOpen(true)}
                    >
                      <Calendar size={18} />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Cargo
                  </label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      updateFormData({ position: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full h-[2.8rem]">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Empleado">Empleado</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                      <SelectItem value="Independiente">
                        Independiente
                      </SelectItem>
                      <SelectItem value="ninguna">ninguna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full sm:w-auto px-6 py-2.5 text-primary border-2 border-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#f8c8e0] text-primary rounded-lg hover:bg-[#f0bfd7] transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Procesando...
                    </span>
                  ) : (
                    <>
                      Continuar <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DatePicker
        selectedDate={birthDate}
        onChange={handleDateChange}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
      />
    </div>
  );
}
