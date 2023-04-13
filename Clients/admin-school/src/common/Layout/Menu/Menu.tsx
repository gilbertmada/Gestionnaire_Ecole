import { FC } from 'react';
import { AbstractEmptyInterface } from '../../../types';
import useStyles from './style';

interface MenuProps extends AbstractEmptyInterface {
  children: any;
  setClose: (e: boolean) => void;
  open: boolean;
}

const Menu: FC<AbstractEmptyInterface & { open: boolean } & { setClose: (e: boolean) => void }> =
  props => {
    const classes = useStyles();

    const { children, open, setClose } = props as MenuProps;

    const closeMenu = () => {
      setClose(false);
    };

    return (
      <div className={open ? classes.contentDisplay : classes.contentNoDisplay}>
        <div className={open ? classes.BoxDisplay : classes.BoxNoDisplay} onClick={closeMenu}>
          Click
        </div>
        <div>{children}</div>
      </div>
    );
  };

export default Menu;
