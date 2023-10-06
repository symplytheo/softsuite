import React, { useEffect, useState } from "react";
import s from "./elementlink.module.scss";
import { ReactComponent as NoFilesIcon } from "../../assets/icons/no_file.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as CheckRedIcon } from "../../assets/icons/check_red.svg";
import { ReactComponent as ArrowLeftSquareIcon } from "../../assets/icons/arrow-left-square.svg";
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
import { getValueByIdFromArray } from "../../assets/utils";
import CreateElementLinkModal from "./create-link-modal";
import ConfirmationModal from "../../components/modal/confirmation";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../_parts/datatable";
import NavigationDrawer from "../_parts/navigation_drawer";
import { useDeleteElementLinkMutation, useGetAllElementLinksQuery, useGetElementByIdQuery } from "../../lib/api";
import { useSelector } from "react-redux";

const COLUMNS = [
  { title: "Name", key: "name" },
  { title: "Sub-Organization", key: "suborganizationId" },
  { title: "Department", key: "departmentId" },
  { title: "Employee Category", key: "employeeCategoryValueId" },
  { title: "Amount", key: "amount" },
  { title: "Details", key: "details" },
  { title: "Action", key: "action" },
];

const ElementLinksPage = () => {
  const navigate = useNavigate();

  const { elementId } = useParams();

  const [data, setData] = useState(() => []);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState(globalFilter ?? "");
  const [element, setElement] = useState();

  const { data: currentElement } = useGetElementByIdQuery(elementId);
  const {
    data: elementLinks,
    isLoading: isGettingLinks,
    refetch: refetchElementLinks,
  } = useGetAllElementLinksQuery(elementId);
  const { elementCategories, elementClassifications, elementPayruns, suborganizations, employeeCategories } =
    useSelector((state) => state.root);

  useEffect(() => {
    if (currentElement) {
      setElement(currentElement.data || {});
    }
  }, [currentElement]);

  useEffect(() => {
    if (elementLinks) {
      const allElementLinks = elementLinks.data?.content || [];
      setData([...allElementLinks].reverse());
    }
  }, [elementLinks]);

  const DETAILS = {
    "Element Name": element?.name,
    "Element Classification":
      getValueByIdFromArray(element?.classificationValueId, "name", elementClassifications) || "---",
    "Element Category": getValueByIdFromArray(element?.categoryValueId, "name", elementCategories) || "---",
    Payrun: getValueByIdFromArray(element?.payRunValueId, "name", elementPayruns) || "---",
    Description: element?.description,
    "Reporting Name": element?.reportingName,
    "Effective Start Date": element?.effectiveStartDate || "---",
    "Effective End Date": element?.effectiveStartDate || "---",
    "Processing Type": element?.processingType,
    "Pay Frequency": element?.payFrequency,
    "Pay Months": element?.selectedMonths.length ? element?.selectedMonths.join(", ") : "----",
    Prorate: element?.prorate,
    Status: String(element?.status).toLowerCase() === "active" ? "Active" : "Inactive",
    "Modified By": element?.modifiedBy,
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const columnHelper = createColumnHelper();

  const columns = COLUMNS.map((col) =>
    columnHelper.accessor(col.key, {
      header: () => col.title,
      cell: (info) =>
        col.key === "suborganizationId" ? (
          getValueByIdFromArray(info.getValue(), "name", suborganizations) || "---"
        ) : col.key === "employeeCategoryValueId" ? (
          getValueByIdFromArray(info.getValue(), "name", employeeCategories) || "---"
        ) : col.key === "amount" ? (
          "NGN " + Number(info.getValue()).toLocaleString()
        ) : col.key === "details" ? (
          <button
            className={s.table_btn_link}
            onClick={() => {
              setActiveElementLink(info.row.original);
              toggleDrawer();
            }}
          >
            View details
          </button>
        ) : col.key === "action" ? (
          <div className={s.table_action_btns}>
            <button
              onClick={() => {
                setActiveElementLink(info.row.original);
                // setDeleteModal(true);
                alert("Edit Element Link");
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={() => {
                setActiveElementLink(info.row.original);
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

  const [activeElementLink, setActiveElementLink] = useState({});

  const [deleteElementLink, { isLoading: isDeleting }] = useDeleteElementLinkMutation();

  const handleDelete = () => {
    deleteElementLink({ id: elementId, linkId: activeElementLink.id }).then(() => {
      setDeleteModal(false);
      setDeleteSuccessModal(true);
      refetchElementLinks();
    });
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
              {Object.entries(DETAILS).map(([key, val]) => (
                <div key={key} className={s.grid_child}>
                  <h5 className={s.label}>{key}</h5>
                  <p>{val}</p>
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
            {isGettingLinks ? (
              <div className={s.no_content}>
                <h4>Loading...</h4>
              </div>
            ) : data.length ? (
              <DataTable table={table} flexRender={flexRender} />
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
        elementId={elementId}
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onComplete={() => {
          setSuccessModal(true);
          refetchElementLinks();
        }}
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
        title={`Are you sure you want to delete Element Link - ${activeElementLink.name}?`}
        subtitle={"You can't reverse this action"}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        action={handleDelete}
        actionText={"Yes, Delete"}
        actionColor="error"
        actionLoading={isDeleting}
        actionLoadingText={"Deleting..."}
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

      <NavigationDrawer isOpen={isOpen} onClose={toggleDrawer} item={activeElementLink} />
    </div>
  );
};

export default ElementLinksPage;
