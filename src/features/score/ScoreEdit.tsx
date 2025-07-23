import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import {
    getScoreByScoreIdApi,
    updateScoreApi,
} from "../../services/apiScore.ts";
import { getStudentByStudentIdApi } from "../../services/apiStudent.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ScoreType } from "../../types/typeScore.ts";
import ErrorMessage from "../../ui/ErrorMessage.tsx";
import Loading from "../../ui/Loading.tsx";

function ScoreEdit() {
    const params = useParams();
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

    const [currentStudent, setCurrentStudent] = useState({
        name: "Someone",
        class: "1",
        grade: "3",
    });
    const [score, setScore] = useState(80);
    const [subject, setSubject] = useState("biology");

    const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
    const [semesterSeason, setSemesterSeason] = useState("spring");

    const yearList = Array.from(
        {
            length: new Date().getFullYear() - 2000 + 1,
        },
        (_, idx) => 2000 + idx
    );

    async function fetchScoreDataById() {
        const scores = await getScoreByScoreIdApi(Number(params.id));
        const scoreData = scores[0];
        setScore(scoreData.score);
        setSubject(scoreData.subject);
        setSemesterSeason(scoreData.semester_season);
        setSemesterYear(scoreData.semester_year);
        const students = await getStudentByStudentIdApi(scoreData.student_id);
        const student = students[0];
        setCurrentStudent(student);
    }

    const {
        mutate: fetchScoreDataByIdMutate,
        isPending: isFetchScoreDataByIdPending,
    } = useMutation({
        mutationFn: fetchScoreDataById,
        onSuccess: () => {
            toast.success("Fetch Score Data Success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        fetchScoreDataByIdMutate();
    }, []);

    const { mutate: updateScoreMutate, isPending: isUpDateScorePending } =
        useMutation({
            mutationFn: ({
                scoreId,
                newScore,
            }: {
                scoreId: number;
                newScore: ScoreType;
            }) => updateScoreApi({ scoreId, newSocre: newScore }),
            onSuccess: () => {
                toast.dismiss();
                toast.success("Update Score Success");
                navigate("/portal/score");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });

    async function handleScoreSubmit({ score }: { score?: number }) {
        toast.dismiss();
        toast.loading("Updating Score...");
        const newScore = {
            score: score,
            subject: subject,
            semester_season: semesterSeason,
            semester_year: semesterYear,
        };
        updateScoreMutate({ scoreId: Number(params.id), newScore });
    }

    return (
        <>
            {isFetchScoreDataByIdPending ? (
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
                                            handleScoreSubmit
                                        )}
                                    >
                                        <h1 className="text-center text-2xl">
                                            {currentStudent.name}
                                        </h1>
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
                                            <option disabled>math</option>
                                            <option disabled>english</option>
                                            <option disabled>physics</option>
                                            <option disabled>chemistry</option>
                                            <option disabled>biology</option>
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
                                            disabled={isUpDateScorePending}
                                        >
                                            Update Score
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
export default ScoreEdit;
