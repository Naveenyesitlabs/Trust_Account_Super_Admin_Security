import { useState } from "react";
import { DateRangePicker } from "rsuite";

const DesignerDateRangePicker = ({ onApply, onCancel, placeholder }) => {
  const [value, setValue] = useState(null);

  const handleChange = (nextValue) => {
    setValue(nextValue);

    if (!nextValue || nextValue.length === 0) {
      onCancel?.();
      return;
    }

    if (nextValue[0] && nextValue[1]) {
      onApply?.(nextValue);
    }
  };

  return (
    <DateRangePicker
      value={value}
      onChange={handleChange}
      onClean={() => {
        setValue(null);
        onCancel?.();
      }}
      editable={false}
      cleanable
      format="MM/dd/yyyy"
      placement="bottomEnd"
      character=" - "
      placeholder={placeholder || "Sign Up Date Range"}
      className="input"
    />
  );
};

export default DesignerDateRangePicker;
