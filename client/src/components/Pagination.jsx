import React from 'react';
import useScreenSize from '../hooks/useScreenSize';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const screenSize = useScreenSize();
  const isSmallScreen = screenSize < 640;
  const pageNumbersToShow = isSmallScreen ? 5 : 10;

  let startPage = Math.max(currentPage - Math.floor(pageNumbersToShow / 2), 1);
  let endPage = startPage + pageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - pageNumbersToShow + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      {totalPages > 1 && (
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-2 py-1 sm:px-3 sm:py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
          >
            Previous
          </button>
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 py-1 sm:px-3 sm:py-2 border rounded ${page === currentPage ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`px-2 py-1 sm:px-3 sm:py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Pagination;
