import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Having a component-based version of the useNavigate hook makes it easier to use this feature in a React.Component subclass where hooks are not able to be used
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    console.log("protected route...");
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
