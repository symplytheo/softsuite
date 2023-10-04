import React from "react";
import s from "./elements.module.scss";
import { ReactComponent as NoFilesIcon } from "../../assets/icons/no_file.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/switch.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import Button from "../../components/button";

const ElemetsPage = () => {
  return (
    <div>
      <nav className={s.breadcrumbs}>
        <a href="# ">Payroll Management</a>
        <span>&gt;</span>
        <a href="# ">Element Setup</a>
        <span>&gt;</span>
        <a href="# ">Elements</a>
      </nav>

      <section className={s.card}>
        <h2 className={s.card_title}>Elements</h2>
        <div className={s.card_toolbar}>
          <form className={s.search}>
            <input className={s.search_input} placeholder="Search for element" required />
            <button type="submit" className={s.search_button}>
              <SearchIcon height={16} width={16} />
            </button>
          </form>

          <FilterIcon height={40} width={40} />

          <Button className={s.button}>
            Create Element
            <PlusIcon />
          </Button>
        </div>
        <div className={s.card_content}>
          <div className={s.no_content}>
            <NoFilesIcon />
            <p>There are no elements to display</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElemetsPage;
