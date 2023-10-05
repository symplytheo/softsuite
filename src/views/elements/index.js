import React, { useEffect, useState } from "react";
import s from "./elements.module.scss";
import { ReactComponent as NoFilesIcon } from "../../assets/icons/no_file.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/switch.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as ActionIcon } from "../../assets/icons/more-square.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as CheckRedIcon } from "../../assets/icons/check_red.svg";
import Button from "../../components/button";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Chip from "../../components/chip";
import { TABLEDATA } from "../../assets/utils";
import CreateElementModal from "./create-element-modal";
import ConfirmationModal from "../../components/modal/confirmation";
import { useNavigate } from "react-router-dom";
import MenuDropdown from "../../components/menu";
import DataTable from "../_parts/datatable";

const COLUMNS = [
  { title: "Name", key: "name" },
  { title: "Element Category", key: "category" },
  { title: "Element Classification", key: "classification" },
  { title: "Status", key: "status" },
  { title: "Date & Time Modified", key: "updatedAt" },
  { title: "Modified By", key: "modifiedBy" },
  { title: "Action", key: "action" },
];

const ElementsPage = () => {
  const navigate = useNavigate();

  const [data] = useState(() => [...TABLEDATA]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState(globalFilter ?? "");

  const menuItems = ["View Element Links", "Edit Element", "Delete Element"];

  const handleAction = (action, item) => {
    setActiveElement(item);
    if (action.includes("View")) navigate(`/${data.indexOf(item)}`);
    if (action.includes("Edit")) return;
    if (action.includes("Delete")) setDeleteModal(true);
  };

  const columnHelper = createColumnHelper();

  const columns = COLUMNS.map((col) =>
    columnHelper.accessor(col.key, {
      header: () => col.title,
      cell: (info) =>
        col.key === "status" ? (
          <Chip color={info.getValue() === "Active" ? "secondary" : "error"}>{info.getValue()}</Chip>
        ) : col.key === "action" ? (
          <MenuDropdown
            toggler={<ActionIcon />}
            items={menuItems}
            onSelect={(v) => handleAction(v, info.row.original)}
          />
        ) : (
          info.getValue()
        ),
      enableSorting: col.key === "action" ? false : true,
    })
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setGlobalFilter(search);
  };

  useEffect(() => {
    if (!search) setGlobalFilter("");
  }, [search]);

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
  // const [updateSuccessModal, setUpdateSuccessModal] = useState(false);

  const [activeElement, setActiveElement] = useState({});

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
          <form className={s.search} onSubmit={handleSearch}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={s.search_input}
              placeholder="Search for element"
              required
            />
            <button type="submit" className={s.search_button}>
              <SearchIcon height={16} width={16} />
            </button>
          </form>

          <FilterIcon height={40} width={40} />

          <Button className={s.button} onClick={() => setCreateModal(true)}>
            Create Element
            <PlusIcon />
          </Button>
        </div>

        <div className={s.card_content}>
          {data.length ? (
            <DataTable table={table} flexRender={flexRender} />
          ) : (
            <div className={s.no_content}>
              <NoFilesIcon />
              <p>There are no elements to display</p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateElementModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onComplete={() => setSuccessModal(true)}
      />

      <ConfirmationModal
        icon={CheckIcon}
        title={"Element has been created successfully"}
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        action={() => setSuccessModal(false)}
        actionText={"Close to continue"}
      />

      <ConfirmationModal
        icon={DeleteIcon}
        title={`Are you sure you want to delete Element - ${activeElement.name}?`}
        subtitle={"You can't reverse this action"}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        action={() => {
          setDeleteModal(false);
          setDeleteSuccessModal(true);
        }}
        actionText={"Yes, Delete"}
        actionColor="error"
        showCancel
      />

      <ConfirmationModal
        icon={CheckRedIcon}
        title={"Element has been deleted successfully"}
        isOpen={deleteSuccessModal}
        onClose={() => setDeleteSuccessModal(false)}
        action={() => setDeleteSuccessModal(false)}
        actionText={"Close to continue"}
      />

      {/* <ConfirmationModal
        icon={CheckIcon}
        title={"Element has been updated successfully"}
        isOpen={updateSuccessModal}
        onClose={() => setUpdateSuccessModal(false)}
        action={() => setUpdateSuccessModal(false)}
        actionText={"Close to continue"}
      /> */}
    </div>
  );
};

export default ElementsPage;
