import { useAuthStore } from '../authStore';
import { useNavigate } from "react-router-dom"; // Corregido: se quitó 'data'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; // Corregido: toas -> toast

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();
    
    // Corregido: Extraemos 'login' y también 'loading' para que el botón funcione
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); // Corregido: ¡Se agregaron los paréntesis aquí!

    // Corregido el nombre de onSumnit a onSubmit (es una buena práctica)
    const onSubmit = async (data) => {
        const res = await login(data);
        if (res) {
            navigate("/dashboard");
            toast.success("¡Bienvenido de nuevo!");
        }else {
            toast.error(res.error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email o Usuario 
                </label>
                <input 
                    type="text" 
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    {...register("emailOrUsername", {
                        required: "Este campo es obligatorio",
                    })}
                />
                {/* Opcional: Mostrar el error visualmente si el usuario no llena el campo */}
                {errors.emailOrUsername && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailOrUsername.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            <button 
                type="submit"
                disabled={loading} 
                className={`w-full bg-main-blue text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            {/* Nueva sección de enlaces inferiores */}
            <div className="text-center text-sm space-y-4 mt-6">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-main-blue hover:underline block w-full"
                >
                    ¿Olvidaste tu contraseña?
                </button>
                
                <p className="text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button type="button" className="text-main-blue font-medium hover:underline">
                        Regístrate
                    </button>
                </p>
            </div>
        </form>
    );
}