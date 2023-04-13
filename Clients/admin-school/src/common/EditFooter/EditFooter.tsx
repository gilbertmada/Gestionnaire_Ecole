import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { FooterIcon } from '../interface';
import IconItem from './IconItem';
import useStyles from './style';

interface EditFooterProps {
  icons: FooterIcon[];
}

const EditFooter: FC<EditFooterProps> = ({ icons }) => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Grid container={true} justify="center">
        {icons.map(icon => (
          <IconItem key={icon.id} {...icon} />
        ))}
      </Grid>
    </div>
  );
};

export default EditFooter;
