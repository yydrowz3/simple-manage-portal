import { useEffect, useState } from "react";
import getConfig from "../utils/configHelper.ts";
import { useMutation } from "@tanstack/react-query";
import { countStudentApi } from "../services/apiStudent.ts";
import { toast } from "sonner";
import getUserId from "../utils/userHelper.ts";

export function useCountStudents() {
    const pageSize = getConfig("PAGE_SIZE");
    const [studentCount, setStudentCount] = useState(1);
    const pageCount = Math.ceil(studentCount / pageSize);

    const { mutate: countStudentsMutate, isPending: isCountStudentsPending } =
        useMutation({
            mutationFn: countStudentApi,
            onSuccess: (countStudentsData) =>
                setStudentCount(countStudentsData || 1),
            onError: (error) => {
                toast.error(error.message);
            },
        });

    useEffect(() => {
        countStudentsMutate(getUserId());
    }, []);

    return { isCountStudentsPending, pageCount };
}
