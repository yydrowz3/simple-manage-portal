import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import getConfig from "../../utils/configHelper.ts";
import { getTeacherByTeacherIdApi } from "../../services/apiTeacher.ts";
import { toast } from "sonner";
import { signupApi } from "../../services/apiAuth.ts";
import { createStudentApi } from "../../services/apiStudent.ts";
import { faker } from "@faker-js/faker";
import Loading from "../../ui/Loading.tsx";
import ErrorMessage from "../../ui/ErrorMessage.tsx";

function StudentCreate() {
    const navigate = useNavigate();
    const validationSchema = yup
        .object({
            email: yup.string().required().email(),
            name: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [isLoading, setIsLoading] = useState(true);
    const [teacherId, setTeacherId] = useState("");
    const [classInChargeArr, setClassInChargeArr] = useState([]);
    const [classInfo, setClassInfo] = useState("x|x");
    const [gender, setGender] = useState("male");

    useEffect(() => {
        const token = getConfig("SUPABASE_TOKEN");
        const userToken = JSON.parse(localStorage.getItem(token) || "{}");

        if (!userToken) {
            return;
        }
        setTeacherId(userToken.user.id);

        async function fetchData() {
            setIsLoading(true);
            // TODO: rebuild with mutation
            const teachers = await getTeacherByTeacherIdApi(userToken.user.id);
            const classInChargeArrData = await JSON.parse(
                teachers[0].class_in_charge
            );
            setClassInChargeArr(classInChargeArrData);
            setClassInfo(classInChargeArrData[0]);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    async function onCreateStudentSubmit({
        email,
        name,
    }: {
        email: string;
        name: string;
    }) {
        toast.loading("Creating...");

        // Signup student user
        // TODO: rebuild with mutation
        const userData = await signupApi(email, "123456", { isStudent: true });

        // Insert student
        // TODO: rebuild with mutation
        const students = await createStudentApi({
            name,
            class: Number(classInfo.split("|")[0]),
            grade: Number(classInfo.split("|")[1]),
            gender,
            teacher_id: teacherId,
            avatar: faker.image.avatar(),
            student_id: userData.user?.id,
        });
        console.log(students);

        toast.dismiss();
        toast.success("Successfully created");
        navigate("/portal/student");
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse w-2/5">
                        <div className="card  bg-base-100 w-full shrink-0 shadow-2xl">
                            <div className="card-body">
                                <form
                                    className="fieldset"
                                    onSubmit={handleSubmit(
                                        onCreateStudentSubmit
                                    )}
                                >
                                    <label className="label">
                                        Student Email
                                    </label>
                                    <input
                                        type="text"
                                        className="input w-full"
                                        defaultValue="student@example.com"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <ErrorMessage>
                                            {errors.email.message}
                                        </ErrorMessage>
                                    )}
                                    <label className="label">
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        className="input w-full"
                                        defaultValue="John Doe"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <ErrorMessage>
                                            {errors.name.message}
                                        </ErrorMessage>
                                    )}
                                    <select
                                        className="select select-bordered w-full mb-4"
                                        value={classInfo}
                                        onChange={(e) =>
                                            setClassInfo(e.target.value)
                                        }
                                    >
                                        <option disabled>Choose Class</option>
                                        {classInChargeArr.map(
                                            (item: string) => (
                                                <option key={item} value={item}>
                                                    Class {item.split("|")[1]} |
                                                    Year {item.split("|")[0]}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <select
                                        className="select select-bordered w-full mb-4"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    >
                                        <option disabled>Choose Gender</option>
                                        <option>male</option>
                                        <option>female</option>
                                    </select>

                                    <button
                                        className="btn btn-neutral mt-4"
                                        type="submit"
                                        // disabled={isCreatingStudent}
                                    >
                                        Create Student
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default StudentCreate;
