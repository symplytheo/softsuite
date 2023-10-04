import React from "react";
import s from "./sidebar.module.scss";
import logo from "../../assets/logo.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as SwitchIcon } from "../../assets/icons/switch.svg";
import { ReactComponent as ActivityIcon } from "../../assets/icons/activity.svg";
import { ReactComponent as StructureIcon } from "../../assets/icons/tree_structure-fill.svg";
import { ReactComponent as AccountMultipleIcon } from "../../assets/icons/3_user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/setting.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

const Sidebar = () => {
  const ITEMS = [
    { title: "Dashboard", icon: DashboardIcon, href: "" },
    { title: "Payroll Activities", icon: ActivityIcon, href: "" },
    { title: "Salary Structures", icon: StructureIcon, href: "" },
    { title: "Element Setup", icon: SettingsIcon, href: "" },
    { title: "Employees", icon: AccountMultipleIcon, href: "" },
  ];

  const OTHERS = [
    { title: "Payroll Settings", icon: SettingsIcon, href: "" },
    { title: "My Account", icon: AccountIcon, href: "" },
    { title: "Logout", icon: LogoutIcon, href: "" },
  ];

  return (
    <aside className={s.sidebar}>
      <img src={logo} alt="SoftSuite" className={s.logo} />

      <div className={s.top}>
        <SwitchIcon fill="currentColor" />
        <div>
          <p>Switch Module</p>
          <h4>Payroll Management</h4>
        </div>
        <ArrowDownIcon />
      </div>

      <nav>
        <ul className={s.list}>
          {ITEMS.map((el, i) => (
            <li key={el.title} className={i === 3 ? s.active : ""}>
              <el.icon fill="currentColor" />
              {el.title}
            </li>
          ))}
        </ul>

        <div className={s.divider} />

        <ul className={s.list}>
          {OTHERS.map((el, i) => (
            <li key={el.title}>
              <el.icon />
              {el.title}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
