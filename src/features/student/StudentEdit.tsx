import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import {
    getStudentByStudentIdApi,
    updateStudentApi,
} from "../../services/apiStudent.ts";
import { toast } from "sonner";
import type { StudentType } from "../../types/typeStudent.ts";
import { uploadAvatarApi } from "../../services/apiStorage.ts";
import getConfig from "../../utils/configHelper.ts";
import ErrorMessage from "../../ui/ErrorMessage.tsx";
import Loading from "../../ui/Loading.tsx";

function StudentEdit() {
    const params = useParams();
    const navigate = useNavigate();

    const validationSchema = yup
        .object({
            name: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [gender, setGender] = useState("male");
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState(
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    );

    const {
        mutate: getStudentByStudentIdMutate,
        isPending: isGetStudentByStudentIdPending,
    } = useMutation({
        mutationFn: ({ id }: { id: string }) => getStudentByStudentIdApi(id),
        onSuccess: (students) => {
            const student = students[0];
            setValue("name", student.name);
            setGender(student.gender);
            setCurrentAvatarUrl(student.avatar);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        getStudentByStudentIdMutate({ id: params.id || "0" });
    }, []);

    const [avatarFile, setAvatarFile] = useState<File>();
    function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setAvatarFile(file);

        if (!file) return;
        const newAvatarUrl = URL.createObjectURL(file);
        setCurrentAvatarUrl(newAvatarUrl);
    }

    const { mutate: updateStudentMutate, isPending: isUpdateStudentPending } =
        useMutation({
            mutationFn: ({
                id,
                newStudent,
            }: {
                id: string;
                newStudent: StudentType;
            }) => updateStudentApi(id, newStudent),
            onSuccess: () => {
                toast.dismiss();
                toast.success("Successfully updated");
                navigate("/portal/student");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });

    const [isUploading, setIsUploading] = useState(false);
    async function onUpdateStudentSubmit({ name }: { name: string }) {
        toast.loading("Updating...");

        const newStudent: StudentType = {
            name,
            gender,
        };

        if (avatarFile) {
            setIsUploading(true);

            // Build avatar filename
            const token = getConfig("SUPABASE_TOKEN");

            const userToken = JSON.parse(localStorage.getItem(token) || "{}");
            const avatarFilename = `${userToken.user.email}-${Date.now()}.png`;

            // Upload avatar file(do not hookify with useMutation)
            await uploadAvatarApi(avatarFile, avatarFilename);

            const supabaseUrl = getConfig("SUPABASE_URL");
            newStudent.avatar = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFilename}`;

            setIsUploading(false);
        }

        // Update student in supabase
        updateStudentMutate({ id: params.id || "0", newStudent });
    }

    const isUpdatingStudent = isUpdateStudentPending || isUploading;

    return (
        <>
            {isGetStudentByStudentIdPending ? (
                <Loading />
            ) : (
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse w-2/5">
                        <div className="card  bg-base-100 w-full shrink-0 shadow-2xl">
                            <div className="card-body">
                                <form
                                    className="fieldset"
                                    onSubmit={handleSubmit(
                                        onUpdateStudentSubmit
                                    )}
                                >
                                    <div className="avatar justify-center">
                                        <div className="w-1/3 rounded-full">
                                            <label
                                                htmlFor="avatar-input"
                                                className="cursor-pointer"
                                            >
                                                <img src={currentAvatarUrl} />
                                            </label>
                                        </div>
                                    </div>
                                    <input
                                        id="avatar-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
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
                                    <label className="label">Gender</label>
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
                                        disabled={isUpdatingStudent}
                                    >
                                        Update Student
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
export default StudentEdit;
