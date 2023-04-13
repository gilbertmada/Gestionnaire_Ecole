import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { FC } from 'react';
import dashboard from '../../../Assets/dashboard/dashboard.png';
import { authStore } from '../../../store';
import { UserStoreInterface } from '../../../store/UserStore';
import { AbstractEmptyInterface } from '../../../types';
import rowData from '../../Dashboard/data';
import ItemSection from '../ItemSection';
import useStyles from './style';

interface MenuListProps extends AbstractEmptyInterface {
  userStore: UserStoreInterface;
}

const MenuListItem: FC<AbstractEmptyInterface> = props => {
  const { userStore } = props as MenuListProps;
  const classes = useStyles();

  const nbr = (e: number) => {
    if (e !== 0) {
      return e;
    }
  };

  const pathDefault = `/${authStore.tokenUrl}`

  return (
    <div className={classes.sideNav}>
      <Grid container={true}>
        <ItemSection
          image={dashboard}
          title="Dashboard "
          numberCount={nbr(0)}
          path="/"
          // path={pathDefault}
          currentUser={userStore.user}
        />

        {rowData().map((row: any) => {
          return (
            <ItemSection
              key={row.titre}
              image={row.images}
              title={row.titre}
              numberCount={nbr(row.nbr)}
              path={row.link}
              currentUser={userStore.user}
              permissions={row.permissions}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default inject('userStore', 'authStore')(observer(MenuListItem));
