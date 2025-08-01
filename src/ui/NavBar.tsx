import { useLocation, useNavigate } from "react-router";
import ToggleTheme from "./ToggleTheme.tsx";
import { signoutApi } from "../services/apiAuth.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAtom, useAtomValue } from "jotai";
import { isStudentAtom, userAtom } from "../atoms/user.ts";
import { useEffect } from "react";
import getConfig from "../utils/configHelper.ts";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isStudent = useAtomValue(isStudentAtom);
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        const token = getConfig("SUPABASE_TOKEN");
        const localTokenData = localStorage.getItem(token);
        if (!localTokenData) return;
        const userToken = JSON.parse(localTokenData);
        if (userToken) {
            setUser(userToken.user.user_metadata);
        }
    }, []);

    const { mutate: signoutMutate } = useMutation({
        mutationFn: () => signoutApi(),
        onSuccess: () => {
            toast.success("Logout Success");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    {!isStudent && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li
                                className={
                                    location.pathname.includes("score")
                                        ? "menu-disabled"
                                        : ""
                                }
                            >
                                <a onClick={() => navigate("/portal/score")}>
                                    Score
                                </a>
                            </li>
                            <li
                                className={
                                    location.pathname.includes("student")
                                        ? "menu-disabled"
                                        : ""
                                }
                            >
                                <a onClick={() => navigate("/portal/student")}>
                                    Student
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
                <a
                    className="btn btn-ghost text-xl"
                    onClick={() => navigate("/portal")}
                >
                    Portal
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                {!isStudent && (
                    <ul className="menu menu-horizontal px-1">
                        <li
                            className={
                                location.pathname.includes("score")
                                    ? "menu-disabled"
                                    : ""
                            }
                        >
                            <a onClick={() => navigate("/portal/score")}>
                                Score
                            </a>
                        </li>
                        <li
                            className={
                                location.pathname.includes("student")
                                    ? "menu-disabled"
                                    : ""
                            }
                        >
                            <a onClick={() => navigate("/portal/student")}>
                                Student
                            </a>
                        </li>
                    </ul>
                )}
            </div>
            <div className="navbar-end">
                <ToggleTheme />
                <div className="ml-4"></div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img alt="navbar user avatar" src={user.avatar} />
                        </div>
                    </div>

                    {/* user actions */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a
                                className="justify-between"
                                onClick={() => navigate("/portal/profile")}
                            >
                                Profile
                            </a>
                        </li>

                        <li>
                            <a onClick={() => signoutMutate()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default NavBar;
