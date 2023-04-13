import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { toJS } from "mobx";
import { FC, useState } from "react";
import HeaderPath from "../HeaderPath";
import ListSearch from "./ListSearch";
import { actionButton } from "./ListSearch/ListSearch";
import useStyles from "./style";
import useStylesEncours from "./useStylesEncours";
import TabPanel from "../TabPanel";

interface ListComponentProps {
  columns: GridColDef[];
  rows: any;
  paths: Array<{ label: string; path: string }>;
  clickSearchData: any;
  loading: boolean;
  onRowClick?: (row: any) => void;
  createNewData?: (e: any) => void;
  handlePageChange?: (page: number) => void;
  withCreate: boolean;
  valueTitle?: string;
  FilerComponent?: any;
  floatingButtons?: actionButton[];
  perPage?: number;
  rowCount?: number;
  paginationMode?: "client" | "server";
}

const ListComponent: FC<ListComponentProps> = ({
  columns,
  rows,
  paths,
  clickSearchData,
  loading,
  onRowClick,
  createNewData,
  withCreate,
  valueTitle,
  FilerComponent,
  floatingButtons,
  perPage,
  handlePageChange,
  rowCount,
  paginationMode,
}) => {
  const classes = useStyles();
  const classesEncours = useStylesEncours()
  const items = toJS(rows);
  const [onglet, setOnglet] = useState(0);

  const mode = window.location.pathname.split("/")[1];

  const handleRowClick = (k: any) => {
    if (onRowClick) {
      onRowClick(k.row);
    }
  };



  return (
    <div className={classes.font_back}>
      <HeaderPath paths={paths} />
      <br />
      <div className={classes.content}>
        {valueTitle && (
          <>
            <div className={classes.title}>{valueTitle}</div>
            <br />
          </>
        )}

        <div className={classes.item}>
          <div>
            <ListSearch
              search={clickSearchData}
              withCreate={withCreate}
              create={createNewData}
              floatingButtons={floatingButtons}
            />
          </div>
      
          <div>
            <div className={classes.dataGrid}>
              <DataGrid
                rows={items}
                columns={columns}
                rowCount={rowCount}
                loading={loading}
                pageSize={perPage || 20}
                sortingOrder={["desc", "asc"]}
                disableColumnMenu={true}
                onRowClick={handleRowClick}
                hideFooterSelectedRowCount={true}
                className={classes.tableRow}
                paginationMode={paginationMode || "client"}
                onPageChange={handlePageChange}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
