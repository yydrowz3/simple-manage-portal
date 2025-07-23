function HomeFooter() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0 left-0 right-0">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </aside>
        </footer>
    );
}
export default HomeFooter;
