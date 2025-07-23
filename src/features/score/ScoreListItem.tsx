import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { isStudentAtom } from "../../atoms/user.ts";
import type { ScoreType } from "../../types/typeScore.ts";
import type { StudentType } from "../../types/typeStudent.ts";

function ScoreListItem({
    scoreItem,
    currentStudent,
}: {
    scoreItem: ScoreType;
    currentStudent: StudentType;
}) {
    const navigate = useNavigate();
    const isStudent = useAtomValue(isStudentAtom);

    // Score Delete Implement

    return (
        <tr>
            <td>{currentStudent.name}</td>
            <td>{`Class ${currentStudent.class} | Year ${currentStudent.grade}`}</td>
            <td>{scoreItem.subject}</td>
            <td>
                {scoreItem.semester_season} {scoreItem.semester_year}
            </td>
            <td>{scoreItem.score}</td>
            {!isStudent && (
                <th>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                            navigate(`/portal/score/${scoreItem.id}`)
                        }
                    >
                        details
                    </button>
                    <button className="btn btn-error btn-sm">delete</button>
                </th>
            )}
        </tr>
    );
}
export default ScoreListItem;
