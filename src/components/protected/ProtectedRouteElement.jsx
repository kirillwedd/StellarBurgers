import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRouteElement({isProtected, children }) {
    const isAuthenticated = localStorage.getItem('isAuthorized')==='true';
    const location=useLocation();

    if (isProtected) {
        
        if (!isAuthenticated) {
            
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    } else {
        
        if (isAuthenticated) {
        
            if (location.pathname.match(/\/login|\/register|\/forgot-password|\/reset-password/)) {
                return <Navigate to="/" replace />;
            }
        }
    }


    return children ? children : <Outlet />;
}