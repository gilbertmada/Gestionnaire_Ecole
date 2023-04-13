import { FC } from 'react';
import useStyles from './style';

const BodyTitle: FC<{ title: string }> = ({ title }) => {
  const classes = useStyles();

  return <div className={classes.title}>{title}</div>;
};

export default BodyTitle;
