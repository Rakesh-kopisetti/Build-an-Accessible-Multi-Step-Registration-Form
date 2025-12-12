import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "./store";
import Progress from "./components/Progress";
import PersonalInfoStep from "./steps/PersonalInfo";
import AddressStep from "./steps/Address";
import AccountStep from "./steps/Account";
import Review from "./steps/Review";
import Success from "./Success";

export default function MultiStepForm() {
  const currentStep = useFormStore((s) => s.currentStep);
  const submitted = useFormStore((s) => s.submitted);

  const key = submitted ? "success" : String(currentStep);

  return (
    <div className="card" role="group" aria-labelledby="form-title">
      <div className="header">
        <div id="form-title" className="title">Registration</div>
        <Progress step={currentStep} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
        >
          {submitted ? (
            <Success />
          ) : (
            <>
              {currentStep === 0 && <PersonalInfoStep />}
              {currentStep === 1 && <AddressStep />}
              {currentStep === 2 && <AccountStep />}
              {currentStep === 3 && <Review />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
