import { LinearProgress } from '@mui/material';
import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { ReactNode, useEffect, useState } from 'react';
import LoadingStatus from '../../components/LoadingStatus';
import { GET } from '../../api';
import useKeystone from '../../keystone';
import { getInitialData, redirectToInitial } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';

interface Props {
  children: ReactNode;
}

const SocketLayout = observer(({ children }: Props): JSX.Element => {
  const { socket } = useKeystone();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();
  const [initialDataReady, setInitialDataReady] = useState(false);


  useEffect(() =>
    autorun(async () => {
      if (!socket.isSocketConnected) {
        try {
          const response = (await GET(`centrifuge-token`)) as { token: string };
          if (root.settings.socketUrl && response.token) {
            socket.connect(root.settings.socketUrl, response.token);
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
              setInitialDataReady(true);
            } catch (error) {
              enqueueSnackbar(getErrorMessage(error));
            }
          })();
        }
      },
    ),
  );

  if (!socket.isSocketConnected) {
    return (
      <>
        <LinearProgress color="secondary" />
        <LoadingStatus intlId="loadingSocket" />
      </>
    );
  }

  if (!initialDataReady) {
    return (
      <>
        <LinearProgress color="secondary" />
        <LoadingStatus intlId="loadingInitial" />
      </>
    );
  }

  return <>{children}</>;
});

export default SocketLayout;
