import { useSearchParams } from "react-router";

function Pagination({ currentPage = 1, pageCount = 1 }) {
    const [, setSearchParams] = useSearchParams();

    return (
        <div className="join flex items-center justify-center mt-10">
            {new Array(pageCount).fill(1).map((_, idx) => (
                <button
                    className={`join-item btn btn-lg ${
                        currentPage == idx + 1 ? "btn-disabled" : ""
                    }`}
                    onClick={() => setSearchParams({ page: String(idx + 1) })}
                    key={idx}
                >
                    {idx + 1}
                </button>
            ))}
        </div>
    );
}
export default Pagination;
