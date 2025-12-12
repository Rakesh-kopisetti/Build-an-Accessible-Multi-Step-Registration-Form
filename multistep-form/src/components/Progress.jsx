import React from "react";

export default function Progress({ step }) {
  return (
    <div className="stepper" aria-hidden>
      <div className={`step-dot ${step >= 0 ? "active" : ""}`}></div>
      <div className={`step-dot ${step >= 1 ? "active" : ""}`}></div>
      <div className={`step-dot ${step >= 2 ? "active" : ""}`}></div>
      <div className={`step-dot ${step >= 3 ? "active" : ""}`}></div>
    </div>
  );
}
