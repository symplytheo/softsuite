import React, { useEffect, useState } from "react";
import s from "./elementlink.module.scss";
import { ReactComponent as NoFilesIcon } from "../../assets/icons/no_file.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as CheckRedIcon } from "../../assets/icons/check_red.svg";
import { ReactComponent as ArrowLeftSquareIcon } from "../../assets/icons/arrow-left-square.svg";
import { ReactComponent as CloseSquareIcon } from "../../assets/icons/close_square.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/delete-alt.svg";
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
import { TABLEDATA } from "../../assets/utils";
import CreateElementLinkModal from "./create-link-modal";
import ConfirmationModal from "../../components/modal/confirmation";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  { title: "Name", key: "name" },
  { title: "Sub-Organization", key: "category" },
  { title: "Department", key: "classification" },
  { title: "Employee Category", key: "status" },
  { title: "Amount", key: "updatedAt" },
  { title: "Details", key: "details" },
  { title: "Action", key: "action" },
];

const ElementLinksPage = () => {
  const navigate = useNavigate();
  const [data] = useState(() => [...TABLEDATA]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState(globalFilter ?? "");

  const columnHelper = createColumnHelper();

  const columns = COLUMNS.map((col) =>
    columnHelper.accessor(col.key, {
      header: () => col.title,
      cell: (info) =>
        col.key === "details" ? (
          <button
            className={s.btn_link}
            onClick={() => {
              setActiveElement(info.row.original);
              toggleDrawer();
            }}
          >
            View details
          </button>
        ) : col.key === "action" ? (
          <div className={s.action_btns}>
            <button
              onClick={() => {
                setActiveElement(info.row.original);
                // setDeleteModal(true);
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={() => {
                setActiveElement(info.row.original);
                setDeleteModal(true);
              }}
            >
              <RemoveIcon />
            </button>
          </div>
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const NavigationDrawer = ({ isOpen, onClose }) => {
    return (
      isOpen && (
        <div className={s.overlay} onClick={onClose}>
          <div className={`${s.drawer} ${isOpen ? s.open : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.drawer_content}>
              <button className={s.back_btn} onClick={toggleDrawer}>
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

  return (
    <div>
      <nav className={s.breadcrumbs}>
        <a href="# ">Payroll Management</a>
        <span>&gt;</span>
        <a href="# ">Element Setup</a>
        <span>&gt;</span>
        <a href="# ">Elements</a>
        <span>&gt;</span>
        <a href="# ">Element Links</a>
      </nav>

      <section className={s.card}>
        <button className={s.back_btn} onClick={() => navigate(-1)}>
          <ArrowLeftSquareIcon />
        </button>

        <div>
          <h2 className={s.card_title}>Element Details</h2>
          <div className={s.details}>
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

        <div>
          <h2 className={s.card_title}>Elements Links</h2>
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

            <Button className={s.button} onClick={() => setCreateModal(true)}>
              Create Element Link
              <PlusIcon />
            </Button>
          </div>

          <div className={s.card_content}>
            {data.length ? (
              <div>
                <table className={s.table} border={0}>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <th key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder ? null : (
                                <div
                                  {...{
                                    className: header.column.getCanSort() ? s.can_sort : "",
                                    onClick: header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                  {{
                                    asc: " 🔼",
                                    desc: " 🔽",
                                  }[header.column.getIsSorted()] ?? null}
                                </div>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => {
                            return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className={s.pagination}>
                  {/* pagination info */}
                  <div className={s.pagination_info}>
                    Showing
                    <select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                      }}
                    >
                      {[5, 10, 15, 20, 25, 30].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                    out of <strong>{table.getPrePaginationRowModel().rows.length}</strong>
                  </div>
                  {/* pagination buttons */}
                  <div className={s.pagination_buttons}>
                    <button
                      className={s.pagination_btn}
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"<<"}
                    </button>
                    <button
                      className={s.pagination_btn}
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"<"}
                    </button>
                    <span>
                      {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button
                      className={s.pagination_btn}
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {">"}
                    </button>
                    <button
                      className={s.pagination_btn}
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                    >
                      {">>"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.no_content}>
                <NoFilesIcon />
                <p>There are no elements to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <CreateElementLinkModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onComplete={() => setSuccessModal(true)}
      />

      <ConfirmationModal
        icon={CheckIcon}
        title={"Element Link has been created successfully"}
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        action={() => setSuccessModal(false)}
        actionText={"Close to continue"}
      />

      <ConfirmationModal
        icon={DeleteIcon}
        title={`Are you sure you want to delete Element Link - ${activeElement.name}?`}
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
        title={"Element Link has been deleted successfully"}
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

      <NavigationDrawer isOpen={isOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default ElementLinksPage;
