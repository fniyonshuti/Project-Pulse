import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Pages, type Page } from './pages';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page: Page) => {
    // Only allow dashboard navigation when authenticated
    if (page === 'dashboard' && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <Pages
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;