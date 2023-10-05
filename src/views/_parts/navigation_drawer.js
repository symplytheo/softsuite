import React, { useEffect } from "react";
import s from './parts.module.scss';
import { ReactComponent as CloseSquareIcon } from "../../assets/icons/close_square.svg";

const NavigationDrawer = ({ isOpen, onClose }) => {
//   const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className={s.overlay} onClick={onClose}>
        <div className={`${s.drawer} ${isOpen ? s.open : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className={s.drawer_content}>
            <button className={s.back_btn} onClick={onClose}>
              <CloseSquareIcon />
            </button>
            <div className={s.grid}>
              {[...Array(14)].map((_, x) => (
                <div key={x} className={s.grid_child}>
                  <h5 className={s.label}>title</h5>
                  <p>Hello World</p>
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
