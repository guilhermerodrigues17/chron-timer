import styles from './styles.module.css';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();

  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakRef = useRef<HTMLInputElement>(null);
  const longBreakRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const workTime = Number(workTimeRef.current?.value);
    const shortBreak = Number(shortBreakRef.current?.value);
    const longBreak = Number(longBreakRef.current?.value);

    const formErrors = [];

    if (isNaN(workTime) || isNaN(shortBreak) || isNaN(longBreak)) {
      formErrors.push('O valor digitado nos campos deve ser um número!');
    }

    if (workTime < 25 || workTime > 90) {
      formErrors.push('O valor para foco deve ser entre 1 e 90 minutos');
    }

    if (shortBreak < 5 || shortBreak > 20) {
      formErrors.push(
        'O valor para descanso curto deve ser entre 5 e 20 minutos',
      );
    }

    if (longBreak < 15 || longBreak > 40) {
      formErrors.push(
        'O valor para descanso longo deve ser entre 20 e 40 minutos',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreak,
        longBreak,
      },
    });
    showMessage.success('Configurações salvas');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Ajuste o tempo de duração para cada ciclo de foco, descanso curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form className={styles.form} onSubmit={handleSaveSettings}>
          <div className={styles.formRow}>
            <DefaultInput
              type='number'
              id='workTime'
              labelText='Foco'
              ref={workTimeRef}
              defaultValue={state.config.workTime}
            />
          </div>

          <div className={styles.formRow}>
            <DefaultInput
              type='number'
              id='shortBreak'
              labelText='Descanso curto'
              ref={shortBreakRef}
              defaultValue={state.config.shortBreak}
            />
          </div>

          <div className={styles.formRow}>
            <DefaultInput
              type='number'
              id='longBreak'
              labelText='Descanso longo'
              ref={longBreakRef}
              defaultValue={state.config.longBreak}
            />
          </div>

          <div className={styles.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
