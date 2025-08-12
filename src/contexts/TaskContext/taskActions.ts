import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
} as const;

export type TaskActionTypes = keyof typeof TaskActionTypes;

export type TaskActionsModel =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    };
