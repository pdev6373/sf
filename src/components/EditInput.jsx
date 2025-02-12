import React, { forwardRef } from 'react';


const EditInput = forwardRef(
  ({ label, labelColor, inputClass, error, ...props }, ref) => {
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
          <input
            ref={ref}
            {...props}
            className={`h-full flex-1 bg-transparent outline-none border-transparent focus:border-transparent focus:ring-0 border-none px-0 ${inputClass}`}
          />
        </div>
        {error && (
          <div className="mt-2">
            <p className="text-xs text-danger font-medium">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

export default EditInput;
