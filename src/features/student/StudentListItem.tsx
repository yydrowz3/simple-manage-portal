import { useNavigate } from "react-router";
import type { StudentType } from "../../types/typeStudent.ts";

function StudentListItem({ studentItem }: { studentItem: StudentType }) {
    const navigate = useNavigate();

    // TODO: reconstructure student table: add Column available for delete, add uuid student_id as foreign key
    return (
        <>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={studentItem.avatar}
                                    alt="student avatar"
                                />
                            </div>
                        </div>
                        {/* name and gender */}
                        <div>
                            <div className="font-bold">{studentItem.name}</div>
                            <div className="text-sm opacity-50">
                                {studentItem.gender}
                            </div>
                        </div>
                    </div>
                </td>
                {/* class and room teacher */}
                <td>
                    class {studentItem.class} | year {studentItem.grade}
                </td>
                <th>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                            navigate(
                                `/portal/student/${studentItem.student_id}`
                            )
                        }
                    >
                        details
                    </button>
                    <button className="btn btn-error btn-sm">delete</button>
                </th>
            </tr>
        </>
    );
}
export default StudentListItem;
