import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro/' className={styles.link}>
        Entenda como funciona a técnica Pomodoro 🍅
      </RouterLink>
      <RouterLink href='/' className={styles.link}>
        Chron Timer &copy; {new Date().getFullYear()}
      </RouterLink>
    </footer>
  );
}
