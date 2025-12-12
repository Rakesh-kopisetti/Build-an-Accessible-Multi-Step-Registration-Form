import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalSchema } from "../validation/schemas";
import Input from "../components/Input";
import { useFormStore } from "../store";

export default function PersonalInfo() {
  const { data, updateSection, setStep } = useFormStore();
  const defaultValues = data.personal;

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(personalSchema),
    mode: "onBlur",
    defaultValues
  });

  const firstRef = useRef(null);
  useEffect(() => { setTimeout(() => firstRef.current?.focus(), 40); }, []);

  // persist on every change
  useEffect(() => {
    const sub = watch((vals) => updateSection("personal", vals));
    return () => sub.unsubscribe?.();
  }, [watch, updateSection]);

  const onNext = () => setStep(1);
  const onError = () => {
    const firstErr = document.querySelector("[data-error='true']");
    if (firstErr) firstErr.focus();
  };

  return (
    <form onSubmit={handleSubmit(onNext, onError)} noValidate>
      <div className="form-grid row-2">
        <Input ref={firstRef} label="First name" name="firstName" {...register("firstName")} error={errors.firstName?.message} />
        <Input label="Last name" name="lastName" {...register("lastName")} error={errors.lastName?.message} />
        <Input label="Date of birth" name="dateOfBirth" type="date" {...register("dateOfBirth")} error={errors.dateOfBirth?.message} hint="You must be at least 18 years old" />
      </div>

      <div className="buttons">
        <button type="button" className="btn ghost" disabled>Previous</button>
        <button type="submit" className="btn primary">Next</button>
      </div>
    </form>
  );
}
