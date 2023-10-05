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

const COLUMNS = [
  { title: "Name", key: "name" },
  { title: "Element Category", key: "category" },
  { title: "Element Classification", key: "classification" },
  { title: "Status", key: "status" },
  { title: "Date & Time Modified", key: "updatedAt" },
  { title: "Modified By", key: "modifiedBy" },
  { title: "Action", key: "action" },
];

const ElemetsPage = () => {
  const [data] = useState(() => [...TABLEDATA]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState(globalFilter ?? "");

  const columnHelper = createColumnHelper();

  const columns = COLUMNS.map((col) =>
    columnHelper.accessor(col.key, {
      header: () => col.title,
      cell: (info) =>
        col.key === "status" ? (
          <Chip color={info.getValue() === "Active" ? "secondary" : "error"}>{info.getValue()}</Chip>
        ) : col.key === "action" ? (
          <button
            onClick={() => {
              setActiveElement(info.row.original);
              setDeleteModal(true);
            }}
          >
            <ActionIcon />
          </button>
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

export default ElemetsPage;
