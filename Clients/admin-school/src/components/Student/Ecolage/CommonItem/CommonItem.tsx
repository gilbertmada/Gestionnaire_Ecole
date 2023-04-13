import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, frFR, GridColDef } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import { toJS } from 'mobx';
import { FC } from 'react';
import AppStore from '../../../../store/AppStore';
import useStyles from '../style';

interface ItemProps {
  title: string;
  total: string;
  valueTotal: string;
  columns: GridColDef[];
  rows: any;
  handleAdd: any;
  loading: any,
  onRowClick?: any;
  blockTarif: boolean;
}

const CommonItem: FC<ItemProps> = ({
  title,
  total,
  valueTotal,
  columns,
  rows,
  handleAdd,
  loading,
  onRowClick,
  blockTarif,
}) => {
  const classes = useStyles();
  const theme = createMuiTheme({}, frFR);

  const prolongedError = () => {
    AppStore.updateSnackBar(true, 'Une erreur est survenue');
  };

  const commonBtn = () => {
    return (
      <div className={classes.btnContainer}>
        {(!blockTarif) && (
          <div>
            <Button
              size="small"
              className={classes.btn}
              classes={{ label: classes.btnLabel }}
              onClick={handleAdd}>
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const btn = () => {
    if (title === 'Ecolage' || title === 'Frais Divers') {
      return commonBtn();
    }


    return (
      rows.length === 0 && (
        <div className={classes.btnContainer}>
          <Button
            size="small"
            className={classes.btn}
            classes={{ label: classes.btnLabel }}
            onClick={handleAdd}>
            <AddIcon />
          </Button>
        </div>
      )
    );
  };

  return (
    <div className={classes.marginTop}>
      <span className={classes.title}>{title}</span>
      <span className={classes.total}>{total}  {valueTotal}</span>

      <div
        className={
          (title === 'Ecolage' || title === 'Frais Divers')
            ? classes.optionsDataGrid
            : (total === 'Total' || valueTotal !== "") ? classes.total : classes.dataGrid
        }>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={toJS(rows)}
            columns={columns}
            pageSize={4}
            sortingOrder={['desc', 'asc']}
            disableColumnMenu={true}
            hideFooterSelectedRowCount={true}
            loading={loading}
            className={classes.optionsTableRow}
            onRowClick={blockTarif ? prolongedError : onRowClick}
            autoHeight={true}
          />

        </ThemeProvider>
      </div>
      {btn()}
    </div>
  );
};

export default CommonItem;
