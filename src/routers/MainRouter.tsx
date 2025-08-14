import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { AboutPomodoro } from '../pages/AboutPomodoro';
import { useEffect } from 'react';

export function MainRouter() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-pomodoro/' element={<AboutPomodoro />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
