import React, { ReactNode, useEffect } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';

import { WineLoader } from 'ui-kit';
import useStores from 'stores/root';

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
