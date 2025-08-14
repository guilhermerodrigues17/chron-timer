import type React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<'a'>;

export function RouterLink({ href, children, className, ...props }: LinkProps) {
  const styleClassName = className ? className : styles.link;
  return (
    <Link to={href} className={styleClassName} {...props}>
      {children}
    </Link>
  );
}
