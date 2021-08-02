import SocketLayout from 'containers/SocketLayout';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import Routes from 'routes';
import useStores from 'stores/rootStore';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<unknown> | React.ComponentType<RouteComponentProps<any>>;
}
const PrivateRoute: FC<IProps> = observer((props) => {
  const { authStore } = useStores();
  const { component: Component, ...rest } = props;

  return authStore.isAuthorized ? (
    <SocketLayout>
      <Route
        {...rest}
        // eslint-disable-next-line arrow-body-style
        render={(route_props) => {
          return (
            <>
              <Component {...route_props} />
            </>
          );
        }}
      />
    </SocketLayout>
  ) : (
    <Redirect to={{ pathname: `/${Routes.Login}` }} />
  );
});

export default PrivateRoute;
