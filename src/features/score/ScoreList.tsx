import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { isStudentAtom } from "../../atoms/user.ts";
import { scoreSearchConditionAtom } from "../../atoms/search.ts";
import type { StudentType } from "../../types/typeStudent.ts";
import type { ScoreType } from "../../types/typeScore.ts";
import { useMutation } from "@tanstack/react-query";
import getUserId from "../../utils/userHelper.ts";
import { getScoreListApi } from "../../services/apiScore.ts";
import {
    getStudentByStudentIdApi,
    getStudentListApi,
} from "../../services/apiStudent.ts";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import getConfig from "../../utils/configHelper.ts";
import Loading from "../../ui/Loading.tsx";
import Pagination from "../../ui/Pagination.tsx";
import ScoreListItem from "./ScoreListItem.tsx";

function ScoreList() {
    const [scoreList, setScoreList] = useState([] as ScoreType[]);
    const [students, setStudents] = useState([] as StudentType[]);
    const isStudent = useAtomValue(isStudentAtom);
    const scoreSearchCondition = useAtomValue(scoreSearchConditionAtom);
    // const [isLoading, setIsLoading] = useState(true);

    const filteredScoreList = scoreList.filter((scoreItem: ScoreType) => {
        return students
            .map((student) => student.student_id)
            .includes(scoreItem.student_id);
    });

    // 这个地方是derived state，只是计算出来的，修改成useMemo
    const filteredScoreListBySearch = filteredScoreList.filter(
        (scoreItem: ScoreType) => {
            if (!scoreSearchCondition.length) return true;
            const scoreInfoJSON = JSON.stringify([
                scoreItem.subject?.toLowerCase(),
                scoreItem.semester_season?.toLowerCase(),
                scoreItem.score,
                scoreItem.semester_year,
            ]);

            for (const condition of scoreSearchCondition) {
                if (!scoreInfoJSON.includes(condition)) {
                    return false;
                }
            }
            return true;
        }
    );

    // 这个地方可以修改后端的api
    async function fetchScoreData() {
        const userId = getUserId();
        const scoreListData = await getScoreListApi();
        setScoreList(scoreListData);
        if (!isStudent) {
            const studentList = await getStudentListApi(userId);
            setStudents(studentList);
        } else {
            const studentList = await getStudentByStudentIdApi(userId);
            setStudents(studentList);
        }
    }

    const { mutate: fetchScoreDataMutate, isPending } = useMutation({
        mutationFn: () => fetchScoreData(),
        onSuccess: () => {
            toast.success("Score Data Loading Success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (isStudent === null) return;
        fetchScoreDataMutate();
    }, [isStudent]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );
    const pageSize = getConfig("PAGE_SIZE") || 10;
    const pageCount = Math.ceil(filteredScoreListBySearch.length / pageSize);

    // 这边可以优化为触发分页的时候自动修改
    useEffect(() => {
        setSearchParams({ page: String(currentPage) });
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(Number(searchParams.get("page")) || 1);
    }, [searchParams.get("page")]);

    const filteredScoreListByPage = filteredScoreListBySearch.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            {isPending ? (
                <Loading />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Subject</th>
                                    <th>Semester</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 &&
                                    filteredScoreListByPage.map((scoreItem) => (
                                        <ScoreListItem
                                            key={scoreItem.id}
                                            scoreItem={scoreItem}
                                            currentStudent={
                                                isStudent
                                                    ? students[0]
                                                    : students.find(
                                                          (student) =>
                                                              student.student_id ===
                                                              scoreItem.student_id
                                                      ) || {
                                                          name: "Someone",
                                                          class: 1,
                                                          grade: 3,
                                                      }
                                            }
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                    />
                </>
            )}
        </>
    );
}
export default ScoreList;
