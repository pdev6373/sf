import React from 'react';



const Select = ({
  label,
  value,
  labelColor,
  inputClass,
  data,
  title,
  existingValue,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <div className="mb-1">
          <p className="text-sm" style={{ color: labelColor }}>
            {label}
          </p>
        </div>
      )}
      <div className="h-[50px] bg-[#F6F6F9] flex rounded px-4">
        <select
          {...props}
          className={`h-full flex-1 bg-transparent focus:outline-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 px-0 outline-0 border-none ${inputClass}`}
          value={value}
        >
          {existingValue?.value ? (
            <option value={existingValue.value}>{existingValue.title}</option>
          ) : (
            <option value="">{title || 'Select an option'}</option>
          )}
          {data.map((d) => (
            <option key={d.value} value={d.value}>
              {d.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
