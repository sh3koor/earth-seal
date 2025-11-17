import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status: 'normal' | 'warning' | 'critical';
}

export default function MetricCard({ 
  title, 
  value, 
  unit, 
  icon, 
  trend, 
  trendValue, 
  status 
}: MetricCardProps) {
  const statusColors = {
    normal: 'border-emerald-200 bg-white dark:border-emerald-800 dark:bg-gray-800',
    warning: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30',
    critical: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 shadow-sm transition-all hover:shadow-md ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            {icon}
          </div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
        
        {trend && trendValue && (
          <div className="flex items-center space-x-1 text-sm">
            {getTrendIcon()}
            <span className={`${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-lg text-gray-600 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
