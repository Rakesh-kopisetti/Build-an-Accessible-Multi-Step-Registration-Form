import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../validation/schemas";
import Input from "../components/Input";
import { useFormStore } from "../store";

function fakeUsernameCheck(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = ["rakesh", "admin", "test"].includes(username?.trim().toLowerCase());
      resolve(!taken);
    }, 500);
  });
}

export default function Account() {
  const { data, updateSection, setStep } = useFormStore();
  const defaultValues = data.account;

  const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm({
    resolver: zodResolver(accountSchema),
    mode: "onBlur",
    defaultValues
  });

  const [checking, setChecking] = useState(false);
  const firstRef = useRef(null);
  useEffect(() => { setTimeout(() => firstRef.current?.focus(), 40); }, []);

  useEffect(() => {
    const sub = watch((vals) => updateSection("account", vals));
    return () => sub.unsubscribe?.();
  }, [watch, updateSection]);

  const onUsernameBlur = async (e) => {
    const value = e.target.value || "";
    if (!value.trim()) return;
    clearErrors("username");
    setChecking(true);
    const ok = await fakeUsernameCheck(value);
    setChecking(false);
    if (!ok) setError("username", { type: "manual", message: "Username is already taken" });
  };

  const onNext = () => setStep(3);
  const onError = () => {
    const firstErr = document.querySelector("[data-error='true']");
    if (firstErr) firstErr.focus();
  };

  return (
    <form onSubmit={handleSubmit(onNext, onError)} noValidate>
      <div className="form-grid">
        <Input ref={firstRef} label="Username" name="username" {...register("username")} onBlur={(e) => { register("username").onBlur(e); onUsernameBlur(e); }} error={errors.username?.message} />
        {checking && <div className="hint">Checking username availability...</div>}
        <Input label="Email" name="email" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Phone" name="phone" {...register("phone")} error={errors.phone?.message} hint="Include country code if needed" />
        <Input label="Password" name="password" type="password" {...register("password")} error={errors.password?.message} hint="Min 8 chars, upper, lower, number, special" />
        <Input label="Confirm password" name="confirmPassword" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
      </div>

      <div className="buttons">
        <button type="button" className="btn ghost" onClick={() => setStep(1)}>Previous</button>
        <button type="submit" className="btn primary">Next</button>
      </div>
    </form>
  );
}
