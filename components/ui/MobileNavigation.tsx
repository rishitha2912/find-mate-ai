'use client'

import React, { useState } from 'react';
import { Menu, X, Home, Search, Plus, User, Bell, Settings } from 'lucide-react';
import Link from 'next/link';

interface MobileNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const MobileNavigation: React.FC<MobileNavProps> = ({ 
  currentPath = '/', 
  onNavigate 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/', color: 'text-blue-600' },
    { icon: Search, label: 'Search', path: '/search', color: 'text-green-600' },
    { icon: Plus, label: 'Report', path: '/report', color: 'text-purple-600' },
    { icon: Bell, label: 'Alerts', path: '/alerts', color: 'text-orange-600' },
    { icon: User, label: 'Profile', path: '/profile', color: 'text-primary-navy' }
  ];

  const quickActions = [
    { label: 'Report Lost Item', action: 'lost', icon: '😰', bgColor: 'bg-red-50 border-red-200' },
    { label: 'Report Found Item', action: 'found', icon: '🎉', bgColor: 'bg-green-50 border-green-200' },
    { label: 'Search Items', action: 'search', icon: '🔍', bgColor: 'bg-blue-50 border-blue-200' },
    { label: 'My Reports', action: 'reports', icon: '📋', bgColor: 'bg-purple-50 border-purple-200' }
  ];

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  isActive 
                    ? `${item.color} bg-gray-50` 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-primary-navy text-white rounded-full shadow-lg md:hidden"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Slide-out Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            <div className="p-6 pt-20">
              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <button
                      key={action.action}
                      onClick={() => {
                        // Handle action
                        setIsMenuOpen(false);
                      }}
                      className={`w-full p-4 rounded-lg border-2 ${action.bgColor} flex items-center space-x-3 hover:shadow-md transition-shadow`}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="font-medium text-gray-800">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Search Items', path: '/search' },
                    { label: 'My Reports', path: '/reports' },
                    { label: 'Notifications', path: '/notifications' },
                    { label: 'Help & Support', path: '/help' },
                    { label: 'Settings', path: '/settings' }
                  ].map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Actions */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center p-3 bg-primary-navy text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center p-3 border-2 border-primary-navy text-primary-navy rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom navigation */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileNavigation; 