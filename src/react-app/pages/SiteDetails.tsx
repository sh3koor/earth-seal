import { useState } from 'react';
import { MapPin, Gauge, Thermometer, BarChart3, Droplets, Activity, Waves, Mountain } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Navigation from '@/react-app/components/Navigation';
import MetricCard from '@/react-app/components/MetricCard';
import RealTimeChart from '@/react-app/components/RealTimeChart';
import { useRealTimeData } from '@/react-app/hooks/useRealTimeData';

export default function SiteDetails() {
  const { sites, alerts, chartData } = useRealTimeData();
  const [selectedSite, setSelectedSite] = useState(sites[0]?.id || 'fgp');

  const currentSite = sites.find(site => site.id === selectedSite) || sites[0];

  if (!currentSite) {
    return <div>Loading...</div>;
  }

  const siteAlerts = alerts.filter(alert => 
    alert.site.toLowerCase().includes(currentSite.name.toLowerCase().split('(')[0].trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Header alertsCount={alerts.length} />
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Monitoring Details</h1>
          <p className="text-gray-600">Comprehensive monitoring data for individual CCS facilities</p>
        </div>

        {/* Site Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Site</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSite === site.id
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{site.name}</h3>
                    <p className={`text-sm ${
                      site.status === 'operational' ? 'text-emerald-600' :
                      site.status === 'maintenance' ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Site Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentSite.name}</h2>
                <p className="text-gray-600">Saudi Arabia CCS Facility</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSite.status === 'operational' ? 'bg-emerald-100 text-emerald-800' :
              currentSite.status === 'maintenance' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentSite.status.charAt(0).toUpperCase() + currentSite.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Total Capacity</h4>
              <p className="text-2xl font-bold text-emerald-600">{(currentSite.storageCapacity / 1000).toFixed(1)} Mt</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Current Storage</h4>
              <p className="text-2xl font-bold text-blue-600">{(currentSite.currentStorage / 1000).toFixed(1)} Mt</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Utilization</h4>
              <p className="text-2xl font-bold text-purple-600">
                {((currentSite.currentStorage / currentSite.storageCapacity) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Active Alerts</h4>
              <p className="text-2xl font-bold text-red-600">{siteAlerts.length}</p>
            </div>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="CO₂ Level"
            value={currentSite.co2Level.toFixed(1)}
            unit="ppm"
            icon={<BarChart3 className="w-6 h-6 text-emerald-600" />}
            trend="stable"
            trendValue="±2%"
            status={currentSite.co2Level > 400 ? "warning" : "normal"}
          />
          
          <MetricCard
            title="Pressure"
            value={currentSite.pressure.toFixed(1)}
            unit="MPa"
            icon={<Gauge className="w-6 h-6 text-emerald-600" />}
            trend="up"
            trendValue="+0.3%"
            status={currentSite.pressure > 16 ? "warning" : "normal"}
          />
          
          <MetricCard
            title="Temperature"
            value={currentSite.temperature.toFixed(1)}
            unit="°C"
            icon={<Thermometer className="w-6 h-6 text-emerald-600" />}
            trend="down"
            trendValue="-1.2%"
            status={currentSite.temperature > 45 ? "warning" : "normal"}
          />
          
          <MetricCard
            title="Injection Rate"
            value={currentSite.injectionRate.toFixed(2)}
            unit="Mt/day"
            icon={<Droplets className="w-6 h-6 text-emerald-600" />}
            trend={currentSite.injectionRate > 0 ? "up" : "stable"}
            trendValue={currentSite.injectionRate > 0 ? "+5.7%" : "0%"}
            status={currentSite.injectionRate === 0 ? "warning" : "normal"}
          />
        </div>

        {/* Advanced Monitoring Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Seismic Events (24h)"
            value={currentSite.seismicEvents}
            unit="events"
            icon={<Activity className="w-6 h-6 text-emerald-600" />}
            trend={currentSite.seismicEvents > 2 ? "up" : "stable"}
            trendValue={currentSite.seismicEvents > 2 ? "⚠" : "✓"}
            status={currentSite.seismicEvents > 3 ? "critical" : currentSite.seismicEvents > 2 ? "warning" : "normal"}
          />
          
          <MetricCard
            title="CO₂ Flux"
            value={currentSite.co2Flux.toFixed(1)}
            unit="g/m²/day"
            icon={<Waves className="w-6 h-6 text-emerald-600" />}
            trend="stable"
            trendValue={currentSite.co2Flux < 50 ? "✅" : "⚠"}
            status={currentSite.co2Flux > 55 ? "critical" : currentSite.co2Flux > 50 ? "warning" : "normal"}
          />
          
          <MetricCard
            title="Surface Deformation"
            value={`${currentSite.surfaceDeformation > 0 ? '+' : ''}${currentSite.surfaceDeformation.toFixed(1)}`}
            unit="mm"
            icon={<Mountain className="w-6 h-6 text-emerald-600" />}
            trend={Math.abs(currentSite.surfaceDeformation) > 2 ? "up" : "stable"}
            trendValue={Math.abs(currentSite.surfaceDeformation) < 3 ? "Stable" : "Monitor"}
            status={Math.abs(currentSite.surfaceDeformation) > 4 ? "critical" : Math.abs(currentSite.surfaceDeformation) > 3 ? "warning" : "normal"}
          />
        </div>

        {/* Charts and Site-Specific Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RealTimeChart 
            data={chartData} 
            title={`${currentSite.name} - Real-Time Data`} 
          />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Site-Specific Alerts</h3>
            <div className="space-y-4">
              {siteAlerts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                  <p>No active alerts for this site</p>
                </div>
              ) : (
                siteAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'critical' ? 'border-l-red-500 bg-red-50' :
                    alert.type === 'warning' ? 'border-l-amber-500 bg-amber-50' :
                    'border-l-blue-500 bg-blue-50'
                  }`}>
                    <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-gray-700 text-sm mb-2">{alert.message}</p>
                    <p className="text-gray-500 text-xs">{alert.timestamp}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
