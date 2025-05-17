"use client";

import type React from "react";
import Image from "next/image";
import user from "@/assets/svg/Credito12.svg";
import BackgroundShapes from "./background-shapes";
import { ChevronRight } from "lucide-react";
import { useVerification } from "@/hooks/useVerification";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "sonner";
import { useState } from "react";
import { useCreditApplicationContext } from "@/contexts/CreditApplicationContext";

interface WelcomePageProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WelcomePage({
  formData,
  updateFormData,
  onNext,
  onBack,
}: WelcomePageProps) {
  const { validateAndProceed, loading: contextLoading } = useCreditApplicationContext();
  const { sendVerificationCode, loading: verificationLoading } = useVerification();
  const [touched, setTouched] = useState({
    email: false,
    terms: false,
    conditions: false,
  });

  // Combinar los estados de loading
  const loading = contextLoading || verificationLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas...
    setTouched({
      email: true,
      terms: true,
      conditions: true,
    });

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Por favor, ingresa un correo electrónico válido");
      return;
    }

    const form = e.target as HTMLFormElement;
    if (!form.terms.checked || !form.conditions.checked) {
      toast.error("Por favor, acepta los términos y condiciones");
      return;
    }

    try {
      // Intentar proceder (esto verificará si existe el correo)
      const shouldContinue = await validateAndProceed({ 
        email: formData.email,
        terms: form.terms.checked,
        conditions: form.conditions.checked
      });

      if (shouldContinue) {
        // Si es nuevo correo, enviar código de verificación
        await sendVerificationCode(formData.email);
        onNext();
      }
      // Si no continúa, el contexto ya habrá actualizado el paso correspondiente
    } catch (err) {
      console.error("Error en el proceso:", err);
      toast.error("Ocurrió un error al procesar la solicitud");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ email: e.target.value });
    if (!touched.email) {
      setTouched((prev) => ({ ...prev, email: true }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="relative min-h-screen flex flex-col fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
      <BackgroundShapes />

      <div className="page-container w-full max-w-7xl mx-auto py-6 sm:py-8">
        <div className="content-container flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="illustration-container w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative z-10">
              <Image
                src={user}
                alt="Paciente en silla de ruedas con médico"
                width={400}
                height={400}
                className="object-contain w-full h-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
                priority
              />
            </div>
          </div>

          <div className="form-container w-full md:w-1/2 text-center md:text-right order-1 md:order-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-4">
              BIENVENIDO
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-2">
              Te enviaremos un código por correo electrónico
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              para ingresar a <span className="font-bold">SALU</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-left md:text-left">
                  Ingresa Tu correo electrónico{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Correo electronico"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                      touched.email && !formData.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={formData.email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur("email")}
                    required
                  />
                  {touched.email && !formData.email && (
                    <span className="text-red-500 text-sm mt-1 text-left">
                      El correo electrónico es requerido
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`mt-1 ${
                      touched.terms && !formData.terms
                        ? "ring-2 ring-red-500"
                        : ""
                    }`}
                    checked={formData.terms}
                    onChange={(e) => {
                      updateFormData({ terms: e.target.checked });
                      if (!touched.terms) {
                        setTouched((prev) => ({ ...prev, terms: true }));
                      }
                    }}
                    onBlur={() => handleBlur("terms")}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className={`text-xs sm:text-sm text-left ${
                      touched.terms && !formData.terms ? "text-red-500" : ""
                    }`}
                  >
                    Autorizo el Tratamiento de datos personales conforme a la{" "}
                    <a
                      href="#"
                      className="text-primary underline hover:text-primary/80"
                    >
                      política de privacidad
                    </a>
                    . <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="conditions"
                    className={`mt-1 ${
                      touched.conditions && !formData.conditions
                        ? "ring-2 ring-red-500"
                        : ""
                    }`}
                    checked={formData.conditions}
                    onChange={(e) => {
                      updateFormData({ conditions: e.target.checked });
                      if (!touched.conditions) {
                        setTouched((prev) => ({ ...prev, conditions: true }));
                      }
                    }}
                    onBlur={() => handleBlur("conditions")}
                    required
                  />
                  <label
                    htmlFor="conditions"
                    className={`text-xs sm:text-sm text-left ${
                      touched.conditions && !formData.conditions
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    Acepto los{" "}
                    <a
                      href="#"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Términos y condiciones
                    </a>{" "}
                    de SALU. También acepto que realicen labores de cobranza a
                    través de canales autorizados de cobranza.{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-2.5 text-primary border-2 border-primary rounded-lg hover:bg-primary/10 transition-colors"
                  onClick={onBack}
                  disabled={loading}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#f8c8e0] text-primary rounded-lg hover:bg-[#f0bfd7] transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner className="w-5 h-5" />
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
    </div>
  );
}
