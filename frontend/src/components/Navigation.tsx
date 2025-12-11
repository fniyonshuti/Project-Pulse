import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import type { Page } from '../pages';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Features', page: 'features' },
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Login', page: 'login' },
    { label: 'Sign Up', page: 'signup' },
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
          <div className="hidden md:flex items-center gap-6">
            {navItems
              .filter(({ page }) => page !== 'login' && page !== 'signup')
              .map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  className={`font-medium transition-all duration-200 ease-in-out ${
                    currentPage === page
                      ? 'text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:animate-slide-in'
                      : 'text-gray-600 hover:text-gray-900 hover:scale-105'
                  }`}
                >
                  {label}
                </button>
              ))}
            
            {/* Login Button */}
            <button
              onClick={() => handleNavClick('login')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out transform
                ${
                  currentPage === 'login'
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:scale-105 active:scale-95'
                }`}
            >
              Login
            </button>

            {/* Sign Up Button */}
            <button
              onClick={() => handleNavClick('signup')}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out transform
                shadow-md hover:shadow-lg
                ${
                  currentPage === 'signup'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 scale-105'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50'
                }`}
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
          <div className="md:hidden pb-4 flex flex-col gap-3 animate-fade-in">
            {navItems
              .filter(({ page }) => page !== 'login' && page !== 'signup')
              .map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  className={`text-left py-2 px-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                    ${
                      currentPage === page
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {label}
                </button>
              ))}
            
            {/* Mobile Login Button */}
            <button
              onClick={() => handleNavClick('login')}
              className={`text-left py-2.5 px-3 rounded-lg font-semibold transition-all duration-200 ease-in-out
                ${
                  currentPage === 'login'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
            >
              Login
            </button>

            {/* Mobile Sign Up Button */}
            <button
              onClick={() => handleNavClick('signup')}
              className="text-left py-2.5 px-3 rounded-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                         transition-all duration-200 ease-in-out shadow-md"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
