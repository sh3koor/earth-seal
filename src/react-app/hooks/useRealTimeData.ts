import { useState, useEffect } from 'react';

interface SiteData {
  id: string;
  name: string;
  status: 'operational' | 'maintenance' | 'offline';
  co2Level: number;
  pressure: number;
  temperature: number;
  injectionRate: number;
  storageCapacity: number;
  currentStorage: number;
  seismicEvents: number;
  co2Flux: number;
  surfaceDeformation: number;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  site: string;
}

interface ComplianceItem {
  id: string;
  title: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastUpdate: string;
  details: string;
}

interface ChartDataPoint {
  time: string;
  co2Level: number;
  pressure: number;
  temperature: number;
}

export function useRealTimeData() {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [compliance, setCompliance] = useState<ComplianceItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [overallScore] = useState(87);

  // Generate mock real-time data
  useEffect(() => {
    const generateSiteData = (): SiteData[] => [
      {
        id: 'fgp',
        name: 'Fadhili Gas Plant (FGP)',
        status: 'operational',
        co2Level: 385 + Math.random() * 10,
        pressure: 15.2 + Math.random() * 2,
        temperature: 42 + Math.random() * 5,
        injectionRate: 2.5 + Math.random() * 0.5,
        storageCapacity: 10000,
        currentStorage: 7500 + Math.random() * 100,
        seismicEvents: Math.floor(Math.random() * 5),
        co2Flux: 40 + Math.random() * 10,
        surfaceDeformation: -2 + Math.random() * 4
      },
      {
        id: 'kgp',
        name: 'Khursaniyah Gas Plant (KGP)',
        status: 'operational',
        co2Level: 392 + Math.random() * 8,
        pressure: 14.8 + Math.random() * 1.5,
        temperature: 38 + Math.random() * 4,
        injectionRate: 3.1 + Math.random() * 0.4,
        storageCapacity: 8500,
        currentStorage: 6200 + Math.random() * 80,
        seismicEvents: Math.floor(Math.random() * 4),
        co2Flux: 42 + Math.random() * 8,
        surfaceDeformation: 1 + Math.random() * 3
      },
      {
        id: 'wgp',
        name: 'Wasit Gas Plant (WGP)',
        status: 'maintenance',
        co2Level: 401 + Math.random() * 12,
        pressure: 16.1 + Math.random() * 2.2,
        temperature: 45 + Math.random() * 6,
        injectionRate: 0,
        storageCapacity: 12000,
        currentStorage: 9100 + Math.random() * 50,
        seismicEvents: Math.floor(Math.random() * 3),
        co2Flux: 38 + Math.random() * 12,
        surfaceDeformation: -1 + Math.random() * 5
      }
    ];

    const generateAlerts = (): Alert[] => [
      {
        id: '1',
        type: 'warning',
        title: 'Pressure Fluctuation Detected',
        message: 'Pressure readings in Fadhili Gas Plant showing minor fluctuations outside normal range.',
        timestamp: '2 minutes ago',
        site: 'Fadhili Gas Plant (FGP)'
      },
      {
        id: '2',
        type: 'info',
        title: 'Maintenance Window Scheduled',
        message: 'Wasit Gas Plant entering scheduled maintenance period for equipment inspection.',
        timestamp: '15 minutes ago',
        site: 'Wasit Gas Plant (WGP)'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Seismic Activity Detected',
        message: 'Minor seismic events recorded near Khursaniyah Gas Plant - monitoring increased.',
        timestamp: '45 minutes ago',
        site: 'Khursaniyah Gas Plant (KGP)'
      },
      {
        id: '4',
        type: 'critical',
        title: 'CO₂ Flux Elevation',
        message: 'CO₂ flux levels approaching upper threshold at Fadhili Gas Plant.',
        timestamp: '1 hour ago',
        site: 'Fadhili Gas Plant (FGP)'
      }
    ];

    const generateCompliance = (): ComplianceItem[] => [
      {
        id: '1',
        title: 'Environmental Impact Assessment',
        status: 'compliant',
        lastUpdate: '2 hours ago',
        details: 'All environmental parameters within regulatory limits'
      },
      {
        id: '2',
        title: 'CO₂ Storage Verification',
        status: 'compliant',
        lastUpdate: '1 hour ago',
        details: 'Storage integrity confirmed through seismic monitoring'
      },
      {
        id: '3',
        title: 'Safety Protocol Compliance',
        status: 'pending',
        lastUpdate: '30 minutes ago',
        details: 'Monthly safety inspection in progress'
      },
      {
        id: '4',
        title: 'Emission Reporting',
        status: 'compliant',
        lastUpdate: '3 hours ago',
        details: 'Quarterly emission reports submitted to regulatory body'
      }
    ];

    const generateChartData = (): ChartDataPoint[] => {
      const data = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          co2Level: 385 + Math.sin(i * 0.2) * 5 + Math.random() * 3,
          pressure: 15.2 + Math.cos(i * 0.15) * 1.5 + Math.random() * 0.5,
          temperature: 42 + Math.sin(i * 0.1) * 3 + Math.random() * 2
        });
      }
      
      return data;
    };

    // Initial data load
    setSites(generateSiteData());
    setAlerts(generateAlerts());
    setCompliance(generateCompliance());
    setChartData(generateChartData());

    // Update data every 5 seconds for real-time effect
    const interval = setInterval(() => {
      setSites(generateSiteData());
      
      // Update chart data by shifting and adding new point
      setChartData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          co2Level: 385 + Math.sin(Date.now() * 0.001) * 5 + Math.random() * 3,
          pressure: 15.2 + Math.cos(Date.now() * 0.0008) * 1.5 + Math.random() * 0.5,
          temperature: 42 + Math.sin(Date.now() * 0.0005) * 3 + Math.random() * 2
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    sites,
    alerts,
    compliance,
    chartData,
    overallScore
  };
}
