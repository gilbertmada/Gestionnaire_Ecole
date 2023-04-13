// @ts-nocheck
import { Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { FC, useState } from 'react';
import { FooterIcon } from '../../interface';
import useStyles from './style';

const IconItem: FC<FooterIcon> = ({
  ItemIcon,
  onClick,
  type,
  fontSize,
  label,
  id,
  options,
  title,
  disabled,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
    if (onClick) onClick(event);
  };

  const handleOptionClick = (clickHandler: (e: MouseEvent) => void) => (e: MouseEvent) => {
    handleClose();
    clickHandler(e);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid key={id} item={true}>
      <Tooltip title={title || ''} placement="top" aria-label="add">
        <IconButton
          aria-label={label}
          classes={{ colorPrimary: classes.white }}
          onClick={handleClick}
          type={type}
          color="primary"
          disabled={disabled}>
          <ItemIcon fontSize={fontSize || 'large'} />
        </IconButton>
      </Tooltip>
      {options && (
        <Menu
          id={`${label}-menu`}
          anchorEl={anchorEl}
          keepMounted={true}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          {options.map(({ label: optionLabel, onClick: optionClick }) => (
            <MenuItem
              classes={{ root: classes.menuItem }}
              key={optionLabel}
              onClick={handleOptionClick(optionClick)}>
              {optionLabel}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Grid>
  );
};

export default IconItem;
