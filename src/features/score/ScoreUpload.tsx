import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import getUserId from "../../utils/userHelper.ts";
import { getStudentListApi } from "../../services/apiStudent.ts";
import type { StudentType } from "../../types/typeStudent.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ScoreType } from "../../types/typeScore.ts";
import { createScoreApi } from "../../services/apiScore.ts";
import ErrorMessage from "../../ui/ErrorMessage.tsx";
import Loading from "../../ui/Loading.tsx";

function ScoreUpload() {
    const navigate = useNavigate();
    const validationSchema = yup
        .object({
            score: yup
                .number()
                .typeError("Please type correct number")
                .integer()
                .positive()
                .max(100),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [students, setStudents] = useState([] as StudentType[]);
    const [currentStudent, setCurrentStudent] = useState<StudentType>({
        name: "someone",
        student_id: "123456789",
        class: 1,
        grade: 3,
    });
    const [score] = useState(80);

    const [subject, setSubject] = useState("math");

    const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
    const [semesterSeason, setSemesterSeason] = useState("spring");

    const yearList = Array.from(
        { length: new Date().getFullYear() - 2000 + 1 },
        (_, idx) => 2000 + idx
    );

    async function fetchStudentDataByUserId() {
        const userId = getUserId();
        const studentList = await getStudentListApi(userId);
        setCurrentStudent(studentList[0]);
        setStudents(studentList);
    }

    const {
        mutate: fetchStudentDataByUserIdMutate,
        isPending: isFetchStudentDataByUserIdPending,
    } = useMutation({
        mutationFn: fetchStudentDataByUserId,
        onSuccess: () => {
            toast.success("Fetch Score Data Success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        fetchStudentDataByUserIdMutate();
    }, []);

    const { mutate: createScoreMutate, isPending: isCreatScorePending } =
        useMutation({
            mutationFn: ({ newScore }: { newScore: ScoreType }) =>
                createScoreApi(newScore),
            onSuccess: () => {
                toast.dismiss();
                toast.success("Create Score Success");
                navigate("/portal/score");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });

    async function handleScoreCreateSubmit({ score }: { score?: number }) {
        toast.dismiss();
        toast.loading("Creating Score...");
        const newScore = {
            student_id: currentStudent.student_id,
            score: score,
            subject: subject,
            semester_season: semesterSeason,
            semester_year: semesterYear,
        };
        createScoreMutate({ newScore });
    }

    return (
        <>
            {isFetchStudentDataByUserIdPending ? (
                <Loading />
            ) : (
                <>
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content flex-col lg:flex-row-reverse w-2/5">
                            <div className="card  bg-base-100 w-full shrink-0 shadow-2xl">
                                <div className="card-body">
                                    <form
                                        className="fieldset"
                                        onSubmit={handleSubmit(
                                            handleScoreCreateSubmit
                                        )}
                                    >
                                        <select
                                            className="select select-bordered w-full"
                                            value={currentStudent.student_id}
                                            onChange={(e) => {
                                                const selectedStudent =
                                                    students.find(
                                                        (student) =>
                                                            student.student_id ===
                                                            e.target.value
                                                    );
                                                setCurrentStudent(
                                                    selectedStudent || {}
                                                );
                                            }}
                                        >
                                            <option disabled>
                                                Choose Student
                                            </option>
                                            {students.map((student, idx) => (
                                                <option
                                                    key={idx}
                                                    value={student.student_id}
                                                ></option>
                                            ))}
                                        </select>

                                        <label className="label">
                                            Affiliation
                                        </label>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            placeholder="Display Name"
                                            value={`Class ${currentStudent.class} | Year ${currentStudent.grade}`}
                                            disabled
                                        />
                                        <label className="label">Score</label>
                                        <input
                                            type="number"
                                            className="input w-full"
                                            defaultValue={score}
                                            {...register("score")}
                                        />
                                        {errors.score && (
                                            <ErrorMessage>
                                                {errors.score.message}
                                            </ErrorMessage>
                                        )}
                                        <label className="label">Subject</label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={subject}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                        >
                                            <option disabled>
                                                Choose Subject
                                            </option>
                                            <option>math</option>
                                            <option>english</option>
                                            <option>physics</option>
                                            <option>chemistry</option>
                                            <option>biology</option>
                                        </select>
                                        <label className="label">
                                            Semester
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <select
                                                className="select select-bordered w-full"
                                                value={semesterYear}
                                                onChange={(e) =>
                                                    setSemesterYear(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            >
                                                <option disabled>
                                                    Choose Year
                                                </option>
                                                {yearList.map((year) => (
                                                    <option key={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="select select-bordered w-full"
                                                value={semesterSeason}
                                                onChange={(e) =>
                                                    setSemesterSeason(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option disabled>
                                                    Choose Season
                                                </option>
                                                <option>spring</option>
                                                <option>autumn</option>
                                            </select>
                                        </div>

                                        <button
                                            className="btn btn-neutral mt-4"
                                            type="submit"
                                            disabled={isCreatScorePending}
                                        >
                                            Upload Score
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default ScoreUpload;
