import styles from './styles.module.css';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Link({ href, children, className }: LinkProps) {
  const styleClassName = className ? className : styles.link;
  return (
    <a href={href} className={styleClassName}>
      {children}
    </a>
  );
}
