"use client";

import { useState } from "react";
import WelcomePage from "@/components/welcome-page";
import VerificationPage from "@/components/verification-page";
import PersonalInfoPage from "@/components/personal-info-page";
import MedicalSpecialtyPage from "@/components/medical-specialty-page";
import ProcessingPage from "@/components/processing-page";
import LandingPage from "@/components/landing-page";
import Image from "next/image";
import logo from "@/assets/svg/SaluLogo.svg";
import ProgressDots from "@/components/progress-dots";
import { useCreditApplication } from "@/hooks/useCreditApplication";
import { toast } from "sonner";
import { useCreditApplicationContext } from "@/contexts/CreditApplicationContext";

export default function Home() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    validateAndProceed,
    loading,
  } = useCreditApplicationContext();

  const updateFormData = async (data: Partial<typeof formData>) => {
    console.log("Updating form data:", data);
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
  };

  const nextStep = async () => {
    try {
      const canProceed = await validateAndProceed(formData);
      if (canProceed) {
        window.scrollTo(0, 0);
        if (currentStep >= 5) {
          setCurrentStep(0);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    } catch (error) {
      console.error("Error proceeding to next step:", error);
      toast.error("Error al procesar la solicitud");
    }
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    <LandingPage key="landing" onNext={nextStep} />,
    <WelcomePage
      key="welcome"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <VerificationPage
      key="verification"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <PersonalInfoPage
      key="personal-info"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
      loading={loading}
    />,
    <MedicalSpecialtyPage
      key="medical-specialty"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <ProcessingPage key="processing" onNext={nextStep} />,
  ];

  return (
    <main className="bg-pattern">
      <section>
        <div className="h-10 w-10 bg-red-400 sm:bg-slate-800 md:bg-green-800 lg:bg-yellow-600 xl:bg-blue-800 2xl:bg-purple-700 absolute top-20 left-20 z-50"></div>
        {currentStep !== 0 && (
          <div className="flex justify-around items-center py-4 fixed top-0 w-full z-50">
            <Image
              src={logo}
              alt="Logo SALU"
              width={400}
              height={400}
              className="object-contain h-[2.5rem] sm:h-[3rem] md:h-[3rem] w-auto"
              priority
            />
            <ProgressDots currentStep={currentStep - 1} totalSteps={4} />
          </div>
        )}
        <div className="border-[1rem] border-red-300">{steps[currentStep]}</div>
      </section>
    </main>
  );
}
