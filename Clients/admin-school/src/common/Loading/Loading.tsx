import CircularProgress from '@material-ui/core/CircularProgress';
import { FC } from 'react';
import useStyles from './style';

const Loading: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
