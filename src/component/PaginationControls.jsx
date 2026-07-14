// PaginationControls component displays pagination links and info
// Props:
// - currentPage: current active page number
// - totalPages: total number of pages
// - pageSize: number of items per page
// - totalItems: total number of items
// - onPageChange: callback function when page is changed
const PaginationControls = ({ currentPage, totalPages, pageSize, totalItems, onPageChange }) => {
    // Create an array of page numbers [1, 2, ..., totalPages]
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Calculate the start and end item numbers for the current page
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="influ-pagi">
            <ul>
                {/* Previous page button */}
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </li>

                {/* Page number buttons */}
                {pages.map((page) => (
                    <li key={page} className={page === currentPage ? 'active' : ''}>
                        <button type="button" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next page button */}
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </li>
            </ul>

            {/* Display info about the range of items currently shown */}
            <p>
                Showing {totalItems === 0 ? 0 : `${start}–${end}`} of {totalItems} results
            </p>
        </div>
    )
}

// Export component for use in paginated lists
export default PaginationControls;
