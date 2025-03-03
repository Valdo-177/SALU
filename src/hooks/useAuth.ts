import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Credenciales incorrectas");

            const data = await res.json();
            console.log('data: ', data)
            localStorage.setItem("token", data.token);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
