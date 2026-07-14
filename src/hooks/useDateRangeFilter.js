// hooks/useDateRangeFilter.js

import { useCallback } from "react";
import { filterByDateRange } from "../utils/dateRangeFilter";

// Custom hook to handle filtering data based on a date range
// Props:
// - data: array of objects to filter
// - dateKey: string key in each object representing the date field
// - onFilter: callback function to receive the filtered data
export const useDateRangeFilter = ({ data, dateKey, onFilter }) => {

  // Callback to apply the date range filter
  const handleApply = useCallback(
    (range) => {
      // Ensure range has exactly 2 dates (start and end)
      if (range?.length === 2) {
        // Call utility function to filter data based on the date range
        const filtered = filterByDateRange(data, dateKey, range);
        // Send filtered data back via onFilter callback
        onFilter(filtered);
      }
    },
    [data, dateKey, onFilter] // Dependencies: recompute if these change
  );

  // Callback to reset filter when user cancels
  const handleCancel = useCallback(() => {
    onFilter(data); // Reset to original data
  }, [data, onFilter]);

  // Return handlers for use in components
  return { handleApply, handleCancel };
};
