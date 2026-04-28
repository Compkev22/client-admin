import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
 
import {
    login as loginRequest
} from "../../../shared/api";
 
 
export const useAuthStore = create(
    persist(
        (set, get)=>({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,
 
            checkAuth: ()=> {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "ADMIN_ROLE";
 
                if(token && !isAdmin){
                    set({
                        user:null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated:false,
                        isLoadingAuth:false,
                        error: "No tienes permiso para acceder como administrador"
                    })
                }
            },
           
            logout: ()=>{
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },
 
            // ----------------------------------------------------------------
login: async ({ emailOrUsername, password }) => {
    // 1. Encendemos el loading para que el botón diga "Iniciando..."
    set({ loading: true, error: null });

    try {
        // Intentamos la petición
        const { data } = await loginRequest({ emailOrUsername, password });

        // Sólo administradores pueden iniciar sesión en cliente-admin
        const role = data?.userDetails?.role;
        if (role !== "ADMIN_ROLE") {
            const message = "No tienes permisos para acceder como administrador";

            set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: message,
            });

            toast.error(message);
            return { success: false, error: message };
        }

        // Si es Admin y todo salió bien
        set({
            user: data.userDetails,
            token: data.accessToken || data.token,
            refreshToken: data.refreshToken,
            expiresAt: data.expiresIn || data.expiresAt,
            isAuthenticated: true,
            loading: false,
        });

        return { success: true };

    } catch (error) {
        // 2. AQUÍ ATRAPAMOS EL ERROR 401 (Unauthorized)
        console.error("Error en login:", error);

        // Extraemos el mensaje que envía tu GlobalExceptionMiddleware
        const errorMessage = error.response?.data?.message || "Credenciales incorrectas";

        set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false, // Apagamos el loading para que el botón se reactive
            error: errorMessage,
        });

        // Retornamos el error para que el LoginForm lo use
        return { success: false, error: errorMessage };
    }
}
            // ----------------------------------------------------------------
        }),
        {name: "auth-store"}
    )
);