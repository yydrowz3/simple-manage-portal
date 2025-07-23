import { Outlet, useLocation } from "react-router";
import NavBar from "../../ui/NavBar.tsx";
import ToolBar from "../../ui/ToolBar.tsx";
import HomeFooter from "./HomeFooter.tsx";

function Home() {
    const location = useLocation();
    return (
        <>
            <NavBar />
            {location.pathname === "/portal/score" ||
            location.pathname === "/portal/student" ? (
                <ToolBar />
            ) : (
                ""
            )}
            <Outlet />
            <HomeFooter />
        </>
    );
}
export default Home;
