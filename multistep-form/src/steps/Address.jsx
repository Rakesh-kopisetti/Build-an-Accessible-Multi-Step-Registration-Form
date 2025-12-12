import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../validation/schemas";
import Input from "../components/Input";
import { useFormStore } from "../store";

export default function Address() {
  const { data, updateSection, setStep } = useFormStore();
  const defaultValues = data.address;

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
    defaultValues
  });

  const firstRef = useRef(null);
  useEffect(() => { setTimeout(() => firstRef.current?.focus(), 40); }, []);

  useEffect(() => {
    const sub = watch((vals) => updateSection("address", vals));
    return () => sub.unsubscribe?.();
  }, [watch, updateSection]);

  const onNext = () => setStep(2);
  const onError = () => {
    const firstErr = document.querySelector("[data-error='true']");
    if (firstErr) firstErr.focus();
  };

  return (
    <form onSubmit={handleSubmit(onNext, onError)} noValidate>
      <div className="form-grid">
        <Input ref={firstRef} label="Address line 1" name="line1" {...register("line1")} error={errors.line1?.message} />
        <Input label="Address line 2 (optional)" name="line2" {...register("line2")} error={errors.line2?.message} />
        <div className="form-grid row-2">
          <Input label="City" name="city" {...register("city")} error={errors.city?.message} />
          <Input label="State / Province" name="state" {...register("state")} error={errors.state?.message} />
        </div>
        <div className="form-grid row-2">
          <Input label="Postal code" name="postalCode" {...register("postalCode")} error={errors.postalCode?.message} />
          <Input label="Country" name="country" {...register("country")} error={errors.country?.message} />
        </div>
      </div>

      <div className="buttons">
        <button type="button" className="btn ghost" onClick={() => setStep(0)}>Previous</button>
        <button type="submit" className="btn primary">Next</button>
      </div>
    </form>
  );
}
