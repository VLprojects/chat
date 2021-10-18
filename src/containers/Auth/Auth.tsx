import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Drawer from '../../components/Drawer';
import useKeystone from '../../keystone';
import { AuthModeEnum } from '../../types/enums';
import ActionBlock from './components/ActionBlock';
import Guest from './components/Guest';
import Signin from './components/Signin';
import Signup from './components/Signup';
import useStyles from './styles';

const Auth = () => {
  const intl = useIntl();
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

  const renderMode = () => {
    switch (settings.authMode) {
      case AuthModeEnum.Mode1:
        return <ActionBlock buttonText={intl.formatMessage({ id: 'signIn' })} onClickButton={onSignIn} />;
      case AuthModeEnum.Mode2:
      case AuthModeEnum.Mode4:
        return (
          <ActionBlock
            buttonText={intl.formatMessage({ id: 'loginAsGuest' })}
            onClickButton={onGuestEnter}
            footerActions={[{ text: intl.formatMessage({ id: 'signIn' }), onClick: onSignIn }]}
          />
        );
      case AuthModeEnum.Mode5:
      case AuthModeEnum.Mode7:
        return (
          <ActionBlock
            buttonText={intl.formatMessage({ id: 'createAccount' })}
            onClickButton={onSignUp}
            footerActions={[{ text: intl.formatMessage({ id: 'signIn' }), onClick: onSignIn }]}
          />
        );
      case AuthModeEnum.Mode6:
        return (
          <ActionBlock
            buttonText={intl.formatMessage({ id: 'loginAsGuest' })}
            onClickButton={onGuestEnter}
            footerActions={[
              { text: intl.formatMessage({ id: 'createAccount' }), onClick: onSignUp },
              { text: intl.formatMessage({ id: 'signIn' }).toLocaleLowerCase(), onClick: onSignIn },
            ]}
          />
        );
      case AuthModeEnum.Mode8:
        return (
          <ActionBlock
            buttonText={intl.formatMessage({ id: 'loginAsGuest' })}
            onClickButton={onGuestEnter}
            footerActions={[
              { text: intl.formatMessage({ id: 'createAccount' }), onClick: onSignUp },
              {
                text: intl.formatMessage({ id: 'signIn' }).toLocaleLowerCase(),
                onClick: onSignIn,
              },
            ]}
          />
        );
      default:
        return null;
    }
  };

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
        <div className={classes.footer}>{renderMode()}</div>
      </div>
    </>
  );
};

export default observer(Auth);
