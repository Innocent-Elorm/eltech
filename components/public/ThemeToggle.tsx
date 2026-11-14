'use client';

import { useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('eltech-theme');
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = initialTheme;
    buttonRef.current?.setAttribute('aria-pressed', String(initialTheme === 'dark'));
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('eltech-theme', nextTheme);
    buttonRef.current?.setAttribute('aria-pressed', String(nextTheme === 'dark'));
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed="false"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:text-[#2563EB]"
    >
      <Moon className="theme-icon-light h-4 w-4" />
      <Sun className="theme-icon-dark hidden h-4 w-4" />
    </button>
  );
}
