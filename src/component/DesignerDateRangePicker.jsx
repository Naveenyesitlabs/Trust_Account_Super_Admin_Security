import { useEffect, useRef } from "react";

// DesignerDateRangePicker component wraps a jQuery Date Range Picker for React usage
// Props:
// - onApply: callback function when a date range is applied
// - onCancel: callback function when the picker is cleared/canceled
// - placeholder: optional placeholder text for the input
const DesignerDateRangePicker = ({ onApply, onCancel, placeholder }) => {
  // Ref to access the input element directly for jQuery plugin
  const inputRef = useRef(null);

  useEffect(() => {
    // Ensure jQuery ($) and daterangepicker plugin are loaded
    if (window.$ && window.$.fn.daterangepicker) {
      const $ = window.$;

      // Wrap the input DOM element with jQuery
      const input = $(inputRef.current);

      // Initialize daterangepicker on the input element
      input.daterangepicker(
        {
          autoUpdateInput: false, // Prevent automatic input update, we handle manually
          locale: {
            cancelLabel: "Clear", // Label for cancel button
          },
        },
        function (start, end) {
          // Optional callback when selecting a date range
          // Manually update input display
          input.val(`${start.format("MM/DD/YYYY")} - ${end.format("MM/DD/YYYY")}`);
        }
      );

      // Event handler for Apply action
      input.on("apply.daterangepicker", function (ev, picker) {
        // Call onApply callback with JavaScript Date objects
        if (onApply) {
          onApply([picker.startDate.toDate(), picker.endDate.toDate()]);
        }
        // Update input field to show selected date range
        input.val(`${picker.startDate.format("MM/DD/YYYY")} - ${picker.endDate.format("MM/DD/YYYY")}`);
      });

      // Event handler for Cancel/Clear action
      input.on("cancel.daterangepicker", function () {
        // Call onCancel callback if provided
        if (onCancel) {
          onCancel();
        }
        // Clear input display
        input.val("");
      });

      // Cleanup function to remove daterangepicker when component unmounts
      return () => {
        input.data("daterangepicker")?.remove();
      };
    }
  }, [onApply, onCancel]); // Re-run effect if onApply or onCancel changes

  return (
    <>
      {/* Container label for styling */}
      <label className="daterange-btn">
        {/* Optional icon */}
        <img src="/images/filter-icons/date.svg" alt="" />
        {/* Input field connected to jQuery Date Range Picker */}
        <input
          type="text"
          readOnly // Prevent manual input, only allow picker selection
          className="input"
          name="datefilter"
          placeholder={placeholder || "Sign Up Date Range"} // Default placeholder
          ref={inputRef} // Attach ref for jQuery plugin
        />
      </label>
    </>
  );
};

// Export component for usage in forms or filters
export default DesignerDateRangePicker;
