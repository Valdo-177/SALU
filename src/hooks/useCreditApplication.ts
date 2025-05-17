import { useState } from 'react';
import { toast } from 'sonner';

interface CreditApplicationData {
  phoneNumber: string;
  verificationCode: string;
  fullName: string;
  idNumber: string;
  gender: string;
  email: string;
  birthDate: string;
  position: string;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  discountCode: string;
  advisorCode: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

interface CreditResponse {
  message?: string;
  error?: string;
  id?: string;
  data?: CreditApplicationData;
  status?: boolean;
}

export function useCreditApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createApplication = async (data: Partial<CreditApplicationData>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/credit/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      const result: CreditResponse = await response.json();
      
      if (!response.ok) {
        if (result.error === "Ya existe una solicitud completa para este correo") {
          toast.error("Ya existe una solicitud completa para este correo");
          return { error: result.error, status: "complete" };
        }
        throw new Error(result.error || 'Failed to create application');
      }

      if (result.message === "Solicitud existente encontrada") {
        toast.info("Continuando con solicitud existente");
      } else {
        toast.success("Solicitud creada exitosamente");
      }
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la solicitud';
      toast.error(message);
      setError(message);
      console.error('API Error:', err);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (id: string, data: Partial<CreditApplicationData>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/credit/update/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result: CreditResponse = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to update application');
      toast.success("Información actualizada correctamente");
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la información';
      toast.error(message);
      setError(message);
      console.error('API Error:', err);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createApplication,
    updateApplication,
    loading,
    error,
  };
}