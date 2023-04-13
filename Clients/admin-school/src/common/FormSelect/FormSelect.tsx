import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';

interface IFormeCustomer {
  Label: string;
  name: string;
  value: any;
  multiple?: boolean;
  inputChange: any;
  // data: any[];
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '90%',
      padding: 0,
      margin: ' 0 0 1vh 0',
    },
    selectEmpty: {
      marginTop: 0,
    },
  })
);

const FormSelect: FC<IFormeCustomer> = ({
  Label,
  disabled,
  name,
  value,
  inputChange,
  // data,
  error,
  multiple,
  required,
}) => {
  const classes = useStyles();

  return (
    <FormControl required={required} className={classes.formControl} error={error}>
      <InputLabel id="demo-simple-select-helper-label">{Label}</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={inputChange}
        disabled={disabled}
        required={required}
        multiple={multiple}>
        {/* {Array.isArray(data) &&
          data.map(listItemSelect => {
            return (
              <MenuItem
                key={listItemSelect}
                value={listItemSelect}
                style={{
                  backgroundColor: 'white',
                }}>
                {listItemSelect}
              </MenuItem>
            );
          })} */}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
