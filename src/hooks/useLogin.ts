import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/apiAuth.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { userAtom } from "../atoms/user.ts";
import { useAtom } from "jotai";

export function useLogin() {
    const navigate = useNavigate();
    const [, setUser] = useAtom(userAtom);

    const { mutate, isPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => loginApi(email, password),
        onSuccess: (userData) => {
            toast.success("Login Success");
            // console.log(userData);
            // const { avatar, isStudent } = userData.user.user_metadata;
            // setUser({ avatar, isStudent });
            setUser(userData.user.user_metadata);

            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate, isPending };
}
