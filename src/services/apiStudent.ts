import { supabase } from "../utils/supabase.ts";
import type { StudentType } from "../types/typeStudent.ts";

export async function getStudentListWithLimitApi(
    teacherId: string,
    currentPage: number,
    pageSize: number
) {
    const { data, error } = await supabase
        .from("tb_student")
        .select()
        .eq("teacher_id", teacherId)
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getStudentListApi(teacherId: string) {
    const { data, error } = await supabase
        .from("tb_student")
        .select()
        .eq("teacher_id", teacherId);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function countStudentApi(teacherId: string) {
    const { error, count } = await supabase
        .from("tb_student")
        .select("*", { count: "exact", head: true })
        .eq("teacher_id", teacherId);
    if (error) {
        throw new Error(error.message);
    }
    // return data.length;
    return count;
}

export async function createStudentApi(newStudent: StudentType) {
    const { data, error } = await supabase
        .from("tb_student")
        .insert([newStudent])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getStudentByStudentIdApi(studentId: string) {
    const { data, error } = await supabase
        .from("tb_student")
        .select()
        .eq("student_id", studentId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getStudentByStudentTableIdApi(studentTableId: number) {
    const { data, error } = await supabase
        .from("tb_student")
        .select()
        .eq("id", studentTableId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateStudentApi(
    studentId: string,
    newStudent: StudentType
) {
    const { data, error } = await supabase
        .from("tb_student")
        .update(newStudent)
        .eq("student_id", studentId)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateStudentByTableIdApi(
    studentTableId: number,
    newStudent: StudentType
) {
    const { data, error } = await supabase
        .from("tb_student")
        .update(newStudent)
        .eq("id", studentTableId)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
