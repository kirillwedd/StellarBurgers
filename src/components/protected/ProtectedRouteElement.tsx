import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

interface IProtectedRouteElementProps {
    isProtected: boolean;
    children?: React.ReactNode; // Добавлено свойство children
}

export function ProtectedRouteElement({ isProtected, children } : IProtectedRouteElementProps) {
    const isAuthenticated = useSelector((state : RootState) => state.users.isLoggedIn);
    const location = useLocation();

    if (isProtected && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isProtected && isAuthenticated) {
        if (location.pathname.match(/\/login|\/register|\/forgot-password|\/reset-password/)) {
            return <Navigate to={location.state?.from || "/"} replace />;
        }
    }

    return children ? children : <Outlet />;
}