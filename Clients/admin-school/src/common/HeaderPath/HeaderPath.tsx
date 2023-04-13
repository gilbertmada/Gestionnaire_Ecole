import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './style';

interface PathItem {
  label: string;
  path: string;
  clickHandler?: (path: string) => (e?: any) => void;
}

interface PathProps {
  paths: PathItem[];
}

const Path: FC<PathProps> = ({ paths }) => {

  const classes = useStyles();
  const arrow = '>';
  const iMax = paths.length - 1;
  return (
    <span className={(paths.length === 1 && paths[0].label === "Dashboard")? classes.linkDash : classes.link}>
      {paths.map((path, i) => {
        return (
          <Fragment key={path.label}>
            <Link
              to={path.path}
              className={classes.linkBody}
              onClick={path.clickHandler && path.clickHandler(path.path)}>
              {`${i > 0 ? ' ' : ''}${path.label}${i < iMax ? ' ' : ''}`}
            </Link>
            {i < iMax ? ` ${arrow}` : ''}
          </Fragment>
        );
      })}
    </span>
  );
};

export default Path;
