"use client"
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/useAuthStore ';
import React from 'react'

const LoginPages = () => {
  const { login, loading, error } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    await login(email, password);
    const userData = { name: "Juan", email }; // Simulación de datos obtenidos
    setUser(userData);
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Correo" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit" disabled={loading}>Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginPages