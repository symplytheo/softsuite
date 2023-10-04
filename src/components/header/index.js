import React from "react";
import s from "./header.module.scss";
import person from "../../assets/person.png";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";

const AppHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.header_item}>
        <div className={s.company}>
          <HomeIcon fill="currentColor" />
          <div>
            <p>Change Organization</p>
            <h4>PaperSoft Limited</h4>
          </div>
          <ArrowDownIcon />
        </div>

        <form className={s.search}>
          <input className={s.search_input} placeholder="Search for anything..." required />
          <button type="submit" className={s.search_button}>
            <SearchIcon />
          </button>
        </form>
      </div>

      <div className={s.header_item}>
        <button type="button" className={s.icon_button}>
          <NotificationIcon />
        </button>

        <div className={s.avatar}>
          <img src={person} alt="avatar" />
          <div>
            <h4>Henry Okoro</h4>
            <p>Payroll Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
