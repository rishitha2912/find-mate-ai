'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, User, MapPin, ArrowRight, Phone, Mail, Building2, ChevronDown, Clock } from 'lucide-react'
import Link from 'next/link'
import CognizantLogo from '../components/ui/CognizantLogo'
import SearchBar from '../components/ui/SearchBar'
import Dashboard from '../components/ui/Dashboard'
import MobileNavigation from '../components/ui/MobileNavigation'
import { useToast } from '../components/ui/ToastContainer'

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isShippingDropdownOpen, setIsShippingDropdownOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const shippingDropdownRef = useRef<HTMLDivElement>(null)
  const { showSuccess, showError, showInfo } = useToast()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (shippingDropdownRef.current && !shippingDropdownRef.current.contains(event.target as Node)) {
        setIsShippingDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const cities = [
    {
      name: 'CHENNAI',
      bgClass: 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-90">
          {/* Temple base */}
          <rect x="5" y="45" width="50" height="10" fill="currentColor" opacity="0.9"/>
          {/* Main temple structure */}
          <rect x="15" y="25" width="30" height="25" fill="currentColor" opacity="0.8"/>
          {/* Central gopuram (tower) */}
          <polygon points="30,8 40,25 20,25" fill="currentColor"/>
          {/* Temple tiers */}
          <rect x="20" y="20" width="20" height="8" fill="currentColor" opacity="0.9"/>
          <rect x="22" y="15" width="16" height="8" fill="currentColor" opacity="0.8"/>
          <rect x="24" y="12" width="12" height="6" fill="currentColor" opacity="0.7"/>
          {/* Decorative elements */}
          <circle cx="25" cy="18" r="1.5" fill="currentColor"/>
          <circle cx="30" cy="18" r="1.5" fill="currentColor"/>
          <circle cx="35" cy="18" r="1.5" fill="currentColor"/>
          {/* Side pillars */}
          <rect x="10" y="30" width="4" height="20" fill="currentColor" opacity="0.7"/>
          <rect x="46" y="30" width="4" height="20" fill="currentColor" opacity="0.7"/>
          {/* Temple entrance */}
          <rect x="25" y="35" width="10" height="15" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
    },
    {
      name: 'BENGALURU',
      bgClass: 'bg-gradient-to-r from-green-400 to-blue-500',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-80">
          <rect x="2" y="40" width="56" height="15" fill="currentColor" opacity="0.8"/>
          <rect x="8" y="20" width="12" height="35" fill="currentColor" opacity="0.9"/>
          <rect x="25" y="15" width="18" height="40" fill="currentColor"/>
          <rect x="48" y="25" width="10" height="30" fill="currentColor" opacity="0.7"/>
          <polygon points="15,20 20,10 25,20" fill="currentColor"/>
          <polygon points="35,15 40,5 45,15" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: 'HYDERABAD',
      bgClass: 'bg-gradient-to-r from-purple-400 to-pink-500',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-80">
          <rect x="0" y="45" width="60" height="10" fill="currentColor" opacity="0.8"/>
          <rect x="20" y="25" width="20" height="30" fill="currentColor"/>
          <circle cx="30" cy="20" r="15" fill="currentColor" opacity="0.9"/>
          <rect x="25" y="8" width="10" height="8" fill="currentColor"/>
          <circle cx="30" cy="5" r="3" fill="currentColor"/>
          <rect x="10" y="35" width="8" height="15" fill="currentColor" opacity="0.7"/>
          <rect x="42" y="30" width="8" height="20" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
    },
    {
      name: 'PUNE',
      bgClass: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-80">
          <rect x="5" y="40" width="50" height="15" fill="currentColor" opacity="0.8"/>
          <rect x="12" y="28" width="14" height="27" fill="currentColor" opacity="0.9"/>
          <rect x="32" y="22" width="16" height="33" fill="currentColor"/>
          <rect x="5" y="32" width="8" height="23" fill="currentColor" opacity="0.7"/>
          <rect x="47" y="35" width="8" height="20" fill="currentColor" opacity="0.7"/>
          <circle cx="20" cy="25" r="3" fill="currentColor"/>
          <circle cx="40" cy="18" r="4" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: 'NOIDA',
      bgClass: 'bg-gradient-to-r from-blue-400 to-purple-500',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-80">
          <rect x="8" y="42" width="44" height="13" fill="currentColor" opacity="0.8"/>
          <rect x="15" y="25" width="12" height="30" fill="currentColor" opacity="0.9"/>
          <rect x="33" y="18" width="15" height="37" fill="currentColor"/>
          <rect x="5" y="35" width="8" height="20" fill="currentColor" opacity="0.7"/>
          <rect x="50" y="30" width="7" height="25" fill="currentColor" opacity="0.7"/>
          <rect x="20" y="15" width="8" height="40" fill="currentColor" opacity="0.8"/>
        </svg>
      ),
    },
    {
      name: 'KOLKATA',
      bgClass: 'bg-gradient-to-r from-teal-400 to-cyan-500',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white opacity-80">
          <rect x="3" y="45" width="54" height="10" fill="currentColor" opacity="0.8"/>
          <rect x="10" y="30" width="40" height="25" fill="currentColor" opacity="0.9"/>
          <rect x="20" y="20" width="20" height="35" fill="currentColor"/>
          <rect x="15" y="25" width="30" height="5" fill="currentColor" opacity="0.7"/>
          <circle cx="30" cy="15" r="8" fill="currentColor"/>
          <rect x="26" y="5" width="8" height="12" fill="currentColor"/>
          <polygon points="30,2 35,8 25,8" fill="currentColor"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <MobileNavigation currentPath="/" />
      
      {/* Header */}
      <header className="bg-primary-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <CognizantLogo size="xs" variant="light" />
            
                        {/* Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-4">
              {/* Future navigation items can be added here */}
            </nav>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2.5 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-navy" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">Account</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 transform transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm">Account Menu</h3>
                  </div>
                  
                  <Link 
                    href="/signin"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-navy hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Sign In</div>
                      <div className="text-xs text-gray-500">Access your account</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/signup"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-navy hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Sign Up</div>
                      <div className="text-xs text-gray-500">Create new account</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              FindMate
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              AI-Powered Lost & Found Assistant
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Connect lost items with their owners using advanced AI matching technology
            </p>
          </div>

          {/* Advanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-16">
            <SearchBar 
              onSearch={(searchData) => {
                showInfo(`Searching for: ${searchData.query || 'all items'}${searchData.category ? ` in ${searchData.category}` : ''}${searchData.location ? ` near ${searchData.location}` : ''}`);
              }}
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center mb-16 max-w-6xl mx-auto">
            {/* Lost Card */}
            <div className="card p-8 text-center bg-blue-50 border-2 border-blue-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-primary-navy" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">LOST</h3>
              <button 
                onClick={() => showSuccess('Lost item form will open - Feature coming soon!')}
                className="w-full bg-primary-navy hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Report Lost Item
              </button>
            </div>

            {/* Found Card */}
            <div className="card p-8 text-center bg-blue-50 border-2 border-blue-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-primary-navy" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">FOUND</h3>
              <button 
                onClick={() => showSuccess('Found item form will open - Feature coming soon!')}
                className="w-full bg-primary-navy hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Report Found Item
              </button>
            </div>

            {/* Dashboard Card */}
            <div className="card p-8 text-center bg-blue-50 border-2 border-blue-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-primary-navy" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DASHBOARD</h3>
              <button 
                onClick={() => setShowDashboard(!showDashboard)}
                className="w-full bg-primary-navy hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {showDashboard ? 'Hide Dashboard' : 'View Dashboard'}
              </button>
            </div>

            {/* Shipping Update Card */}
            <div className="card p-8 text-center bg-blue-50 border-2 border-blue-100 relative">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-primary-navy" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SHIPPING</h3>
              <button 
                onClick={() => setIsShippingDropdownOpen(!isShippingDropdownOpen)}
                className="w-full bg-primary-navy hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Shipping Update</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isShippingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Shipping Dropdown Menu */}
              {isShippingDropdownOpen && (
                <div 
                  ref={shippingDropdownRef}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 transition-all duration-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm">Shipping & Tracking</h3>
                  </div>
                  
                  <button
                    onClick={() => {
                      showInfo('Track Package - Enter tracking number to monitor your shipment');
                      setIsShippingDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Search className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Track Package</div>
                      <div className="text-xs text-gray-500">Monitor shipment status</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      showInfo('Update Delivery Address - Modify shipping details');
                      setIsShippingDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Update Address</div>
                      <div className="text-xs text-gray-500">Change delivery location</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      showInfo('Shipping History - View all past deliveries');
                      setIsShippingDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Shipping History</div>
                      <div className="text-xs text-gray-500">View past deliveries</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      showSuccess('Express Delivery - Fast shipping options available!');
                      setIsShippingDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary-navy" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Express Delivery</div>
                      <div className="text-xs text-gray-500">Fast shipping options</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      {showDashboard && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                FindMate Dashboard
              </h2>
              <p className="text-lg text-gray-600">
                Monitor lost and found items, track statistics, and manage your reports
              </p>
            </div>
            <Dashboard />
          </div>
        </section>
      )}

      {/* City Locations */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <div key={index} className="card overflow-hidden">
                <div className={`relative h-48 ${city.bgClass} flex flex-col items-center justify-center`}>
                  <div className="mb-2">
                    {city.icon}
                  </div>
                  <div className="text-white font-bold text-lg opacity-90">
                    {city.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center text-gray-900">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-navy hover:opacity-90 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report</h3>
              <p className="text-gray-600">Submit details about your lost or found item</p>
            </div>
            
            <ArrowRight className="hidden md:block text-gray-400 w-8 h-8" />
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-navy hover:opacity-90 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match</h3>
              <p className="text-gray-600">AI analyzes and matches items automatically</p>
            </div>
            
            <ArrowRight className="hidden md:block text-gray-400 w-8 h-8" />
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Notify</h3>
              <p className="text-gray-600">Get notified when a match is found</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <CognizantLogo size="sm" variant="light" className="mb-4" />
              <p className="text-gray-300">
                Leading the way in AI-powered solutions for everyday problems.
              </p>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-gray-300">support@findmate.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-gray-300">Global Offices</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Report Lost Item
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Report Found Item
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 Cognizant. All rights reserved. | FindMate - AI-Powered Lost & Found Assistant
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage 