"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import user from "@/assets/svg/Credito5.svg";
import BackgroundShapes from "./background-shapes";
import { ChevronRight, HelpCircle, Calendar } from "lucide-react";
import DatePicker from "./date-picker";
import AppointmentPicker from "./appointment-picker";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface MedicalSpecialtyPageProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function MedicalSpecialtyPage({
  formData,
  updateFormData,
  onNext,
  onBack,
}: MedicalSpecialtyPageProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isAppointmentPickerOpen, setIsAppointmentPickerOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<string | null>(null);

  // Sample unavailable dates (weekends and some random days)
  const unavailableDates = [
    new Date(2023, 4, 6), // Saturday
    new Date(2023, 4, 7), // Sunday
    new Date(2023, 4, 13), // Saturday
    new Date(2023, 4, 14), // Sunday
    new Date(2023, 4, 20), // Saturday
    new Date(2023, 4, 21), // Sunday
    new Date(2023, 4, 27), // Saturday
    new Date(2023, 4, 28), // Sunday
    new Date(2023, 4, 10), // Random unavailable day
    new Date(2023, 4, 15), // Random unavailable day
    new Date(2023, 4, 22), // Random unavailable day
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleDateChange = (date: Date) => {
    setAppointmentDate(date);
    setAppointmentTime(null); // Reset time when date changes
    updateFormData({
      appointmentDate: date.toISOString(),
      appointmentTime: null,
    });

    // Open time picker after selecting a date
    setTimeout(() => {
      setIsAppointmentPickerOpen(true);
    }, 100);
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentTime(time);
    updateFormData({ appointmentTime: time });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAppointment = () => {
    if (!appointmentDate) return "";
    const dateStr = formatDate(appointmentDate);
    return appointmentTime ? `${dateStr} - ${appointmentTime}` : dateStr;
  };

  return (
    <div className="relative min-h-screen flex flex-col fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
      <BackgroundShapes />

      <div className="w-full relative z-20 max-w-7xl mx-auto py-6 sm:py-8 h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">
          <div className="w-full md:w-1/2 hidden sm:flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative z-10">
              <Image
                src={user}
                alt="Ilustración médica"
                width={400}
                height={400}
                className="object-contain w-full h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[400px]"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
              Información de la Cita
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Especialidad Médica
                  </label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) =>
                      updateFormData({ specialty: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full h-[2.8rem]">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="specialty1">
                        Medicina General
                      </SelectItem>
                      <SelectItem value="specialty2">Cardiología</SelectItem>
                      <SelectItem value="specialty3">Neurología</SelectItem>
                      <SelectItem value="specialty4">Pediatría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Fecha y Hora de Cita
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Seleccionar"
                      className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem] pr-10"
                      value={formatAppointment()}
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
                  {appointmentDate && !appointmentTime && (
                    <p className="text-xs text-primary mt-1">
                      Selecciona una hora haciendo clic en el campo
                    </p>
                  )}
                </div> */}

                <div className="col-span-2">
                  <h3 className="text-xl font-medium mb-4">
                    Campos No Obligatorios
                  </h3>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Código de Descuento
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Código de Descuento"
                      className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem] pr-10"
                      value={formData.discountCode}
                      onChange={(e) =>
                        updateFormData({ discountCode: e.target.value })
                      }
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <HelpCircle size={18} />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Código del Asesor Comercial
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Código del Asesor"
                      className="w-full px-4 py-2.5 rounded-md border bg-white border-gray-300 transition-all focus-visible:outline-none h-[2.8rem] pr-10"
                      value={formData.advisorCode}
                      onChange={(e) =>
                        updateFormData({ advisorCode: e.target.value })
                      }
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <HelpCircle size={18} />
                    </div>
                  </div>
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
                >
                  Aplicar <ChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DatePicker
        selectedDate={appointmentDate}
        onChange={handleDateChange}
        minDate={new Date()}
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        unavailableDates={unavailableDates}
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
      />

      <AppointmentPicker
        selectedDate={appointmentDate}
        selectedTime={appointmentTime}
        onSelectTime={handleTimeSelect}
        isOpen={isAppointmentPickerOpen}
        onClose={() => setIsAppointmentPickerOpen(false)}
      />
    </div>
  );
}
