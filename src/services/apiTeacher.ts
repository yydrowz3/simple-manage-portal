import { supabase } from "../utils/supabase.ts";
import type { TeacherType } from "../types/typeTeacher.ts";

export async function createTeacherApi(teacherData: TeacherType) {
    const { error } = await supabase.from("tb_teacher").insert([teacherData]);

    if (error) {
        // console.log(error.message);
        throw new Error(error.message);
    }
}

export async function getTeacherByTeacherIdApi(teacherId: string) {
    const { data: teacher, error } = await supabase
        .from("tb_teacher")
        .select("*")
        .eq("teacher_id", teacherId);
    if (error) {
        // console.log(error.message);
        throw new Error(error.message);
    }
    return teacher;
}
