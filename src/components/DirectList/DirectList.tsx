import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { HEADER_HEIGHT, SUBHEADER_HEIGHT } from '../../theme/consts';
import Footer from './components/Footer';

interface IChannelsList {
  list: [];
  onSelected: (id: string) => void;
}

type TDirectListUser = {
  id: string;
  username: string;
  about: string;
  online: string;
};

const DirectList: FC<IChannelsList> = (props) => {
  const { list, onSelected } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100% - ${HEADER_HEIGHT}px - ${SUBHEADER_HEIGHT}px)`,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        {list && (
          <ul>
            {list.map((item: TDirectListUser) => (
              <li aria-hidden="true" onClick={() => onSelected(item.id)}>
                <div>
                  <div>{item.username}</div>
                  <div>{item.about}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default observer(DirectList);
