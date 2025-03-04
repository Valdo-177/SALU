export interface AuthResponse {
    token: string;
    user: userResponse
}

export interface userResponse {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin"; // Puedes agregar más roles si existen
    isActive: boolean;
    __v: number;
};