import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../interface/userInterface';
import useStyles from './style';

const ItemSection: FC<{
  image: any;
  title: string;
  numberCount: number | undefined;
  path: string;
  currentUser: IUser | null;
  permissions?: string[];
}> = ({ image, title, numberCount, path, permissions, currentUser }) => {
  const classes = useStyles();

  const history = useHistory();

  const redirect = (link: string) => () => {
    history.push(link);
  };

  const nbr = (e: number | undefined) => {
    if (e !== 0) {
      return e;
    }
  };

  if (permissions && !permissions.includes(currentUser?.role || '')) {
    return null;
  }

  return (
    <Grid item={true} xs={12} sm={6} md={4} className={classes.top}>
      <CardActionArea classes={{ root: classes.card }} onClick={redirect(path)}>
        <CardContent>
          <img src={image} alt="SCHOOL" className={classes.img} />

          <Box fontWeight={500} m={1} className={classes.title} fontSize={10} textAlign="center">
            {title}
          </Box>
          <Box fontWeight="fontWeightBold" m={1} textAlign="center">
            {nbr(numberCount)}
          </Box>
        </CardContent>
      </CardActionArea>
    </Grid>
  );
};

export default ItemSection;
