import { useEffect } from 'react';
import eventBus from '../utils/eventBus/eventBus';
import { IEvents } from '../utils/eventBus/types';

type Callback = (data: IEvents) => void;

const useEventHook = (listener: string, callback: Callback) => {
  useEffect(() => {
    eventBus.on(listener, callback);

    return () => {
      eventBus.off(listener, callback);
    };
  }, []);
};

export default useEventHook;
