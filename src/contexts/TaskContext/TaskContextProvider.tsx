import React, { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimeWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const timerWorker = TimerWorkerManager.getInstance();
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  timerWorker.onmessage(e => {
    const secondsRemaining = e.data;

    if (secondsRemaining <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionTypes.COMPLETED_TASK });
      timerWorker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining },
      });
    }
  });

  useEffect(() => {
    console.log(state);
    if (!state.activeTask) {
      timerWorker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chron Timer`;

    timerWorker.postMessage(state);
  }, [state, timerWorker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
