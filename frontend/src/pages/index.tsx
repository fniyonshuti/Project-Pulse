import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Dashboard } from '../components/Dashboard';

type Page = 'home' | 'features' | 'dashboard';

interface PagesProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Pages: React.FC<PagesProps> = ({ currentPage, onNavigate }) => {
  return (
    <>
      {currentPage === 'home' && (
        <Hero onCTAClick={() => onNavigate('dashboard')} />
      )}
      {currentPage === 'features' && <Features />}
      {currentPage === 'dashboard' && <Dashboard />}
    </>
  );
};

export type { Page };