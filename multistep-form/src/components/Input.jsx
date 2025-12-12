import React from "react";

const Input = React.forwardRef(({ label, name, error, hint, ...props }, ref) => {
  const errId = error ? `${name}-error` : undefined;
  return (
    <div>
      <label className="field-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        ref={ref}
        className="input"
        aria-invalid={!!error}
        aria-describedby={errId}
        data-error={!!error}
        {...props}
      />
      {hint && <div className="hint">{hint}</div>}
      {error && <div id={errId} className="error" role="alert">{error}</div>}
    </div>
  );
});

export default Input;
