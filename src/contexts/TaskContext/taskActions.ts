import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETED_TASK: 'COMPLETED_TASK',
  RESET_TASKS: 'RESET_TASKS',
  CHANGE_SETTINGS: 'CHANGE_SETTINGSS',
} as const;

export type TaskActionTypes = keyof typeof TaskActionTypes;

export type TaskActionsModel =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETED_TASK;
    }
  | {
      type: typeof TaskActionTypes.RESET_TASKS;
    };
