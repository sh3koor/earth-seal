import { CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastUpdate: string;
  details: string;
}

interface ComplianceStatusProps {
  items: ComplianceItem[];
  overallScore: number;
}

export default function ComplianceStatus({ items, overallScore }: ComplianceStatusProps) {
  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'non-compliant':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    }
  };

  const getStatusStyle = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800';
      case 'non-compliant':
        return 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800';
      case 'pending':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 75) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compliance Status</h2>
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Overall Compliance Score</span>
          <span>{overallScore}% of requirements met</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              overallScore >= 90 ? 'bg-emerald-500' :
              overallScore >= 75 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg border ${getStatusStyle(item.status)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{item.details}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Last updated: {item.lastUpdate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                item.status === 'compliant' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' :
                item.status === 'non-compliant' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
              }`}>
                {item.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
