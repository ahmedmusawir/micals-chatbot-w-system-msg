interface PaginationProps {
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItemCount: number;
}

const PaginationSimple = ({
  currentPage,
  onPageChange,
  pageSize,
  totalItemCount,
}: PaginationProps) => {
  const totalPageCount = Math.ceil(totalItemCount / pageSize);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPageCount;
  const startingItemNumber = (currentPage - 1) * pageSize + 1;
  const endingItemNumber = Math.min(currentPage * pageSize, totalItemCount);

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startingItemNumber}</span> to{" "}
          <span className="font-medium">{endingItemNumber}</span> of{" "}
          <span className="font-medium">{totalItemCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {canGoPrevious && (
          <button
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}

        {canGoNext && (
          <button
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </nav>
  );
};

export default PaginationSimple;
