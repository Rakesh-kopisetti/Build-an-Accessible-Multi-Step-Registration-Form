import { z } from "zod";

const required = (label) => ({ required_error: `${label} is required` });

export const personalSchema = z.object({
  firstName: z.string(required("First name")).min(1, { message: "First name is required" }),
  lastName: z.string(required("Last name")).min(1, { message: "Last name is required" }),
  dateOfBirth: z.string(required("Date of birth")).min(1, { message: "Date of birth is required" })
    .refine((val) => {
      const d = new Date(val);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();
      let age = today.getFullYear() - d.getFullYear();
      const m = today.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
      return age >= 18;
    }, { message: "You must be at least 18 years old" })
});

export const addressSchema = z.object({
  line1: z.string(required("Address line 1")).min(1, { message: "Address line 1 is required" }),
  line2: z.string().optional(),
  city: z.string(required("City")).min(1, { message: "City is required" }),
  state: z.string(required("State")).min(1, { message: "State is required" }),
  postalCode: z.string(required("Postal code")).min(1, { message: "Postal code is required" }),
  country: z.string(required("Country")).min(1, { message: "Country is required" }),
});

export const accountSchema = z.object({
  username: z.string(required("Username")).min(1, { message: "Username is required" }),
  email: z.string(required("Email")).email({ message: "Enter a valid email address" }),
  phone: z.string(required("Phone")).regex(/^[\+]?[\d\s\-]{7,15}$/, { message: "Enter a valid phone number" }),
  password: z.string(required("Password"))
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Include at least one uppercase letter" })
    .regex(/\d/, { message: "Include at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Include at least one special character" }),
  confirmPassword: z.string(required("Confirm password")),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
