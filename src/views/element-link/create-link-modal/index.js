import React, { useEffect, useState } from "react";
import Stepper from "../../../components/stepper";
import Modal from "../../../components/modal";
import s from '../elementlink.module.scss';
import AddLinkStepOne from "./linkstep1";
import AddLinkStepTwo from "./linkstep2";
import AddLinkStepThree from "./linkstep3";

const CreateElementLinkModal = ({ isOpen, onClose }) => {
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
    { label: "Staff Information", component: () => <AddLinkStepOne handleNext={handleNext} onClose={onClose} /> },
    { label: "Additional Information", component: () => <AddLinkStepTwo handlePrev={handlePrev}  handleNext={handleNext} /> },
    { label: "Processing Information", component: () => <AddLinkStepThree handlePrev={handlePrev} onClose={onClose} /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={780}>
      <h3 className={s.modal_title}>Create Element Link</h3>
      <Stepper steps={STEPS} activeStep={activeStep} />
    </Modal>
  );
};

export default CreateElementLinkModal;
