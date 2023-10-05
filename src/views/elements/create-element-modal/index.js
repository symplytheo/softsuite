import React, { useState } from "react";
import Modal from "../../../components/modal";
import StepTwo from "./steptwo";
import StepOne from "./stepone";
import s from "../elements.module.scss";

const CreateElementModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={780}>
      <h3 className={s.modal_title}>Create Element</h3>
      <div className={s.stepper}>
        <div className={s.stepper_content}>
          {activeStep === 0 && (
            <div className={s.step}>
              <StepOne handleNext={handleNext} onClose={onClose} />
            </div>
          )}
          {activeStep === 1 && (
            <div className={s.step}>
              <StepTwo handlePrev={handlePrev} onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateElementModal;
