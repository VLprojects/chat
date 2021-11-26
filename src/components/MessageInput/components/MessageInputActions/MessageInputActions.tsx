import { deleteAllMessage } from 'containers/ChannelPage/service';
import MoreButton from 'hoc/MoreButtonHOC';
import useKeystone from 'keystone';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DropMenuItem } from 'ui-kit/components/DropMenu';

interface IProps {
  onClose?: () => void;
}

const MessageInputActions: React.FC<IProps> = (props) => {
  const { onClose } = props;
  const root = useKeystone();

  const onDeleteAllMessage = () => {
    deleteAllMessage(root);
    if (onClose) onClose();
  };

  return (
    <>
      <DropMenuItem action={onDeleteAllMessage}>
        <FormattedMessage id="deleteAllMessage" />
      </DropMenuItem>
    </>
  );
};

export default MoreButton(MessageInputActions);
