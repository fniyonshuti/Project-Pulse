import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Dashboard } from '../components/Dashboard';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

type Page = 'home' | 'features' | 'dashboard' | 'login' | 'signup';

interface PagesProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLoginSuccess: () => void;
  isAuthenticated: boolean;
}

const AuthPageLayout: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

export const Pages: React.FC<PagesProps> = ({
  currentPage,
  onNavigate,
  onLoginSuccess,
  isAuthenticated,
}) => {
  return (
    <>
      {currentPage === 'home' && (
        <Hero onCTAClick={() => onNavigate('login')} />
      )}

      {currentPage === 'features' && <Features />}

      {currentPage === 'dashboard' && (
        isAuthenticated ? (
          <Dashboard onNavigate={onNavigate} />
        ) : (
          <AuthPageLayout
            title="Please log in to view your dashboard"
            subtitle="Access your projects and insights after signing in."
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg 
                         font-semibold hover:from-blue-700 hover:to-blue-800 
                         transition-all duration-300 ease-in-out transform
                         shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                         focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
              >
                Go to Login
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 
                         hover:underline"
              >
                Need an account? Sign up
              </button>
            </div>
          </AuthPageLayout>
        )
      )}

      {currentPage === 'login' && (
        <AuthPageLayout
          title="Welcome back"
          subtitle="Sign in to continue to your dashboard."
        >
          <LoginForm onSuccess={onLoginSuccess} />
          <div className="mt-6 text-sm text-gray-700 flex items-center gap-2">
            <span>Don't have an account?</span>
            <button
              className="text-blue-600 hover:text-blue-700 font-semibold transition-all duration-200 
                       hover:underline hover:scale-105 active:scale-95"
              onClick={() => onNavigate('signup')}
            >
              Create one
            </button>
          </div>
        </AuthPageLayout>
      )}

      {currentPage === 'signup' && (
        <AuthPageLayout
          title="Create your account"
          subtitle="Join Project Pulse to manage your projects effortlessly."
        >
          <SignupForm onSuccess={onLoginSuccess} />
          <div className="mt-6 text-sm text-gray-700 flex items-center gap-2">
            <span>Already have an account?</span>
            <button
              className="text-blue-600 hover:text-blue-700 font-semibold transition-all duration-200 
                       hover:underline hover:scale-105 active:scale-95"
              onClick={() => onNavigate('login')}
            >
              Log in
            </button>
          </div>
        </AuthPageLayout>
      )}
    </>
  );
};

export type { Page };