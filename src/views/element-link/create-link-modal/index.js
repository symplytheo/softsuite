import React, { useEffect, useState } from "react";
import Stepper from "../../../components/stepper";
import Modal from "../../../components/modal";
import s from "../elementlink.module.scss";
import AddLinkStepOne from "./linkstep1";
import AddLinkStepTwo from "./linkstep2";
import AddLinkStepThree from "./linkstep3";

const CreateElementLinkModal = ({ isOpen, onClose, elementId, onComplete }) => {
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

  const [form, setForm] = useState({
    name: "",
    elementId,
    suborganizationId: { id: 1 },
    locationId: "",
    departmentId: "",
    employeeCategoryId: "",
    employeeCategoryValueId: "",
    employeeTypeId: "",
    employeeTypeValueId: "",
    jobTitleId: "",
    grade: { id: 1 },
    gradeStep: "",
    unionId: "",
    amountType: "",
    amount: "",
    rate: "",
    effectiveStartDate: "",
    effectiveEndDate: "",
    status: true,
    automate: "Yes",
    additionalInfo: "",
    modifiedBy: "Theophilus Iyonor",
  });

  const STEPS = [
    {
      label: "Staff Information",
      component: () => (
        <AddLinkStepOne
          initialValue={form}
          handleNext={(d) => {
            setForm({ ...form, ...d });
            handleNext();
          }}
          onClose={onClose}
        />
      ),
    },
    {
      label: "Additional Information",
      component: () => (
        <AddLinkStepTwo
          initialValue={form}
          handlePrev={(d) => {
            setForm({ ...form, ...d });
            handlePrev();
          }}
          handleNext={(d) => {
            setForm({ ...form, ...d });
            handleNext();
          }}
        />
      ),
    },
    {
      label: "Processing Information",
      component: () => (
        <AddLinkStepThree
          initialValue={form}
          handlePrev={(d) => {
            setForm({ ...form, ...d });
            handlePrev();
          }}
          handleSubmit={() => {
            onClose();
            onComplete();
          }}
        />
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={780}>
      <h3 className={s.modal_title}>Create Element Link</h3>
      <Stepper steps={STEPS} activeStep={activeStep} />
    </Modal>
  );
};

export default CreateElementLinkModal;
