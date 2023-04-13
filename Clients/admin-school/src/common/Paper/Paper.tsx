import { Paper } from '@material-ui/core';
import { FC } from 'react';

const AutocompletePaper: FC = ({ children }) => (
  <Paper style={{ background: 'white' }}>{children}</Paper>
);

export default AutocompletePaper;
