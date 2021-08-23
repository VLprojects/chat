import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react';
import { WineLoader } from 'ui-kit';
import api from '../../api';
import { IRGetNode } from '../../types/serverResponses';
import useKeystone from '../../keystone';
import { getInitialData } from '../../keystone/service';

interface Props {
  children: ReactNode;
}

const SocketLayout = observer(({ children }: Props): JSX.Element => {
  const { socket, auth } = useKeystone();
  const root = useKeystone();

  useEffect(() =>
    autorun(async () => {
      if (!socket.isSocketConnected) {
        const response = (await api.get(`get-node`)) as IRGetNode;
        if (response.uri) {
          socket.connect(response.uri, auth.accessToken);
        }
      }
    }),
  );

  useEffect(() =>
    reaction(
      () => socket.isSocketConnected,
      (isSocketConnected) => {
        if (isSocketConnected) {
          getInitialData(root);
        }
      },
    ),
  );

  if (!socket.isSocketConnected) {
    return (
      <>
        <WineLoader />
      </>
    );
  }

  return <>{children}</>;
});

export default SocketLayout;
