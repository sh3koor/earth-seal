import { AlertTriangle, CheckCircle, Clock, X, User } from 'lucide-react';
import { EnhancedAlert } from '@/react-app/hooks/useEnhancedRealTimeData';

interface AlertPanelProps {
  alerts: EnhancedAlert[];
}

export default function AlertPanel({ alerts }: AlertPanelProps) {

  const getAlertIcon = (type: EnhancedAlert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertStyle = (type: EnhancedAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/30';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/30';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/30';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'acknowledged':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Alerts</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            {alerts.filter(a => a.status === 'acknowledged').length} Ack'd
          </span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
            <p>All systems operating normally</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertStyle(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                      <span className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        {alert.site}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityStyle(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{alert.message}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{alert.timestamp}</p>
                    
                    {alert.acknowledgedBy && (
                      <div className="flex items-center space-x-1 text-xs text-blue-700 dark:text-blue-400">
                        <User className="w-3 h-3" />
                        <span>Ack'd by {alert.acknowledgedBy}</span>
                      </div>
                    )}
                    
                    {alert.assignedTo && (
                      <div className="flex items-center space-x-1 text-xs text-purple-700 dark:text-purple-400">
                        <User className="w-3 h-3" />
                        <span>Assigned to {alert.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm">
            View All Alerts ({alerts.length})
          </button>
        </div>
      )}
    </div>
  );
}
