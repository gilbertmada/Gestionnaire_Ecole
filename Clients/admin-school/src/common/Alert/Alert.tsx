import MuiAlert from '@material-ui/lab/Alert';
import { FC } from 'react';

const Alert: FC<any> = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
