// utils/dateRangeFilter.js

import { isValid, parse } from 'date-fns';

/**
 * normalizeDate
 * --------------
 * Utility function to normalize a date into a valid JavaScript Date object
 * with time set to 00:00:00.000 (start of the day).
 *
 * @param {string|Date|null} date - Input date in string (e.g. "dd/MM/yyyy"),
 *                                  Date object, or null.
 * @returns {Date|null} - Returns normalized Date object or null if invalid.
 */
export const normalizeDate = (date) => {
    if (!date) return null; // Return null if no date is provided

    let parsedDate;

    if (typeof date === 'string') {
        // Try parsing string in "dd/MM/yyyy" format
        parsedDate = parse(date, 'dd/MM/yyyy', new Date());

        // If parsing fails, fallback to default Date constructor
        if (!isValid(parsedDate)) {
            parsedDate = new Date(date);
        }
    } else {
        // If already a Date object (or timestamp), convert directly
        parsedDate = new Date(date);
    }

    // Validate the parsed date
    if (!isValid(parsedDate)) return null;

    // Normalize to the start of the day (ignore time component)
    parsedDate.setHours(0, 0, 0, 0);

    return parsedDate;
};

/**
 * filterByDateRange
 * ------------------
 * Filters an array of objects based on a date range.
 *
 * @param {Array} data - Array of objects to filter.
 * @param {string} key - Object key that contains the date to check.
 * @param {[string|Date, string|Date]} [start, end] - Range boundaries.
 * @returns {Array} - Filtered data containing only items within the date range.
 */
export const filterByDateRange = (data, key, [start, end]) => {
    const startDate = normalizeDate(start); // Normalize start date
    const endDate = normalizeDate(end);     // Normalize end date

    return data.filter((item) => {
        const itemDate = normalizeDate(item?.[key]); // Normalize item's date
        // Keep item if within the inclusive date range
        return itemDate >= startDate && itemDate <= endDate;
    });
};
