import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';

import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return savedTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const updatedTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return updatedTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink href='/' aria-label='Home' title='Ir para Home'>
        <HouseIcon />
      </RouterLink>

      <RouterLink href='/history/' aria-label='Histórico' title='Ver histórico'>
        <HistoryIcon />
      </RouterLink>

      <RouterLink
        href='/settings/'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>

      <RouterLink
        href='#'
        onClick={handleThemeChange}
        aria-label='Tema'
        title='Alterar tema'
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
