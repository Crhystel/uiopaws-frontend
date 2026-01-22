import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';

// interface User removed to use imported one from authService

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(authService.getToken());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const userProfile = await authService.getProfile();
                    setUser(userProfile);
                } catch (error) {
                    console.error("Auth check failed", error);
                    try { await authService.logout(); } catch (e) { }
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        if (token && !user) {
            initAuth();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login({ email, password });
            // Retrieve full profile from response or separate call if needed. 
            // Assuming authService.login returns { access_token, user_role, user? }
            // If user is not in login response, we fetch it.
            // Let's assume we set token and then fetch profile or user is passed.
            // Based on authService.ts: login returns AuthResponse { access_token, token_type, user_role }
            // It does NOT return the full user object.

            setToken(response.access_token);

            // We need to fetch the user profile now
            const userProfile = await authService.getProfile();
            setUser(userProfile);

        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.register(userData);
            // Registration successful. Navigation to login is handled by the component.
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error en el registro');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (e) { /* ignore error on logout */ }

        setToken(null);
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, isAuthenticated: !!user, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
