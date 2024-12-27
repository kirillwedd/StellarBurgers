import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

interface IProtectedRouteElementProps {
    isProtected: boolean;
    children?: React.ReactNode; 
}

export function ProtectedRouteElement({ isProtected, children } : IProtectedRouteElementProps) {
    const isAuthenticated = useAppSelector((state) => state.users.isLoggedIn);
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