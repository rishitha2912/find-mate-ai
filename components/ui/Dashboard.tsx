import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  Search,
  BarChart3,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

interface RecentItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: 'lost' | 'found' | 'matched';
  image?: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  const stats: Stat[] = [
    {
      label: 'Total Items',
      value: '2,847',
      change: '+12% from last month',
      trend: 'up',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      label: 'Items Matched',
      value: '1,234',
      change: '+8% from last month',
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      label: 'Active Cases',
      value: '567',
      change: '-3% from last month',
      trend: 'down',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      label: 'This Month',
      value: '189',
      change: '+24% from last month',
      trend: 'up',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const recentItems: RecentItem[] = [
    {
      id: '1',
      title: 'iPhone 13 Pro Max',
      category: 'Electronics',
      location: 'Chennai T Nagar',
      date: '2 hours ago',
      status: 'lost'
    },
    {
      id: '2',
      title: 'Black Leather Wallet',
      category: 'Accessories',
      location: 'Bangalore Koramangala',
      date: '4 hours ago',
      status: 'found'
    },
    {
      id: '3',
      title: 'Car Keys with BMW fob',
      category: 'Keys',
      location: 'Mumbai Bandra',
      date: '6 hours ago',
      status: 'matched'
    },
    {
      id: '4',
      title: 'Blue Backpack',
      category: 'Bags',
      location: 'Delhi CP',
      date: '8 hours ago',
      status: 'lost'
    },
    {
      id: '5',
      title: 'Gold Wedding Ring',
      category: 'Jewelry',
      location: 'Hyderabad Gachibowli',
      date: '12 hours ago',
      status: 'found'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lost': return 'text-red-600 bg-red-50 border-red-200';
      case 'found': return 'text-primary-navy bg-blue-50 border-blue-200';
      case 'matched': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return null;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-primary-navy text-white rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Report Lost</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-primary-navy text-white rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Report Found</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-primary-navy text-white rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105">
            <Search className="w-5 h-5" />
            <span className="font-medium">Search Items</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-primary-navy text-white rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-primary-navy">
                {stat.icon}
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              {getTrendIcon(stat.trend)}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-primary-navy hover:opacity-80 font-medium">View All</button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentItems.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span>📱</span>
                      <span>{item.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>
                <button className="ml-4 text-primary-navy hover:opacity-80 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Electronics', icon: '📱', count: '432' },
            { name: 'Accessories', icon: '⌚', count: '287' },
            { name: 'Documents', icon: '📄', count: '156' },
            { name: 'Keys', icon: '🔑', count: '134' },
            { name: 'Bags', icon: '🎒', count: '98' },
            { name: 'Jewelry', icon: '💍', count: '76' }
          ].map((category, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} items</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 