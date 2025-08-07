import type React from 'react';
import styles from './styles.module.css';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<'a'>;

export function Link({ href, children, className, ...props }: LinkProps) {
  const styleClassName = className ? className : styles.link;
  return (
    <a href={href} className={styleClassName} {...props}>
      {children}
    </a>
  );
}
