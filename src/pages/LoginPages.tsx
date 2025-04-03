"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore ";
// import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const { push } = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userLogin = await login(formData.email, formData.password);
    console.log('userLogin: ', userLogin)
    // if (userLogin?.role == "admin") {
    //   push("/admin")
    // } else {
    //   push("/")
    // }
    setUser(userLogin || { email: '', name: '' });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full bg-bgPrimary hover:bg-bgPrimary" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;




// "use client"
// import { useAuth } from '@/hooks/useAuth';
// import { useAuthStore } from '@/stores/useAuthStore ';
// import React from 'react'

// const LoginPages = () => {
//   const { login, loading, error } = useAuth();
//   const setUser = useAuthStore((state) => state.setUser);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const email = (e.target as any).email.value;
//     const password = (e.target as any).password.value;

//     await login(email, password);
//     const userData = { name: "Juan", email }; // Simulación de datos obtenidos
//     setUser(userData);
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="email" name="email" placeholder="Correo" required />
//       <input type="password" name="password" placeholder="Contraseña" required />
//       <button type="submit" disabled={loading}>Iniciar Sesión</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// }

// export default LoginPages