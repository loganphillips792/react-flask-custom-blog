import { createContext, useContext, useEffect, useState } from "react";

import { config } from "../constants";

const url = config.url.BASE_URL;

interface UserContextType {
    authenticated: boolean;
    user: any; // replace any with user type
    loading: boolean;
    login: (
        username: string,
        password: string,
    ) => Promise<{
        success: boolean;
        error?: string;
    }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserContextType>({
    authenticated: false,
    user: null,
    loading: false,
    login: async () => ({ success: false, error: "Context not initialized" }),
    logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
    console.log("auth provider");

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Checking auth... use effect");
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            console.log("Checking auth...");
            const response = await fetch(`${url}/check-auth}`, {
                credentials: "include",
            });
            const data = await response.json();

            if (data.authenticated) {
                setAuthenticated(true);
                setUser(data.user);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        }
        setLoading(false);
    };

    const login = async (username: string, password: string) => {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setAuthenticated(true);
            setUser(data.user);
            return { success: true };
        }
        return { success: false, error: data.error };
    };

    const logout = async () => {
        await fetch(`${url}/logout`, {
            method: "POST",
            credentials: "include",
        });
        setAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, loading, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
