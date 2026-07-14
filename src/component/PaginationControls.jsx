const PaginationControls = ({ currentPage, totalPages, pageSize, totalItems, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="influ-pagi">
            <ul>
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        <span aria-hidden="true">&#8249;</span>
                    </button>
                </li>

                {pages.map((page) => (
                    <li key={page} className={page === currentPage ? 'active' : ''}>
                        <button type="button" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        <span aria-hidden="true">&#8250;</span>
                    </button>
                </li>
            </ul>

            <p>
                Showing {totalItems === 0 ? 0 : `${start}–${end}`} of {totalItems} results
            </p>
        </div>
    )
}

export default PaginationControls;
