import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import useKeystone from '../../keystone';
import { redirectToInitial } from '../../keystone/service';
import Drawer from '../../components/Drawer';
import useStyles from './styles';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { AuthModeEnum } from '../../types/enums';
import Guest from './components/Guest';
import ActionBlock from './components/ActionBlock';

const Auth = observer(() => {
  const classes = useStyles();
  const root = useKeystone();
  const { settings } = root;

  const [openDrawerSignIn, setOpenDrawerSignIn] = useState(false);
  const [openDrawerSignUp, setOpenDrawerSignUp] = useState(false);
  const [openDrawerGuestEnter, setOpenDrawerGuestEnter] = useState(false);

  const onSignUp = () => {
    setOpenDrawerSignIn(false);
    setOpenDrawerSignUp(true);
  };

  const onSignIn = () => {
    setOpenDrawerSignUp(false);
    setOpenDrawerSignIn(true);
  };

  const onGuestEnter = () => {
    setOpenDrawerGuestEnter(true);
  };

  useEffect(() =>
    reaction(
      () => root.auth.isAuthorized,
      (isAuthorized) => {
        if (isAuthorized) {
          redirectToInitial(root);
        }
      },
    ),
  );

  return (
    <>
      <Drawer open={openDrawerSignUp} onClickClose={() => setOpenDrawerSignUp(false)}>
        <Signup onClickSignIn={onSignIn} />
      </Drawer>

      <Drawer open={openDrawerSignIn} onClickClose={() => setOpenDrawerSignIn(false)}>
        <Signin onClickSignUp={onSignUp} />
      </Drawer>

      <Drawer open={openDrawerGuestEnter} onClickClose={() => setOpenDrawerGuestEnter(false)}>
        <Guest />
      </Drawer>

      <div className={classes.container}>
        <div className={classes.footer}>
          {settings.authMode === AuthModeEnum.Mode1 && <ActionBlock buttonText="Sign in" onClickButton={onSignIn} />}

          {settings.authMode === AuthModeEnum.Mode2 && (
            <ActionBlock
              buttonText="Login as guest"
              onClickButton={onGuestEnter}
              footerActions={[{ text: 'Sign in', onClick: () => onSignIn() }]}
            />
          )}

          {settings.authMode === AuthModeEnum.Mode3}

          {settings.authMode === AuthModeEnum.Mode4 && (
            <ActionBlock
              buttonText="Login as guest"
              onClickButton={onGuestEnter}
              footerActions={[{ text: 'Sign in', onClick: () => onSignIn() }]}
            />
          )}

          {settings.authMode === AuthModeEnum.Mode5 && (
            <ActionBlock
              buttonText="Create an account"
              onClickButton={onSignUp}
              footerActions={[{ text: 'Sign in', onClick: () => onSignIn() }]}
            />
          )}

          {settings.authMode === AuthModeEnum.Mode6 && (
            <ActionBlock
              buttonText="Login as guest"
              onClickButton={onGuestEnter}
              footerActions={[
                { text: 'Create an account', onClick: () => onSignUp() },
                { text: 'sign in', onClick: () => onSignIn() },
              ]}
            />
          )}

          {settings.authMode === AuthModeEnum.Mode7 && (
            <ActionBlock
              buttonText="Create an account"
              onClickButton={onSignUp}
              footerActions={[{ text: 'Sign in', onClick: () => onSignIn() }]}
            />
          )}

          {settings.authMode === AuthModeEnum.Mode8 && (
            <ActionBlock
              buttonText="Login as guest"
              onClickButton={onGuestEnter}
              footerActions={[
                { text: 'Create an account', onClick: () => onSignUp() },
                {
                  text: 'sign in',
                  onClick: () => onSignIn(),
                },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default Auth;
