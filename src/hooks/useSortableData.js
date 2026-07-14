import { useMemo, useState } from "react";

// parseDate helper to convert "DD/MM/YYYY" string into Date object
// Useful for sorting date columns
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day); // month is 0-indexed
};

// Custom hook to provide sortable data functionality
// Params:
// - data: array of objects to sort
// - initialConfig: initial sorting configuration { key: string, direction: 'asc' | 'desc' }
const useSortableData = (data, initialConfig = { key: null, direction: "asc" }) => {
  const [sortConfig, setSortConfig] = useState(initialConfig);

  // Memoized sorted data to avoid unnecessary re-sorting
  const sortedData = useMemo(() => {
    // If no sort key is specified, return original data
    if (!sortConfig?.key) return data;

    // Create a shallow copy of data to sort
    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortConfig?.key];
      let bValue = b[sortConfig?.key];

      // Handle different types of values
      if (sortConfig?.key === "date") {
        aValue = parseDate(aValue); // Convert date strings to Date objects
        bValue = parseDate(bValue);
      } else if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseFloat(aValue); // Convert numeric strings to numbers
        bValue = parseFloat(bValue);
      } else {
        aValue = String(aValue).toLowerCase(); // Convert strings to lowercase for case-insensitive sorting
        bValue = String(bValue).toLowerCase();
      }

      // Compare values based on sort direction
      if (aValue < bValue) return sortConfig?.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  // Function to trigger sorting by a given key
  const handleSort = (key) => {
    let direction = "asc";
    // Toggle direction if sorting by the same key again
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Return sorted data, current sort config, and handler to trigger sorting
  return { sortedData, sortConfig, handleSort };
};

export default useSortableData;
