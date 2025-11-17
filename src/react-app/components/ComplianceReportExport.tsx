import { useState } from 'react';
import { Download, FileText, Calendar, Settings } from 'lucide-react';
import { ComplianceReport } from '@/react-app/hooks/useEnhancedRealTimeData';

interface ComplianceReportExportProps {
  reports: ComplianceReport[];
}

export default function ComplianceReportExport({ reports }: ComplianceReportExportProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'json'>('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);

  const handleReportToggle = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    setSelectedReports(
      selectedReports.length === reports.length 
        ? [] 
        : reports.map(r => r.id)
    );
  };

  const handleExport = () => {
    // Mock export functionality
    const exportData = {
      reports: reports.filter(r => selectedReports.includes(r.id)),
      dateRange,
      format: exportFormat,
      includeCharts,
      exportedAt: new Date().toISOString()
    };
    
    // In a real app, this would generate and download the file
    console.log('Exporting compliance reports:', exportData);
    
    // Simulate file download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Export Compliance Reports</h3>
      </div>

      {/* Report Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">Select Reports</h4>
          <button
            onClick={handleSelectAll}
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium"
          >
            {selectedReports.length === reports.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {reports.map(report => (
            <label key={report.id} className="flex items-center space-x-3 p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                checked={selectedReports.includes(report.id)}
                onChange={() => handleReportToggle(report.id)}
                className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 dark:bg-gray-700"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{report.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Score: {report.complianceScore}% | {report.status}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Date Range</span>
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Export Options</span>
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'json')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="pdf">PDF Report</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="json">JSON Data</option>
            </select>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 dark:bg-gray-700"
            />
            <span className="text-gray-700 dark:text-gray-300">Include charts and visualizations</span>
          </label>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedReports.length} report{selectedReports.length !== 1 ? 's' : ''} selected
        </div>
        
        <button
          onClick={handleExport}
          disabled={selectedReports.length === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedReports.length > 0
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Export Reports</span>
        </button>
      </div>
    </div>
  );
}
