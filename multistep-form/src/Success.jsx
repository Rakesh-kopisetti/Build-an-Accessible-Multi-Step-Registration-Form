import React, { useEffect } from "react";
import { useFormStore } from "./store";

export default function Success() {
  const { resetAll } = useFormStore();

  useEffect(() => {
    // clear saved data and show success
    resetAll();
  }, [resetAll]);

  return (
    <div className="success" style={{ color: "#fff", textAlign: "center", padding: 20 }}>
      <h2>Registration Complete ✅</h2>
      <p>Your data was submitted and saved. Thank you!</p>
    </div>
  );
}
