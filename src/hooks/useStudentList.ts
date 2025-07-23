import { useSearchParams } from "react-router";
import getConfig from "../utils/configHelper.ts";
import { useEffect, useState } from "react";
import getUserId from "../utils/userHelper.ts";
import { useMutation } from "@tanstack/react-query";
import { getStudentListWithLimitApi } from "../services/apiStudent.ts";
import type { StudentType } from "../types/typeStudent.ts";
import { toast } from "sonner";

export function useStudentList() {
    const userId = getUserId();

    const pageSize = getConfig("PAGE_SIZE");
    const [searchParams, setSearchParams] = useSearchParams();
    const [studentList, setStudentList] = useState([] as StudentType[]);
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );

    const {
        mutate: getStudentListWithLimitMutate,
        isPending: isGetStudentListWithLimitPending,
    } = useMutation({
        mutationFn: ({
            userId,
            currentPage,
            pageSize,
        }: {
            userId: string;
            currentPage: number;
            pageSize: number;
        }) => getStudentListWithLimitApi(userId, currentPage, pageSize),
        onSuccess: (studentListData) => setStudentList(studentListData),
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        setSearchParams({ page: String(currentPage) });
        getStudentListWithLimitMutate({ userId, currentPage, pageSize });
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(Number(searchParams.get("page")) || 1);
    }, [searchParams.get("page")]);

    return {
        studentList,
        isGetStudentListWithLimitPending,
        getStudentListWithLimitMutate,
        currentPage,
    };
}
