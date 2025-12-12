import { create } from "zustand";

const STORAGE_KEY = "multistep_form_v1";

const safeParse = (v) => {
  try { return JSON.parse(v); } catch { return null; }
};

const initial = {
  currentStep: 0, // 0..3
  data: {
    personal: { firstName: "", lastName: "", dateOfBirth: "" },
    address: { line1: "", line2: "", city: "", state: "", postalCode: "", country: "" },
    account: { username: "", email: "", phone: "", password: "", confirmPassword: "" }
  },
  submitted: false
};

export const useFormStore = create((set, get) => {
  // hydrate from localStorage
  const saved = safeParse(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);
  const seed = saved ? { ...initial, ...saved } : initial;

  const persist = (next) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  return {
    ...seed,
    setStep: (n) => {
      const next = { ...get(), currentStep: n };
      set(next);
      persist(next);
    },
    updateSection: (section, newValues) => {
      const curr = get();
      const next = {
        ...curr,
        data: { ...curr.data, [section]: { ...curr.data[section], ...newValues } }
      };
      set(next);
      persist(next);
    },
    setSubmitted: (v) => {
      const next = { ...get(), submitted: v };
      set(next);
      persist(next);
    },
    resetAll: () => {
      set(initial);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  };
});
