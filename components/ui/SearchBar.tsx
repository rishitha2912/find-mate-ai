'use client'

import React, { useState } from 'react';
import { Search, MapPin, Filter, Clock, Tag } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (searchData: SearchData) => void;
  className?: string;
}

interface SearchData {
  query: string;
  category: string;
  location: string;
  dateRange: string;
  type: 'all' | 'lost' | 'found';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    query: '',
    category: '',
    location: '',
    dateRange: '',
    type: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'electronics', label: 'Electronics', icon: '📱' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'accessories', label: 'Accessories', icon: '⌚' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'keys', label: 'Keys', icon: '🔑' },
    { id: 'bags', label: 'Bags', icon: '🎒' },
    { id: 'jewelry', label: 'Jewelry', icon: '💍' },
    { id: 'other', label: 'Other', icon: '📦' }
  ];

  const locations = [
    'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata', 'Noida'
  ];

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' }
  ];

  const handleSearch = () => {
    onSearch?.(searchData);
  };

  const handleInputChange = (field: keyof SearchData, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex items-center p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchData.query}
            onChange={(e) => handleInputChange('query', e.target.value)}
            placeholder="Search for lost or found items..."
            className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-navy focus:outline-none transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div className="flex items-center space-x-3 ml-4">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              showFilters 
                ? 'bg-primary-navy text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Filters</span>
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-primary-navy hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          {/* Item Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Item Type</label>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'lost', label: 'Lost Items' },
                { id: 'found', label: 'Found Items' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleInputChange('type', type.id as 'all' | 'lost' | 'found')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    searchData.type === type.id
                      ? 'bg-primary-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select
                value={searchData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <select
                value={searchData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <select
                value={searchData.dateRange}
                onChange={(e) => handleInputChange('dateRange', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                <option value="">Any Time</option>
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quick Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleInputChange('category', cat.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    searchData.category === cat.id
                      ? 'bg-primary-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 