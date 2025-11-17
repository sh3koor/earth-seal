import {
  Gauge,
  Thermometer,
  BarChart3,
  Droplets,
  TrendingUp,
  Brain,
  AlertTriangle,
} from "lucide-react";
import MetricCard from "@/react-app/components/MetricCard";
import AlertPanel from "@/react-app/components/AlertPanel";
import ComplianceStatus from "@/react-app/components/ComplianceStatus";
import RealTimeChart from "@/react-app/components/RealTimeChart";
import AIInsights from "@/react-app/components/AIInsights";
import { useEnhancedRealTimeData } from "@/react-app/hooks/useEnhancedRealTimeData";

export default function Home() {
  const { sites, alerts, compliance, chartData, overallScore } =
    useEnhancedRealTimeData();

  // Calculate aggregate metrics from all operational sites
  const operationalSites = sites.filter(
    (site) => site.status === "operational"
  );
  const avgCO2 =
    operationalSites.length > 0
      ? operationalSites.reduce((sum, site) => sum + site.co2Level, 0) /
        operationalSites.length
      : 0;
  const avgPressure =
    operationalSites.length > 0
      ? operationalSites.reduce((sum, site) => sum + site.pressure, 0) /
        operationalSites.length
      : 0;
  const avgTemp =
    operationalSites.length > 0
      ? operationalSites.reduce((sum, site) => sum + site.temperature, 0) /
        operationalSites.length
      : 0;
  const totalInjection = operationalSites.reduce(
    (sum, site) => sum + site.injectionRate,
    0
  );
  const totalStored = sites.reduce((sum, site) => sum + site.currentStorage, 0);

  // Get AI predictions from first operational site for dashboard overview
  const aiPredictions = operationalSites[0]?.aiPredictions || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-800 dark:from-gray-900 dark:to-gray-800 text-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space">
            <img
              src="/src/shared/images/Earth Seal.png"
              alt="Earth Seal"
              className="w-32 h-32"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">Earth Seal</h1>
              <p className="text-emerald-200 dark:text-gray-300 text-lg">
                Real-Time Carbon Capture & Storage Monitoring
              </p>
              <p className="text-emerald-300 dark:text-gray-400 text-sm">
                Sealing carbon, securing the future
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {sites.filter((s) => s.status === "operational").length}/
              {sites.length}
            </div>
            <div className="text-emerald-200 dark:text-gray-300">
              Sites Operational
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Avg CO₂ Level"
          value={avgCO2.toFixed(1)}
          unit="ppm"
          icon={
            <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          }
          trend="stable"
          trendValue="±2%"
          status={avgCO2 > 400 ? "warning" : "normal"}
        />

        <MetricCard
          title="Avg Pressure"
          value={avgPressure.toFixed(1)}
          unit="MPa"
          icon={
            <Gauge className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          }
          trend="up"
          trendValue="+0.3%"
          status={avgPressure > 16 ? "warning" : "normal"}
        />

        <MetricCard
          title="Avg Temperature"
          value={avgTemp.toFixed(1)}
          unit="°C"
          icon={
            <Thermometer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          }
          trend="down"
          trendValue="-1.2%"
          status={avgTemp > 45 ? "warning" : "normal"}
        />

        <MetricCard
          title="Total Injection"
          value={totalInjection.toFixed(2)}
          unit="Mt/day"
          icon={
            <Droplets className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          }
          trend="up"
          trendValue="+5.7%"
          status="normal"
        />

        <MetricCard
          title="Total Stored"
          value={(totalStored / 1000).toFixed(1)}
          unit="Mt CO₂"
          icon={
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          }
          trend="up"
          trendValue="+12.3%"
          status="normal"
        />
      </div>

      {/* Charts and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RealTimeChart data={chartData} title="Real-Time Operational Metrics" />

        <AlertPanel alerts={alerts.slice(0, 4)} />
      </div>

      {/* AI Insights and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AIInsights predictions={aiPredictions} />
        <ComplianceStatus
          items={compliance.slice(0, 4)}
          overallScore={overallScore}
        />
      </div>
      {/* AI Predictions & Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Anomaly Risk Level
            </h3>
          </div>
          <div className="space-y-3">
            {aiPredictions.slice(0, 3).map((prediction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <span className="text-gray-900 dark:text-white text-sm font-medium">
                    {prediction.parameter}
                  </span>
                  {prediction.anomalyDetected && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        Anomaly Detected
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      prediction.risk === "high"
                        ? "text-red-600 dark:text-red-400"
                        : prediction.risk === "medium"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {prediction.risk.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(prediction.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Compliance
            </h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {overallScore}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Compliance Score
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
