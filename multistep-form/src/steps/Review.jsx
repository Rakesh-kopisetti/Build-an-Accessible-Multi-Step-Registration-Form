import React from "react";
import { useFormStore } from "../store";

export default function Review() {
  const { data, setStep, setSubmitted } = useFormStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // final submit (could include server call)
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: "#fff", marginBottom: 12 }}>Review & Submit</h2>

      <div className="summary-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "#fff" }}>Personal Information</strong>
          <button type="button" className="btn ghost" onClick={() => setStep(0)}>Edit</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <div><strong>First name:</strong> {data.personal.firstName || "—"}</div>
          <div><strong>Last name:</strong> {data.personal.lastName || "—"}</div>
          <div><strong>Date of birth:</strong> {data.personal.dateOfBirth || "—"}</div>
        </div>
      </div>

      <div className="summary-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "#fff" }}>Address</strong>
          <button type="button" className="btn ghost" onClick={() => setStep(1)}>Edit</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <div><strong>Address 1:</strong> {data.address.line1 || "—"}</div>
          <div><strong>Address 2:</strong> {data.address.line2 || "—"}</div>
          <div><strong>City:</strong> {data.address.city || "—"}</div>
          <div><strong>State:</strong> {data.address.state || "—"}</div>
          <div><strong>PostalCode:</strong> {data.address.postalCode || "—"}</div>
          <div><strong>Country:</strong> {data.address.country || "—"}</div>
        </div>
      </div>

      <div className="summary-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "#fff" }}>Account</strong>
          <button type="button" className="btn ghost" onClick={() => setStep(2)}>Edit</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <div><strong>Username:</strong> {data.account.username || "—"}</div>
          <div><strong>Email:</strong> {data.account.email || "—"}</div>
          <div><strong>Phone:</strong> {data.account.phone || "—"}</div>
        </div>
      </div>

      <div className="buttons">
        <button type="button" className="btn ghost" onClick={() => setStep(2)}>Previous</button>
        <button type="submit" className="btn primary">Submit</button>
      </div>
    </form>
  );
}
