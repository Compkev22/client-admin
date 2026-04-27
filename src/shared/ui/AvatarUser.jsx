import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import defaultAvatarImg from "../../assets/img/avatarDefault-1749508519496.png";

export const AvatarUser = () => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false); // ✅ Corchetes correctos
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        // ✅ Limpieza del evento (Buena práctica)
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    // ✅ Validación robusta de la imagen
const avatarSrc = (user?.profilePicture && user.profilePicture.length > 5) 
    ? user.profilePicture 
    : defaultAvatarImg;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Imagen que actúa como botón */}
            <img
                onClick={toggleMenu}
                src={avatarSrc}
                alt={user?.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:border-main-blue transition-all"
            />

            {/* Menú Desplegable */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl animate-fadeIn z-[100]">
                    <div className="px-4 py-3 border-b bg-gray-50 rounded-t-xl">
                        <p className="font-bold text-gray-800 leading-tight">{user?.username || "Usuario"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || "sin-email@ksports.com"}</p>
                    </div>

                    <ul className="p-2 text-sm text-gray-700 font-medium">
                        <li>
                            <Link to="/dashboard" className="block w-full p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users" className="block w-full p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                                Usuarios
                            </Link>
                        </li>
                        <div className="my-1 border-t border-gray-100"></div>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left p-2.5 rounded-lg hover:bg-red-50 text-red-600 font-semibold transition-colors"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};