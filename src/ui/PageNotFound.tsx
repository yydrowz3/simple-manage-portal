import { useNavigate } from "react-router";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-8xl mb-4">404 Not Found</h1>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </main>
        </>
    );
}
export default PageNotFound;
