import { Outlet, useLocation, useNavigate } from "react-router";
import { isAuthenticated } from "../hooks/useAuth.ts";
import { useEffect } from "react";

function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function isUserLoggedIn() {
            const isAuth = await isAuthenticated();
            if (!isAuth) navigate("/login");
        }
        if (location.pathname !== "/login" && location.pathname !== "/signup")
            isUserLoggedIn();
    }, []);

    return <Outlet />;
}
export default AppLayout;
