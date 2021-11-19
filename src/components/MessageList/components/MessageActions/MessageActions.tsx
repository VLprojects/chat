import { pinMessage } from 'containers/ChannelPage/service';
import MoreButton from 'hoc/MoreButtonHOC';
import useKeystone from 'keystone';
import React from 'react';
import { DropMenuItem } from 'ui-kit/components/DropMenu';

interface IProps {
  messageId: number;
  onClose?: () => void;
}

const MessageActions: React.FC<IProps> = (props) => {
  const { onClose } = props;

  const root = useKeystone();

  const onPinMessage = () => {
    pinMessage(root, props.messageId);
    if (onClose) onClose();
  };

  return (
    <>
      <DropMenuItem action={onPinMessage}>Pin message</DropMenuItem>
    </>
  );
};

export default MoreButton(MessageActions);
