import React, { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimeWorkerManager';
import { TaskActionTypes } from './taskActions';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const timerWorker = TimerWorkerManager.getInstance();

  timerWorker.onmessage(e => {
    const secondsRemaining = e.data;

    if (secondsRemaining <= 0) {
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

    timerWorker.postMessage(state);
  }, [state, timerWorker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
