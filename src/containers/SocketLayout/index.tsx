import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react';
import useStores from 'stores/rootStore';
import { WineLoader } from 'ui-kit';

interface Props {
  children: ReactNode;
}

const SocketLayout = observer(({ children }: Props): JSX.Element => {
  const { socketStore } = useStores();

  const autoRunFn = () => {
    if (!socketStore.isSocketConnected) {
      socketStore.connectToSocketServer();
    }
  };

  useEffect(() => autorun(autoRunFn));

  if (!socketStore.isSocketConnected) {
    return (
      <>
        <WineLoader />
      </>
    );
  }

  return <>{children}</>;
});

export default SocketLayout;
