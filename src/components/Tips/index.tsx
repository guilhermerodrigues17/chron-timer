import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';

type TipsProps = {
  nextCycleType: TaskModel['type'];
};

export function Tips({ nextCycleType }: TipsProps) {
  const { state } = useTaskContext();

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Foque por <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreak: (
      <span>
        Descanse por <b>{state.config.shortBreak}min</b>
      </span>
    ),
    longBreak: (
      <span>
        Descanse por <b>{state.config.longBreak}min</b>
      </span>
    ),
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreak: (
      <span>
        Próximo descanso é de <b>{state.config.shortBreak}min</b>
      </span>
    ),
    longBreak: (
      <span>
        Próximo descanso é de <b>{state.config.longBreak}min</b>
      </span>
    ),
  };

  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
