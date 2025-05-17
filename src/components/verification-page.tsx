"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import user from "@/assets/svg/Credito3.svg";
import { ChevronRight } from "lucide-react";
import { useVerification } from "@/hooks/useVerification";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";

interface VerificationPageProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VerificationPage({
  formData,
  updateFormData,
  onNext,
  onBack,
}: VerificationPageProps) {
  const { verifyCode, sendVerificationCode, loading } = useVerification();

  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Función para iniciar el temporizador
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current); // Limpiar cualquier timer anterior

    timerRef.current = setInterval(() => {
      setResendTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Iniciar temporizador al montar
  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Cleanup al desmontar
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (value: string) => {
    updateFormData({ verificationCode: value });
  };

  const handleResendCode = async () => {
    if (resendTimer === 0) {
      try {
        await sendVerificationCode(formData.email);
        setResendTimer(60);
        startTimer();
      } catch (error) {
        // Error manejado por el hook
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyCode(formData.email, formData.verificationCode);
      onNext();
    } catch (error) {
      // Error manejado por el hook
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="page-container w-full max-w-7xl mx-auto py-6 sm:py-8">
        <div className="content-container flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="illustration-container w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1">
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

          <div className="form-container w-full md:w-1/2 text-center md:text-right order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Ingresa el código de 4 dígitos
            </h2>
            <p className="text-base sm:text-lg mb-2">enviado al correo</p>
            <p className="text-lg sm:text-xl font-bold mb-8">
              {formData.email}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
              <div className="mb-8">
                <div className="flex justify-center md:justify-end gap-2 sm:gap-3">
                  <InputOTP
                    maxLength={4}
                    value={formData.verificationCode || ""}
                    onChange={handleCodeChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-[4rem] w-[4rem]" />
                      <InputOTPSlot index={1} className="h-[4rem] w-[4rem]" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} className="h-[4rem] w-[4rem]" />
                      <InputOTPSlot index={3} className="h-[4rem] w-[4rem]" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="mb-6 text-center md:text-right">
                <p className="text-sm mb-1">¿No recibiste el código?</p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0 || loading}
                  className="text-primary font-medium mt-2 hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                  {resendTimer > 0
                    ? `Reenviar en ${formatTime(resendTimer)}`
                    : "Reenviar código"}
                </button>
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
                      Validar y Continuar <ChevronRight size={16} />
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

// "use client";

// import type React from "react";
// import { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import logo from "@/assets/svg/SaluLogo.svg";
// import user from "@/assets/svg/Credito3.svg";
// import ProgressDots from "./progress-dots";
// import BackgroundShapes from "./background-shapes";
// import { ChevronRight } from "lucide-react";
// import { useVerification } from "@/hooks/useVerification";
// import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "./ui/input-otp";

// interface VerificationPageProps {
//   formData: any;
//   updateFormData: (data: any) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// // Remove the unused state and refs
// export default function VerificationPage({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }: VerificationPageProps) {
//   const { verifyCode, sendVerificationCode, loading } = useVerification();
//   // Change initial timer to 60 seconds
//   const [resendTimer, setResendTimer] = useState(60);

//   useEffect(() => {
//     // Start the countdown timer
//     const timer = setInterval(() => {
//       setResendTimer((prevTime) => {
//         if (prevTime <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     // Cleanup on unmount
//     return () => clearInterval(timer);
//   }, []);

//   // Format time to mm:ss
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleCodeChange = (value: string) => {
//     updateFormData({ verificationCode: value });
//   };

//   const handleResendCode = async () => {
//     if (resendTimer === 0) {
//       try {
//         await sendVerificationCode(formData.email);
//         setResendTimer(60); // Reset to 60 seconds after resending
//       } catch (error) {
//         // Error handled by hook
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await verifyCode(formData.email, formData.verificationCode);
//       onNext();
//     } catch (error) {
//       // Error handled by hook
//     }
//   };
//   console.log("formData.verificationCode: ", typeof formData.verificationCode);

//   return (
//     <div className="relative min-h-screen flex flex-col fade-in overflow-hidden px-4 sm:px-6 lg:px-8">
//       {/* <BackgroundShapes /> */}

//       <div className="page-container w-full max-w-7xl mx-auto py-6 sm:py-8">
//         <div className="flex justify-between items-start mb-8 sm:mb-12">
//           <ProgressDots currentStep={1} totalSteps={4} />
//           <Image
//             src={logo}
//             alt="Logo SALU"
//             width={400}
//             height={400}
//             className="object-contain h-[2.5rem] sm:h-[3rem] md:h-[4rem] w-auto"
//             priority
//           />
//         </div>

//         <div className="content-container flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
//           <div className="illustration-container w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1">
//             <div className="relative z-10">
//               <Image
//                 src={user}
//                 alt="Ilustración médica"
//                 width={400}
//                 height={400}
//                 className="object-contain w-full h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[400px]"
//                 priority
//               />
//             </div>
//           </div>

//           <div className="form-container w-full md:w-1/2 text-center md:text-right order-1 md:order-2">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
//               Ingresa el código de 4 dígitos
//             </h2>
//             <p className="text-base sm:text-lg mb-2">enviado al correo</p>
//             <p className="text-lg sm:text-xl font-bold mb-8">
//               {formData.email}
//             </p>

//             <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
//               <div className="mb-8">
//                 <div className="flex justify-center md:justify-end gap-2 sm:gap-3">
//                   <InputOTP
//                     maxLength={4}
//                     value={formData.verificationCode || ""}
//                     onChange={handleCodeChange}
//                   >
//                     <InputOTPGroup>
//                       <InputOTPSlot index={0} className="h-[4rem] w-[4rem]" />
//                       <InputOTPSlot index={1} className="h-[4rem] w-[4rem]" />
//                     </InputOTPGroup>
//                     <InputOTPSeparator />
//                     <InputOTPGroup>
//                       <InputOTPSlot index={2} className="h-[4rem] w-[4rem]" />
//                       <InputOTPSlot index={3} className="h-[4rem] w-[4rem]" />
//                     </InputOTPGroup>
//                   </InputOTP>
//                 </div>
//               </div>

//               <div className="mb-6 text-center md:text-right">
//                 <p className="text-sm mb-1">¿No recibiste el código?</p>
//                 <button
//                   type="button"
//                   onClick={handleResendCode}
//                   disabled={resendTimer > 0 || loading}
//                   className="text-primary font-medium mt-2 hover:text-primary/80 transition-colors disabled:opacity-50"
//                 >
//                   {resendTimer > 0
//                     ? `Reenviar en ${formatTime(resendTimer)}`
//                     : "Reenviar código"}
//                 </button>
//               </div>

//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <button
//                   type="button"
//                   className="btn-secondary w-full sm:w-auto px-6 py-2.5"
//                   onClick={onBack}
//                   disabled={loading}
//                 >
//                   Volver
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn-primary w-full sm:w-auto px-6 py-2.5 flex items-center justify-center gap-2"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <LoadingSpinner className="w-5 h-5" />
//                   ) : (
//                     <>
//                       Validar y Continuar <ChevronRight size={16} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
