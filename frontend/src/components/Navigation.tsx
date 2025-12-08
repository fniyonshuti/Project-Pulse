import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

import Modal from './Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type Page = 'home' | 'features' | 'dashboard' | 'login' | 'signup';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Features', page: 'features' },
    { label: 'Dashboard', page: 'dashboard' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Project Pulse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`font-medium transition ${
                  currentPage === page
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}

            {/* Login & Signup Buttons */}
            <button
              onClick={() => setModalType('login')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </button>

            <button
              onClick={() => setModalType('signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className="text-left py-2 px-3 rounded hover:bg-gray-100 font-medium"
              >
                {label}
              </button>
            ))}

            {/* Mobile Login & Signup */}
            <button
              onClick={() => setModalType('login')}
              className="text-left py-2 px-3 rounded hover:bg-gray-100 font-medium"
            >
              Login
            </button>

            <button
              onClick={() => setModalType('signup')}
              className="text-left py-2 px-3 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={modalType === 'login'}
        onClose={() => setModalType(null)}
        title="Login"
      >
        <LoginForm />
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={modalType === 'signup'}
        onClose={() => setModalType(null)}
        title="Create Account"
      >
        <SignupForm />
      </Modal>
    </nav>
  );
};
