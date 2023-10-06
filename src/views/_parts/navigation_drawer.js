import React, { useEffect } from "react";
import s from "./parts.module.scss";
import { ReactComponent as CloseSquareIcon } from "../../assets/icons/close_square.svg";
import { useSelector } from "react-redux";
import { getValueByIdFromArray } from "../../assets/utils";

const NavigationDrawer = ({ isOpen, onClose, item }) => {
  const { suborganizations, locations, employeeCategories, employeeTypes, grades, jobTitles, unions } = useSelector(
    (state) => state.root
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const DETAILS = {
    Name: item?.name,
    "Sub Organization": getValueByIdFromArray(item?.suborganizationId, "name", suborganizations) || "---",
    Department: item?.departmentId,
    Location: getValueByIdFromArray(item?.locationId, "name", locations) || "---",
    "Employee Type": getValueByIdFromArray(item?.employeeTypeValueId, "name", employeeTypes) || "---",
    "Employee Category": getValueByIdFromArray(item?.employeeCategoryValueId, "name", employeeCategories) || "---",
    "Job Title": getValueByIdFromArray(item?.jobTitleId, "name", jobTitles) || "---",
    Union: getValueByIdFromArray(item?.unionId, "name", unions) || "---",
    Automate: item?.automate,
    Status: String(item?.status).toLowerCase() === "active" ? "Active" : "Inactive",
    Grade: getValueByIdFromArray(item?.grade, "name", grades) || "---",
    "Grade Step": item?.gradeStep,
    "Effective Start Date": item?.effectiveStartDate || "---",
    "Effective End Date": item?.effectiveStartDate || "---",
    "Amount Type": item?.amountType,
    amount: "NGN " + Number(item?.amount).toLocaleString(),
    "Modified By": item?.modifiedBy,
  };

  return (
    isOpen && (
      <div className={s.overlay} onClick={onClose}>
        <div className={`${s.drawer} ${isOpen ? s.open : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className={s.drawer_content}>
            <button className={s.back_btn} onClick={onClose}>
              <CloseSquareIcon />
            </button>

            <h3 className={s.modal_title}>Element Link Details</h3>
            <div className={s.grid}>
              {Object.entries(DETAILS).map(([key, val]) => (
                <div key={key} className={s.grid_child}>
                  <h5 className={s.label}>{key}</h5>
                  <p>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NavigationDrawer;
