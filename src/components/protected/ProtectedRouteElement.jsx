import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRouteElement({ isProtected, children }) {
    const isAuthenticated = useSelector(state => state.users.isLoggedIn);
    const location = useLocation();

    if (isProtected && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isProtected && isAuthenticated) {
        if (location.pathname.match(/\/login|\/register|\/forgot-password|\/reset-password/)) {
            return <Navigate to="/" replace />;
        }
    }

    return children ? children : <Outlet />;
}