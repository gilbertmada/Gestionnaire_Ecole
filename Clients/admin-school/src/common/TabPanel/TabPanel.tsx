import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FC } from 'react';

interface TabPanelProps {
  value: number;
  index: number;
  children: any;
}

const TabPanel: FC<TabPanelProps> = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={0}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
