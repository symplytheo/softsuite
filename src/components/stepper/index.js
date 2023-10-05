import React from "react";
import s from "./stepper.module.scss";

const Stepper = ({ steps = [], activeStep = 0, showIndicators = true }) => {
  // indicator
  const StepperIndicator = () => (
    <div className={s.stepper_indicators}>
      {steps.map((item, index) => (
        <div
          className={[s.step, activeStep > index ? s.done : activeStep === index ? s.active : s.inactive].join(" ")}
          key={index}
        >
          <div className={s.label}>{item.label}</div>
          <div>
            <div className={s.circle}>{index < activeStep ? <span>&#10003;</span> : index + 1}</div>
          </div>
          {index < steps.length - 1 && <div className={s.line}></div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className={s.stepper}>
      {showIndicators && <StepperIndicator steps={steps} activeStep={activeStep} />}
      {/* content */}
      <div className={s.stepper_content}>
        {steps.map((item, index) =>
          activeStep === index ? (
            <div key={index} className={s.step}>
              <item.component />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Stepper;
