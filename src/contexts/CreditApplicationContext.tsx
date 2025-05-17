"use client";
import React, { createContext, useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { toast } from "sonner";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import { useVerification } from "@/hooks/useVerification";

interface CreditApplicationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  applicationId: string | null;
  setApplicationId: (id: string | null) => void;
  validateAndProceed: (data: any) => Promise<boolean>;
  loading: boolean;
}

const initFormData = {
  phoneNumber: "",
  verificationCode: "",
  fullName: "",
  idNumber: "",
  gender: "",
  email: "",
  birthDate: "",
  position: "",
  specialty: "",
  appointmentDate: "",
  appointmentTime: "",
  discountCode: "",
  advisorCode: "",
};

const CreditApplicationContext = createContext<
  CreditApplicationContextType | undefined
>(undefined);

export function CreditApplicationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(2);
  const { sendVerificationCode } = useVerification();
  const [formData, setFormData] = useState(initFormData);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Eliminamos el useEffect inicial ya que no queremos cargar datos al inicio

  const findExistingApplication = async (email: string) => {
    try {
      const q = query(
        collection(db, "solicitud_credito"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          data: doc.data(),
        };
      }
      return null;
    } catch (error) {
      console.error("Error buscando solicitud:", error);
      return null;
    }
  };

  const calculateStep = (data: any) => {
    // Verificar campos en orden según el flujo
    if (!data.email) return 1; // Welcome
    if (!data.verificationCode) {
      sendVerificationCode(data.email);
      return 2;
    } // Verification
    if (
      !data.fullName ||
      !data.idNumber ||
      !data.gender ||
      !data.birthDate ||
      !data.phoneNumber
    )
      return 3; // Personal Info
    if (!data.specialty || !data.appointmentDate) return 4; // Medical Specialty

    return 5; // Processing
  };

  const createNewApplication = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "solicitud_credito"), {
        ...data,
        createdAt: new Date().toISOString(),
        status: "pending",
      });
      setApplicationId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating new application:", error);
      throw error;
    }
  };

  const validateAndProceed = async (newData: any) => {
    setLoading(true);
    try {
      // Caso especial para el email (primer paso)
      if (newData.email && currentStep === 1) {
        const existingApp = await findExistingApplication(newData.email);

        if (existingApp) {
          const existingData = existingApp.data;
          const nextStep = calculateStep(existingData);
          console.log("existingData: ", existingData);

          // Si ya completó todo el proceso
          if (nextStep === 5) {
            setCurrentStep(0);
            setFormData(initFormData);
            toast.success(
              "Tu solicitud ya está completa y en proceso de revisión. Pronto nos contactaremos contigo."
            );
            return false;
          }

          // Si tiene proceso incompleto
          setApplicationId(existingApp.id);
          //@ts-expect-error error de tipos
          setFormData(existingData);
          setCurrentStep(nextStep);
          toast.info(
            "Encontramos una solicitud pendiente. Te ayudaremos a completarla."
          );
          return false;
        } else {
          // Nuevo usuario - continuar flujo normal sin mensajes especiales
          setFormData({ ...formData, ...newData });
          return true;
        }
      }

      // Para el paso de información personal
      if (currentStep === 3) {
        const updatedData = {
          ...formData,
          ...newData,
          phoneNumber: newData.phoneNumber || formData.phoneNumber,
        };
        setFormData(updatedData);

        // Actualizar o crear según si es nuevo o existente
        if (applicationId) {
          await updateDoc(
            doc(db, "solicitud_credito", applicationId),
            updatedData
          );
        } else {
          await createNewApplication(updatedData);
        }
        return true;
      }

      // Para otros pasos, simplemente actualizar datos
      setFormData({ ...formData, ...newData });

      // Si hay ID, actualizar en Firebase
      if (applicationId) {
        await updateDoc(doc(db, "solicitud_credito", applicationId), {
          ...formData,
          ...newData,
        });
      }

      return true;
    } catch (error) {
      console.error("Error en el proceso:", error);
      toast.error("Hubo un error al procesar tu información");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreditApplicationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        applicationId,
        setApplicationId,
        validateAndProceed,
        loading,
      }}
    >
      {children}
    </CreditApplicationContext.Provider>
  );
}

export const useCreditApplicationContext = () => {
  const context = useContext(CreditApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useCreditApplicationContext must be used within a CreditApplicationProvider"
    );
  }
  return context;
};
