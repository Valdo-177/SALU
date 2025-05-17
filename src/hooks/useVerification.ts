import { useState } from 'react';
import { toast } from 'sonner';

interface VerificationResponse {
  message?: string;
  error?: string;
  id?: string;
}

export function useVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationCode = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: VerificationResponse = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to send code');
      toast.success("Código enviado correctamente");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al enviar el código';
      toast.error(message);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/verify/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data: VerificationResponse = await response.json();

      if (!response.ok) throw new Error(data.error || 'Código inválido');
      toast.success("Código verificado correctamente");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al verificar el código';
      toast.error(message);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cleanupCodes = async () => {
    try {
      const response = await fetch('/api/verify/cleanup', {
        method: 'POST',
      });
      const data: VerificationResponse = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Cleanup failed');
      return data;
    } catch (err) {
      console.error('Cleanup error:', err);
    }
  };

  return {
    sendVerificationCode,
    verifyCode,
    cleanupCodes,
    loading,
    error,
  };
}