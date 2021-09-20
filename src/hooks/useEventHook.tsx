import { useEffect } from 'react';
import eventBus from '../utils/eventBus/eventBus';
import { IEvents } from '../utils/eventBus/types';

const useEventHook: (listener: string, callback: (data: IEvents) => void) => void = (
  listener: string,
  callback: (data: IEvents) => void,
) => {
  useEffect(() => {
    eventBus.on(listener, (data: IEvents) => {
      callback?.(data);
    });

    return () => {
      eventBus.off(listener, () => {});
    };
  }, []);
};

export default useEventHook;
