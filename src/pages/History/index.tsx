import styles from './styles.module.css';

import { Trash } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );
  const hasTasks = sortTasksOptions.tasks.length > 0;
  const [confirmResetHistory, setConfirmResetHistory] = useState(false);

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm(
      'Tem certeza que deseja limpar o histórico?',
      confirmation => {
        setConfirmResetHistory(confirmation);
      },
    );
  }

  useEffect(() => {
    setSortTasksOptions(prevState => {
      return {
        ...prevState,
        tasks: sortTasks({
          tasks: state.tasks,
          field: prevState.field,
          direction: prevState.direction,
        }),
      };
    });
  }, [state.tasks]);

  useEffect(() => {
    if (confirmResetHistory === false) return;

    dispatch({ type: TaskActionTypes.RESET_TASKS });
  }, [confirmResetHistory, dispatch]);

  function handleSortTasksByField({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  const taskTypeMap = {
    workTime: 'Foco',
    shortBreak: 'Descanso curto',
    longBreak: 'Descanso longo',
  };

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            {hasTasks && (
              <DefaultButton
                icon={<Trash />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            )}
          </span>
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasksByField({ field: 'name' })}
                    className={styles.tableTh}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() =>
                      handleSortTasksByField({ field: 'duration' })
                    }
                    className={styles.tableTh}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() =>
                      handleSortTasksByField({ field: 'startDate' })
                    }
                    className={styles.tableTh}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeMap[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
