import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import Route from 'route-parser';
import useStores from 'stores/rootStore';

export interface IRouterProps {
  route: string;
  children: JSX.Element;
}

export const Router: FC<IRouterProps> = observer(({ route, children }) => {
  const { chatStore } = useStores();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() =>
    autorun(() => {
      const params = new Route(route).match(chatStore.route);

      if (params) {
        chatStore.setParams(params);
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
