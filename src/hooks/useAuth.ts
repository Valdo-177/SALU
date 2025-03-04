import { useState } from "react";
import axios from "axios";
import { AuthResponse } from "@/utils/generals.type";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post<AuthResponse>("http://localhost:5000/api/users/login", {
                email,
                password,
            }, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("token", data.token);
            return data.user
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else {
                setError("Error en la autenticación");
            }
        }
        finally {
            setLoading(false);
        }
    };


    return { login, loading, error };
};
