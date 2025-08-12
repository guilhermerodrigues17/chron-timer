import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import type { TaskActionsModel } from './taskActions';

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionsModel>;
};

const initialContext: TaskContextProps = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContext);
