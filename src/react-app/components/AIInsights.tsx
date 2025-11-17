import { Brain, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { AIprediction } from '@/react-app/hooks/useEnhancedRealTimeData';

interface AIInsightsProps {
  predictions: AIprediction[];
}

export default function AIInsights({ predictions }: AIInsightsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/30 dark:border-red-800';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/30 dark:border-amber-800';
      default:
        return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/30 dark:border-green-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Predictions & Insights</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Machine learning-powered operational forecasts</p>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className={`border rounded-lg p-4 ${
            prediction.anomalyDetected 
              ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/30' 
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{prediction.parameter}</h4>
                {getTrendIcon(prediction.trend)}
                {prediction.anomalyDetected && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700 rounded-full">
                    <AlertCircle className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">ANOMALY</span>
                  </div>
                )}
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getRiskColor(prediction.risk)}`}>
                {getRiskIcon(prediction.risk)}
                <span className="text-xs font-medium capitalize">{prediction.risk} Risk</span>
              </div>
            </div>
            
            {prediction.anomalyDetected && prediction.anomalyDescription && (
              <div className="mb-3 p-2 bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700 rounded">
                <p className="text-sm text-amber-900 dark:text-amber-300">
                  <strong>Anomaly Details:</strong> {prediction.anomalyDescription}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Predicted Value</p>
                <p className="font-semibold text-gray-900 dark:text-white">{prediction.prediction.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Confidence</p>
                <p className="font-semibold text-gray-900 dark:text-white">{(prediction.confidence * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Trend</p>
                <p className="font-semibold capitalize text-gray-900 dark:text-white">{prediction.trend}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Time Horizon</p>
                <p className="font-semibold text-gray-900 dark:text-white">{prediction.timeHorizon}</p>
              </div>
            </div>

            {/* Confidence indicator */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Prediction Confidence</span>
                <span>{(prediction.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h4 className="font-semibold text-purple-900 dark:text-purple-300">AI Recommendations</h4>
        </div>
        {predictions.some(p => p.anomalyDetected) ? (
          <div className="space-y-2">
            <p className="text-purple-800 dark:text-purple-300 text-sm">
              <strong>Alert:</strong> Anomalies detected in {predictions.filter(p => p.anomalyDetected).length} parameter(s). 
              Immediate investigation recommended.
            </p>
            <p className="text-purple-800 dark:text-purple-300 text-sm">
              Consider increasing monitoring frequency and conducting manual inspection of affected zones.
            </p>
          </div>
        ) : (
          <p className="text-purple-800 dark:text-purple-300 text-sm">
            All parameters within expected ranges. Continue standard monitoring protocols. 
            Next predictive analysis in 6 hours.
          </p>
        )}
      </div>
    </div>
  );
}
