import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import Route from 'route-parser';
import useKeystone from '../../keystone';

export interface IRouterProps {
  route: string;
  children: JSX.Element;
}

export const Router: FC<IRouterProps> = observer(({ route, children }) => {
  const { ui } = useKeystone();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() =>
    autorun(() => {
      const params = new Route(route).match(ui.route);

      if (params) {
        ui.setParams(params);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    }),
  );

  if (isSuccess) {
    return children;
  }

  return null;
});
