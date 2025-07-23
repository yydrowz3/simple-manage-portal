import { useAtomValue } from "jotai";
import { studentSearchConditionAtom } from "../../atoms/search.ts";
import { useStudentList } from "../../hooks/useStudentList.ts";
import { useCountStudents } from "../../hooks/useCountStudents.ts";
import Loading from "../../ui/Loading.tsx";
import Pagination from "../../ui/Pagination.tsx";
import StudentListItem from "./StudentListItem.tsx";

function StudentList() {
    const { studentList, isGetStudentListWithLimitPending, currentPage } =
        useStudentList();
    const { isCountStudentsPending, pageCount } = useCountStudents();
    const isLoading =
        isGetStudentListWithLimitPending || isCountStudentsPending;

    const studentSearchCondition = useAtomValue(studentSearchConditionAtom);

    // TODO: should triger the re-fetch operation with search conditions
    const filteredStudentList = studentList.filter((studentItem) => {
        if (studentSearchCondition.length) {
            return;
        }
        const studentInfoJSON = JSON.stringify([
            studentItem.name?.toLowerCase(),
            studentItem.class,
            studentItem.gender,
            studentItem.grade,
        ]);

        for (const condition of studentSearchCondition) {
            if (!studentInfoJSON.includes(condition)) {
                return false;
            }
        }

        return true;
    });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudentList.map((studentItem) => (
                                    <StudentListItem
                                        key={studentItem.id}
                                        studentItem={studentItem}
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
export default StudentList;
