import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createTeacherApi } from "../services/apiTeacher.ts";
import { toast } from "sonner";
import { signupApi } from "../services/apiAuth.ts";

export function useSignup() {
    const navigate = useNavigate();

    const { mutate: createTeacherMutate, isPending: isCreateTeacherPending } =
        useMutation({
            mutationFn: createTeacherApi,
            onSuccess: () => {
                toast.success("Signup Success");
                navigate("/login");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });

    const { mutate: signupMutate, isPending: isSignupPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => signupApi(email, password),
        onSuccess: (userData) => {
            createTeacherMutate({ teacher_id: userData.user?.id });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const isLoading = isSignupPending || isCreateTeacherPending;

    return { signupMutate, isLoading };
}
