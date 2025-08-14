import type { TaskModel } from '../models/TaskModel';

export type SortTasksOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel;
};

export function sortTasks({
  tasks = [],
  field = 'startDate',
  direction = 'desc',
}: SortTasksOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    //Verify null values
    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    //Compare numbers
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    //Compare strings
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    //Do nothing
    return 0;
  });
}
