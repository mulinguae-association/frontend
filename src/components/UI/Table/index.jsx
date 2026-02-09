import React, { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Table.scss";

const Table = ({ columns, data, pageSize = 10 }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  // Removed columnFilters state
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering logic
  const filteredData = useMemo(() => {
    let filtered = data;
    // Global search
    if (globalFilter) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.key] ?? "")
            .toLowerCase()
            .includes(globalFilter.toLowerCase()),
        ),
      );
    }
    return filtered;
  }, [data, globalFilter, columns]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Handlers
  // Removed handleColumnFilter
  const handleGlobalFilter = (e) => {
    setGlobalFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="table-wrapper">
      <div className="table-filters">
        <input
          className="table-global-search"
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={handleGlobalFilter}
        />
      </div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>No data found.</td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          <FaChevronLeft />
        </button>
        {(() => {
          const pages = [];
          const maxVisible = 2; // pages before/after current
          let start = Math.max(2, currentPage - maxVisible);
          let end = Math.min(totalPages - 1, currentPage + maxVisible);
          // Always show first page
          pages.push(
            <button
              key={1}
              className={currentPage === 1 ? "active" : ""}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>,
          );
          // Ellipsis before
          if (start > 2) {
            pages.push(
              <span key="start-ellipsis" className="pagination-ellipsis">
                ...
              </span>,
            );
          }
          // Middle pages
          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                className={currentPage === i ? "active" : ""}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </button>,
            );
          }
          // Ellipsis after
          if (end < totalPages - 1) {
            pages.push(
              <span key="end-ellipsis" className="pagination-ellipsis">
                ...
              </span>,
            );
          }
          // Always show last page
          if (totalPages > 1) {
            pages.push(
              <button
                key={totalPages}
                className={currentPage === totalPages ? "active" : ""}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>,
            );
          }
          return pages;
        })()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Table;
