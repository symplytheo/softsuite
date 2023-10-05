import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import StepTwo from "./steptwo";
import StepOne from "./stepone";
import Stepper from "../../../components/stepper";
import s from "../elements.module.scss";

const CreateElementModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
    }
  }, [isOpen]);

  const STEPS = [
    { label: "Element Details", component: () => <StepOne handleNext={handleNext} onClose={onClose} /> },
    { label: "Additional Details", component: () => <StepTwo handlePrev={handlePrev} onClose={onClose} /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={780}>
      <h3 className={s.modal_title}>Create Element</h3>
      <Stepper steps={STEPS} activeStep={activeStep} />
    </Modal>
  );
};

export default CreateElementModal;
