import LinearProgress from '@material-ui/core/LinearProgress';
import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { ReactNode, useEffect } from 'react';
import api from '../../api';
import useKeystone from '../../keystone';
import { getInitialData, redirectToInitial } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';

interface Props {
  children: ReactNode;
}

const SocketLayout = observer(({ children }: Props): JSX.Element => {
  const { socket, ui } = useKeystone();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() =>
    autorun(async () => {
      if (!socket.isSocketConnected) {
        try {
          const response = (await api.get(`centrifuge-token`)) as { token: string };
          if (response.token) {
            socket.connect(response.token);
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
              // when all initial data is ready we can place user on his entrypoint route
              // await here if there any extra API join channel calls
              await redirectToInitial(root);
              // now we got everything to start render
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
        <LinearProgress color="secondary" />
      </>
    );
  }

  return <>{children}</>;
});

export default SocketLayout;
