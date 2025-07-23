import { useNavigate } from "react-router";
import ToggleTheme from "../../ui/ToggleTheme.tsx";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../ui/ErrorMessage.tsx";
import { useLogin } from "../../hooks/useLogin.ts";

function Login() {
    const navigate = useNavigate();

    const { mutate, isPending } = useLogin();

    const validationSchema = yup
        .object({
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    function loginSubmit({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        mutate({ email, password });
    }

    return (
        <main className="flex flex-col justify-center h-screen bg-gradient-to-br from-violet-400 via-indigo-300 to-fuchsia-400">
            <div className="flex flex-row">
                <div className="basis-2/3 text-center"></div>
                <div className="basis-1/3 ">
                    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <div className="flex justify-between">
                                <h1 className="text-5xl font-bold">Login</h1>
                                <ToggleTheme />
                            </div>
                            <form
                                className="fieldset"
                                onSubmit={handleSubmit(loginSubmit)}
                            >
                                <label className="label">Email</label>
                                <label className="input">
                                    <svg
                                        className="h-[1em] opacity-50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            ></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="mail@site.com"
                                        {...register("email")}
                                    />
                                </label>
                                {errors.email && (
                                    <ErrorMessage>
                                        {errors.email.message}
                                    </ErrorMessage>
                                )}

                                <label className="label">Password</label>
                                <label className="input">
                                    <svg
                                        className="h-[1em] opacity-50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                            <circle
                                                cx="16.5"
                                                cy="7.5"
                                                r=".5"
                                                fill="currentColor"
                                            ></circle>
                                        </g>
                                    </svg>
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                </label>
                                {errors.password && (
                                    <ErrorMessage>
                                        {errors.password.message}
                                    </ErrorMessage>
                                )}

                                <div className="flex flex-row justify-between mt-4">
                                    <button
                                        className="btn basis-1/2 btn-primary"
                                        disabled={isPending}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="btn basis-1/4 btn-secondary"
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => navigate("/signup")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Login;
