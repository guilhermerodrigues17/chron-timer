import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';

import styles from './styles.module.css';
import { Link } from '../Link';

export function Menu() {
  return (
    <nav className={styles.menu}>
      <Link href='#'>
        <HouseIcon />
      </Link>

      <Link href='#'>
        <HistoryIcon />
      </Link>

      <Link href='#'>
        <SettingsIcon />
      </Link>

      <Link href='#'>
        <SunIcon />
      </Link>
    </nav>
  );
}
