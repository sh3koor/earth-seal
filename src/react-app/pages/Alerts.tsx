import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, X, Filter, Search, Check, UserPlus, MessageSquare, Shield } from 'lucide-react';
import { useEnhancedRealTimeData } from '@/react-app/hooks/useEnhancedRealTimeData';
import { useAuth } from '@/react-app/context/AuthContext';

export default function Alerts() {
  const { alerts, acknowledgeAlert, resolveAlert, requestJustification, provideJustification } = useEnhancedRealTimeData();
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [filterSite, setFilterSite] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [justificationText, setJustificationText] = useState('');
  
  // New state for acknowledge/resolve modals
  const [showAcknowledgeModal, setShowAcknowledgeModal] = useState<string | null>(null);
  const [showResolveModal, setShowResolveModal] = useState<string | null>(null);
  const [acknowledgeComment, setAcknowledgeComment] = useState('');
  const [resolveComment, setResolveComment] = useState('');

  // Get unique site names from alerts
  const uniqueSites = Array.from(new Set(alerts.map(a => a.site)));

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesSite = filterSite === 'all' || alert.site === filterSite;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSeverity && matchesSite && matchesSearch;
  });

  const getAlertIcon = (type: 'critical' | 'warning' | 'info') => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <Clock className="w-6 h-6 text-amber-600" />;
      case 'info':
        return <CheckCircle className="w-6 h-6 text-blue-600" />;
    }
  };

  const getAlertStyle = (type: 'critical' | 'warning' | 'info') => {
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
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700';
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

  const handleAcknowledge = (alertId: string) => {
    setShowAcknowledgeModal(alertId);
  };

  const handleResolve = (alertId: string) => {
    setShowResolveModal(alertId);
  };

  const submitAcknowledge = () => {
    if (showAcknowledgeModal && user && acknowledgeComment.trim()) {
      acknowledgeAlert(showAcknowledgeModal, user.name, acknowledgeComment.trim());
      setAcknowledgeComment('');
      setShowAcknowledgeModal(null);
    }
  };

  const submitResolve = () => {
    if (showResolveModal && user && resolveComment.trim()) {
      resolveAlert(showResolveModal, user.name, resolveComment.trim());
      setResolveComment('');
      setShowResolveModal(null);
    }
  };

  const handleRequestJustification = (alertId: string) => {
    requestJustification(alertId, 'Operations Team');
  };

  const handleProvideJustification = (alertId: string) => {
    if (justificationText.trim()) {
      provideJustification(alertId, justificationText);
      setJustificationText('');
      setSelectedAlert(null);
    }
  };

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  };

  return (
    <div className="space-y-8">
      {/* Acknowledge Modal */}
      {showAcknowledgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Acknowledge Alert</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Please provide a comment for acknowledging this alert:</p>
            <textarea
              value={acknowledgeComment}
              onChange={(e) => setAcknowledgeComment(e.target.value)}
              placeholder="Enter your acknowledgment comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              required
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={submitAcknowledge}
                disabled={!acknowledgeComment.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                Acknowledge
              </button>
              <button
                onClick={() => {
                  setShowAcknowledgeModal(null);
                  setAcknowledgeComment('');
                }}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resolve Alert</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Please provide a comment describing how this alert was resolved:</p>
            <textarea
              value={resolveComment}
              onChange={(e) => setResolveComment(e.target.value)}
              placeholder="Enter resolution details..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              required
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={submitResolve}
                disabled={!resolveComment.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                Resolve
              </button>
              <button
                onClick={() => {
                  setShowResolveModal(null);
                  setResolveComment('');
                }}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alert Management System</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor, acknowledge, and resolve system alerts with role-based access controls</p>
      </div>

      {/* Alert Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{alertCounts.total}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Total</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{alertCounts.critical}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Critical</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{alertCounts.high}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">High</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{alertCounts.medium}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Medium</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{alertCounts.active}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Active</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{alertCounts.acknowledged}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Acknowledged</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{alertCounts.resolved}</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Resolved</div>
        </div>
      </div>

      {/* User Role Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-900 dark:text-white font-medium">Logged in as: {user?.name}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user?.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
            }`}>
              {user?.role?.toUpperCase()}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' ? 'Can acknowledge, resolve, and assign alerts' : 'Can provide justifications and view alerts'}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {(['all', 'critical', 'warning', 'info'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filterType === type
                      ? 'bg-emerald-600 text-white dark:bg-emerald-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Sites</option>
              {uniqueSites.map(site => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold mb-2">No alerts found</h3>
              <p>All systems operating normally or no alerts match your filters</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 p-6 rounded-r-lg ${getAlertStyle(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                          {alert.site}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityStyle(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(alert.status)}`}>
                          {alert.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{alert.message}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{alert.timestamp}</p>

                      {/* Assignment and Justification Info */}
                      {alert.assignedTo && (
                        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded p-3 mb-3">
                          <p className="text-blue-800 dark:text-blue-300 text-sm">
                            <strong>Assigned to:</strong> {alert.assignedTo}
                          </p>
                        </div>
                      )}

                      {alert.acknowledgedBy && (
                        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded p-3 mb-3">
                          <p className="text-green-800 dark:text-green-300 text-sm">
                            <strong>Acknowledged by:</strong> {alert.acknowledgedBy}
                          </p>
                          {alert.acknowledgedComment && (
                            <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                              <strong>Comment:</strong> {alert.acknowledgedComment}
                            </p>
                          )}
                        </div>
                      )}

                      {alert.resolvedBy && (
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded p-3 mb-3">
                          <p className="text-emerald-800 dark:text-emerald-300 text-sm">
                            <strong>Resolved by:</strong> {alert.resolvedBy}
                          </p>
                          {alert.resolvedComment && (
                            <p className="text-emerald-700 dark:text-emerald-400 text-sm mt-1">
                              <strong>Resolution:</strong> {alert.resolvedComment}
                            </p>
                          )}
                        </div>
                      )}

                      {alert.justification && (
                        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded p-3 mb-3">
                          <p className="text-amber-800 dark:text-amber-300 text-sm">
                            <strong>Justification:</strong> {alert.justification}
                          </p>
                        </div>
                      )}

                      {/* Justification Input */}
                      {selectedAlert === alert.id && user?.role === 'proponent' && (
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-3 mb-3">
                          <textarea
                            value={justificationText}
                            onChange={(e) => setJustificationText(e.target.value)}
                            placeholder="Provide justification for this alert..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-800 dark:text-white"
                            rows={3}
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleProvideJustification(alert.id)}
                              className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700"
                            >
                              Submit Justification
                            </button>
                            <button
                              onClick={() => setSelectedAlert(null)}
                              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        {user?.role === 'admin' && alert.status === 'active' && (
                          <>
                            <button
                              onClick={() => handleAcknowledge(alert.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              <Check className="w-4 h-4" />
                              <span>Acknowledge</span>
                            </button>
                            <button
                              onClick={() => handleResolve(alert.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Resolve</span>
                            </button>
                            <button
                              onClick={() => handleRequestJustification(alert.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700"
                            >
                              <UserPlus className="w-4 h-4" />
                              <span>Request Justification</span>
                            </button>
                          </>
                        )}
                        
                        {user?.role === 'proponent' && alert.assignedTo && !alert.justification && (
                          <button
                            onClick={() => setSelectedAlert(alert.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Provide Justification</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
