import { useSnackbar } from 'notistack';
import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import api from '../../api';
import { IRGetNode } from '../../types/serverResponses';
import useKeystone from '../../keystone';
import { getInitialData } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';

interface Props {
  children: ReactNode;
}

const SocketLayout = observer(({ children }: Props): JSX.Element => {
  const { socket, auth, ui } = useKeystone();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() =>
    autorun(async () => {
      if (!socket.isSocketConnected) {
        try {
          const response = (await api.get(`get-node`)) as IRGetNode;
          if (response.uri) {
            socket.connect(response.uri, auth.accessToken);
          }
        } catch (error) {
          enqueueSnackbar(getErrorMessage(error));
        }
      }
    }),
  );

  useEffect(() =>
    reaction(
      () => socket.isSocketConnected,
      (isSocketConnected) => {
        if (isSocketConnected) {
          (async () => {
            try {
              await getInitialData(root);
              ui.setInitialized(true);
            } catch (error) {
              enqueueSnackbar(getErrorMessage(error));
            }
          })();
        }
      },
    ),
  );

  if (!ui.initialized) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  return <>{children}</>;
});

export default SocketLayout;
