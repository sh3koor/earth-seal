import { useState } from "react";
import {
  Activity,
  Gauge,
  Thermometer,
  Waves,
  Satellite,
  Zap,
  MapPin,
} from "lucide-react";
import { useEnhancedRealTimeData } from "@/react-app/hooks/useEnhancedRealTimeData";
import MetricCard from "@/react-app/components/MetricCard";
import AIInsights from "@/react-app/components/AIInsights";
import RealTimeChart from "@/react-app/components/RealTimeChart";

export default function Monitoring() {
  const { sites, chartData } = useEnhancedRealTimeData();
  const [selectedSite, setSelectedSite] = useState(sites[0]?.id || "fgp");

  const currentSite =
    sites.find((site) => site.id === selectedSite) || sites[0];

  if (!currentSite) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  const sensorData = currentSite.sensors;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Advanced Monitoring Systems
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time sensor data and AI-powered insights for comprehensive CCS
          monitoring
        </p>
      </div>

      {/* Site Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Select Monitoring Site
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSite === site.id
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-900/30"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {site.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      site.status === "operational"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : site.status === "maintenance"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated:{" "}
                    {new Date(site.lastUpdate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pressure Sensors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Pressure Monitoring System
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Wellhead Pressure"
            value={sensorData.pressureSensors.wellhead.toFixed(1)}
            unit="MPa"
            icon={
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            trend="stable"
            trendValue="±0.2%"
            status={
              sensorData.pressureSensors.wellhead > 16 ? "warning" : "normal"
            }
          />
          <MetricCard
            title="Reservoir Pressure"
            value={sensorData.pressureSensors.reservoir.toFixed(1)}
            unit="bar"
            icon={
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            trend="up"
            trendValue="+0.5%"
            status={
              sensorData.pressureSensors.reservoir > 150 ? "warning" : "normal"
            }
          />
          <MetricCard
            title="Surface Pressure"
            value={sensorData.pressureSensors.surface.toFixed(3)}
            unit="bar"
            icon={
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            trend="stable"
            trendValue="±0.01%"
            status="normal"
          />
        </div>
      </div>

      {/* Temperature Sensors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Temperature Monitoring Network
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Wellhead Temperature"
            value={sensorData.temperatureSensors.wellhead.toFixed(1)}
            unit="°C"
            icon={
              <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400" />
            }
            trend="down"
            trendValue="-1.2%"
            status={
              sensorData.temperatureSensors.wellhead > 45 ? "warning" : "normal"
            }
          />
          <MetricCard
            title="Reservoir Temperature"
            value={sensorData.temperatureSensors.reservoir.toFixed(1)}
            unit="°C"
            icon={
              <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400" />
            }
            trend="stable"
            trendValue="±0.5%"
            status={
              sensorData.temperatureSensors.reservoir > 90
                ? "warning"
                : "normal"
            }
          />
          <MetricCard
            title="Ambient Temperature"
            value={sensorData.temperatureSensors.ambient.toFixed(1)}
            unit="°C"
            icon={
              <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400" />
            }
            trend="up"
            trendValue="+2.3%"
            status="normal"
          />
        </div>
      </div>

      {/* Fiber-Optic DAS & Gas Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Waves className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Fiber-Optic DAS
            </h3>
          </div>
          <div className="space-y-4">
            <MetricCard
              title="Vibration Level"
              value={sensorData.fiberOpticDAS.vibrationLevel.toFixed(2)}
              unit="m/s²"
              icon={
                <Waves className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              }
              trend={
                sensorData.fiberOpticDAS.vibrationLevel > 0.5 ? "up" : "stable"
              }
              trendValue={
                sensorData.fiberOpticDAS.status === "warning" ? "⚠" : "✓"
              }
              status={
                sensorData.fiberOpticDAS.status === "critical"
                  ? "critical"
                  : sensorData.fiberOpticDAS.status === "warning"
                  ? "warning"
                  : "normal"
              }
            />
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Anomaly Detection
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Detected Anomalies (24h)
                </span>
                <span
                  className={`font-bold ${
                    sensorData.fiberOpticDAS.anomalies > 5
                      ? "text-red-600 dark:text-red-400"
                      : sensorData.fiberOpticDAS.anomalies > 2
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {sensorData.fiberOpticDAS.anomalies}
                </span>
              </div>
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  sensorData.fiberOpticDAS.status === "critical"
                    ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    : sensorData.fiberOpticDAS.status === "warning"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                }`}
              >
                {sensorData.fiberOpticDAS.status.toUpperCase()} STATUS
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Gas Analyzer
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-gray-600 dark:text-gray-400">
                CO₂ Concentration
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {sensorData.gasAnalyzer.co2Concentration.toFixed(1)} ppm
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-gray-600 dark:text-gray-400">H₂S</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {sensorData.gasAnalyzer.h2s.toFixed(3)} ppm
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-gray-600 dark:text-gray-400">CH₄</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {sensorData.gasAnalyzer.ch4.toFixed(1)} ppm
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-gray-600 dark:text-gray-400">O₂</span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {sensorData.gasAnalyzer.o2.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seismic & Satellite Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Seismic Monitoring
            </h3>
          </div>
          <div className="space-y-4">
            <MetricCard
              title="Magnitude"
              value={sensorData.seismicData.magnitude.toFixed(1)}
              unit="Richter"
              icon={
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              }
              trend={sensorData.seismicData.magnitude > 2 ? "up" : "stable"}
              trendValue={sensorData.seismicData.magnitude > 2 ? "⚠" : "✓"}
              status={
                sensorData.seismicData.magnitude > 3
                  ? "critical"
                  : sensorData.seismicData.magnitude > 2
                  ? "warning"
                  : "normal"
              }
            />
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Events (24h)
                </span>
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  {sensorData.seismicData.events24h}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last event: {sensorData.seismicData.lastEvent}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Satellite className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Satellite InSAR
            </h3>
          </div>
          <div className="space-y-4">
            <MetricCard
              title="Surface Displacement"
              value={`${
                sensorData.satelliteInSAR.surfaceDisplacement > 0 ? "+" : ""
              }${sensorData.satelliteInSAR.surfaceDisplacement.toFixed(1)}`}
              unit="mm"
              icon={
                <Satellite className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              }
              trend={
                Math.abs(sensorData.satelliteInSAR.surfaceDisplacement) > 2
                  ? "up"
                  : "stable"
              }
              trendValue={
                sensorData.satelliteInSAR.status === "stable"
                  ? "Stable"
                  : "Monitor"
              }
              status={
                Math.abs(sensorData.satelliteInSAR.surfaceDisplacement) > 4
                  ? "critical"
                  : Math.abs(sensorData.satelliteInSAR.surfaceDisplacement) > 2
                  ? "warning"
                  : "normal"
              }
            />
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  CO₂ Plume Radius
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {sensorData.satelliteInSAR.co2PlumeRadius.toFixed(0)}m
                </span>
              </div>
              <div
                className={`text-sm px-3 py-1 rounded-full ${
                  sensorData.satelliteInSAR.status === "stable"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : sensorData.satelliteInSAR.status === "expanding"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                }`}
              >
                Status: {sensorData.satelliteInSAR.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights predictions={currentSite.aiPredictions} />

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RealTimeChart
          data={chartData.map((point) => ({
            ...point,
            vibrationLevel: point.vibrationLevel,
          }))}
          title={`${currentSite.name} - Sensor Data Trends`}
        />

        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System Status Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span className="font-medium text-emerald-900 dark:text-emerald-300">Overall System Health</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">OPERATIONAL</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sites.filter(s => s.status === 'operational').length}</p>
                <p className="text-blue-800 dark:text-blue-300 text-sm">Active Sites</p>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{sites.filter(s => s.status === 'maintenance').length}</p>
                <p className="text-amber-800 dark:text-amber-300 text-sm">Maintenance</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-gray-900 dark:text-white">AI Health Score</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Predictive Analysis</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">94.2%</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
