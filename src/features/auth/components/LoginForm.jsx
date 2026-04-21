export const LoginForm = ({ onForgot }) => {
    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email o Usuario 
                </label>
                <input 
                    type="text" 
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />    
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />    
            </div>

            <button 
                type="submit" 
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
                Iniciar Sesión
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