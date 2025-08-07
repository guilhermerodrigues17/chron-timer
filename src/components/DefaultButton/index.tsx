import type React from 'react';
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: 'defaultGreen' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({
  icon,
  color = 'defaultGreen',
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
