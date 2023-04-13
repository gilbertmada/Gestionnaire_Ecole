import { observer } from 'mobx-react';
import { FC, memo, Suspense } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import { userStore } from '../../store';
import Layout from '../Layout';
import Loading from '../Loading';

type AccessType = 'private' | 'public' | 'authentication';

export interface ProtectedLazyRouteProps extends RouteProps {
  noAccessRedirection?: string;
  fallbackComponent?: FC;
  access: string[];
}

const defaultFallback = <Loading />;

const getNoAccessDefaultPath = (access: string[], noAccessRedirection?: string): string => {
  const isConnected = AuthServices.isAuthenticated();
  const loggedUser = userStore.user;
  if (isConnected && loggedUser) {
    if (access.includes(loggedUser.role)) {
      return '';
    }
    return noAccessRedirection || '/';
  }
  return '/login';
};

const ProtectedLazyRoute: FC<ProtectedLazyRouteProps> = props => {
  let redirectionPath = '';

  const { noAccessRedirection, component, fallbackComponent, access } = props;
  const FallbackComponent = fallbackComponent || defaultFallback;

  if (userStore.isGettingInfo) {
    return <Loading />;
  }

  redirectionPath = getNoAccessDefaultPath(access, noAccessRedirection);

  if (redirectionPath === '') {
    return (
      <Suspense fallback={FallbackComponent}>
        <Layout>
          <Route {...props} component={component as any} />
        </Layout>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={FallbackComponent}>
      <Redirect to={{ pathname: redirectionPath }} />
    </Suspense>
  );
};

export default memo(observer(ProtectedLazyRoute));
