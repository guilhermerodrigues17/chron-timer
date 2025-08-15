import styles from './styles.module.css';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import type { ToastContentProps } from 'react-toastify';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.btnContainer}>
          <DefaultButton
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label='Confirmar a ação'
            title='Confirmar'
          />
          <DefaultButton
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            color='red'
            aria-label='Cancelar a ação e fechar'
            title='Cancelar'
          />
        </div>
      </div>
    </>
  );
}
