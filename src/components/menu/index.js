import React, { useEffect, useState } from "react";
import s from "./menu.module.scss";

const MenuDropdown = ({ toggler, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selected) {
      setIsOpen(false);
      onSelect(selected);
    }
  }, [selected, onSelect]);

  useEffect(() => {
    const closeMenu = () => {
      setIsOpen(false);
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className={s.dropdown} onClick={(e) => e.stopPropagation()}>
      <button className={s.dropdown_toggler} onClick={toggleDropdown}>
        {toggler}
      </button>
      {isOpen && (
        <ul className={s.dropdown_menu}>
          {items.map((item, index) => (
            <li key={index} onClick={() => setSelected(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuDropdown;
