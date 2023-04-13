// @ts-ignore
import { Button, Grid, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { SearchStoreInterface } from '../../../store/SearchListStore';
import { AbstractEmptyInterface } from '../../../types';
import useStyles from './style';

export interface actionButton {
  label: string;
  onClick: (e: any) => void;
}
interface ListSearchProps {
  search: (keyword: string) => void;
  create?: (e: any) => void;
  withCreate: boolean;
  floatingButtons?: actionButton[];
  searchStore?: SearchStoreInterface;
  displayButton?: boolean;
  setLaunchSearchData?: any;
  launchSearchData?: boolean;
}

let typeTimeout: any;

const ListSearch: FC<
  AbstractEmptyInterface & {
    search: (keyword: string) => void;
    create?: (e: any) => void;
    withCreate: boolean;
    floatingButtons?: actionButton[];
    displayButton?: boolean;
    setLaunchSearchData?: any
    launchSearchData?: boolean
  }
> = (props: any) => {
  const classes = useStyles();
  const { search, create, withCreate, floatingButtons, searchStore, displayButton, setLaunchSearchData, launchSearchData } =
    props as ListSearchProps;

  const [keyWord, setKeyWord] = useState(searchStore?.filter? searchStore?.filter : "");

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    clearTimeout(typeTimeout);
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      search(keyWord);
    }
  };

  if(launchSearchData) {
    search(keyWord);
    setLaunchSearchData(false);
  }

  const clickSearch = () => {
    search(keyWord);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKeyWord(e.target.value);
    typeTimeout = setTimeout(function () {
      search(e.target.value);
    }, 1000);
  };

  return (
    <Grid container={true} spacing={2} alignItems="center">
      <Grid item={true} spacing={2} alignItems="center" container={true} xs={8}>
        <Grid item={true}>
          <TextField
            label="Rechercher"
            name="filter"
            value={keyWord}
            className={classes.searchField}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </Grid>
        <Grid item={true}>
          {(displayButton ?? true) && (
            <Button
              size="small"
              className={classes.btn}
              classes={{ label: classes.btnLabel }}
              onClick={clickSearch}>
              Rechercher
            </Button>
          )}
        </Grid>
        {withCreate && (
          <Grid item={true}>
            <Button
              size="small"
              className={classes.btn}
              classes={{ label: classes.btnLabel }}
              onClick={create}>
              créer
            </Button>
          </Grid>
        )}
      </Grid>
      {floatingButtons && floatingButtons.length && (
        <Grid item={true} className={classes.floatingButtons} xs={4}>
          {floatingButtons.map(({ label, onClick }) => (
            <Button
              key={label}
              onClick={onClick}
              variant="contained"
              size="small"
              className={classes.btnFloat}>
              {label}
            </Button>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default inject('searchStore')(observer(ListSearch));
