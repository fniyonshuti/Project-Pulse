import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Pages } from './pages';
import type { Page } from './pages';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        <Pages currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
    </ProjectProvider>
  );
}

export default App;