import { useState, useEffect } from "react";

export interface SensorData {
  pressureSensors: {
    wellhead: number;
    reservoir: number;
    surface: number;
  };
  temperatureSensors: {
    wellhead: number;
    reservoir: number;
    ambient: number;
  };
  fiberOpticDAS: {
    vibrationLevel: number;
    anomalies: number;
    status: "normal" | "warning" | "critical";
  };
  gasAnalyzer: {
    co2Concentration: number;
    h2s: number;
    ch4: number;
    o2: number;
  };
  seismicData: {
    magnitude: number;
    events24h: number;
    lastEvent: string;
  };
  satelliteInSAR: {
    surfaceDisplacement: number;
    co2PlumeRadius: number;
    status: "stable" | "expanding" | "concerning";
  };
}

export interface AIprediction {
  parameter: string;
  prediction: number;
  confidence: number;
  trend: "increasing" | "decreasing" | "stable";
  timeHorizon: string;
  risk: "low" | "medium" | "high";
  anomalyDetected: boolean;
  anomalyDescription?: string;
}

export interface EnhancedSiteData {
  id: string;
  name: string;
  status: "operational" | "maintenance" | "offline";
  co2Level: number;
  pressure: number;
  temperature: number;
  injectionRate: number;
  storageCapacity: number;
  currentStorage: number;
  seismicEvents: number;
  co2Flux: number;
  surfaceDeformation: number;
  sensors: SensorData;
  aiPredictions: AIprediction[];
  lastUpdate: string;
}

export interface EnhancedAlert {
  id: string;
  type: "critical" | "warning" | "info";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  timestamp: string;
  site: string;
  status: "active" | "acknowledged" | "resolved";
  assignedTo?: string;
  justification?: string;
  acknowledgedBy?: string;
  acknowledgedComment?: string;
  resolvedBy?: string;
  resolvedComment?: string;
}

export interface ComplianceReport {
  id: string;
  title: string;
  status: "compliant" | "non-compliant" | "pending";
  lastUpdate: string;
  details: string;
  co2ContainmentPercentage: number;
  regulatoryCo2Limit: number;
  averageCo2Level: number;
  incidentsCount: number;
  complianceScore: number;
}

interface ChartDataPoint {
  time: string;
  co2Level: number;
  pressure: number;
  temperature: number;
  vibrationLevel: number;
  surfaceDisplacement: number;
}

export function useEnhancedRealTimeData() {
  const [sites, setSites] = useState<EnhancedSiteData[]>([]);
  const [alerts, setAlerts] = useState<EnhancedAlert[]>([]);
  const [compliance, setCompliance] = useState<ComplianceReport[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [overallScore] = useState(87);

  useEffect(() => {
    const generateAIPredictions = (): AIprediction[] => {
      const random = Math.random();
      return [
        {
          parameter: "CO₂ Level",
          prediction: 395.2 + Math.random() * 5,
          confidence: 0.87 + Math.random() * 0.1,
          trend: random > 0.6 ? "increasing" : "stable",
          timeHorizon: "24 hours",
          risk: random > 0.8 ? "medium" : "low",
          anomalyDetected: random > 0.85,
          anomalyDescription:
            random > 0.85
              ? "Unusual CO₂ concentration spike detected in sector B"
              : undefined,
        },
        {
          parameter: "Pressure",
          prediction: 15.8 + Math.random() * 1,
          confidence: 0.92,
          trend: "stable",
          timeHorizon: "12 hours",
          risk: "low",
          anomalyDetected: false,
        },
        {
          parameter: "Tempature",
          prediction: 15.8 + Math.random() * 1,
          confidence: 0.92,
          trend: "stable",
          timeHorizon: "12 hours",
          risk: "low",
          anomalyDetected: false,
        },
        {
          parameter: "Seismic Activity",
          prediction: 2.1 + Math.random() * 0.5,
          confidence: 0.75 + Math.random() * 0.1,
          trend: random > 0.7 ? "increasing" : "decreasing",
          timeHorizon: "48 hours",
          risk: random > 0.7 ? "high" : "medium",
          anomalyDetected: random > 0.7,
          anomalyDescription:
            random > 0.7
              ? "Elevated micro-seismic activity pattern detected"
              : undefined,
        },
        {
          parameter: "Vibration Levels",
          prediction: 0.45 + Math.random() * 0.2,
          confidence: 0.81,
          trend: random > 0.5 ? "increasing" : "stable",
          timeHorizon: "6 hours",
          risk: random > 0.75 ? "medium" : "low",
          anomalyDetected: random > 0.75,
          anomalyDescription:
            random > 0.75
              ? "Anomalous vibration signature in DAS fiber zone 3"
              : undefined,
        },
        {
          parameter: "Surface Deformation",
          prediction: -1.5 + Math.random() * 3,
          confidence: 0.79,
          trend:
            Math.abs(-1.5 + Math.random() * 3) > 2 ? "increasing" : "stable",
          timeHorizon: "72 hours",
          risk: Math.abs(-1.5 + Math.random() * 3) > 2.5 ? "medium" : "low",
          anomalyDetected: Math.abs(-1.5 + Math.random() * 3) > 2.5,
          anomalyDescription:
            Math.abs(-1.5 + Math.random() * 3) > 2.5
              ? "Unusual surface displacement rate detected by InSAR"
              : undefined,
        },
      ];
    };

    const generateSensorData = (): SensorData => ({
      pressureSensors: {
        wellhead: 15.2 + Math.random() * 2,
        reservoir: 145.8 + Math.random() * 10,
        surface: 1.013 + Math.random() * 0.01,
      },
      temperatureSensors: {
        wellhead: 42 + Math.random() * 5,
        reservoir: 85 + Math.random() * 8,
        ambient: 25 + Math.random() * 10,
      },
      fiberOpticDAS: {
        vibrationLevel: 0.2 + Math.random() * 0.8,
        anomalies: Math.floor(Math.random() * 3),
        status: Math.random() > 0.8 ? "warning" : "normal",
      },
      gasAnalyzer: {
        co2Concentration: 390 + Math.random() * 15,
        h2s: 0.1 + Math.random() * 0.05,
        ch4: 1.8 + Math.random() * 0.2,
        o2: 20.9 + Math.random() * 0.3,
      },
      seismicData: {
        magnitude: Math.random() * 3,
        events24h: Math.floor(Math.random() * 5),
        lastEvent: Math.random() > 0.5 ? "3 hours ago" : "12 hours ago",
      },
      satelliteInSAR: {
        surfaceDisplacement: -2 + Math.random() * 4,
        co2PlumeRadius: 250 + Math.random() * 50,
        status: Math.random() > 0.7 ? "stable" : "expanding",
      },
    });

    const generateEnhancedSiteData = (): EnhancedSiteData[] => [
      {
        id: "fgp",
        name: "Fadhili Gas Plant (FGP)",
        status: "operational",
        co2Level: 385 + Math.random() * 10,
        pressure: 15.2 + Math.random() * 2,
        temperature: 42 + Math.random() * 5,
        injectionRate: 2.5 + Math.random() * 0.5,
        storageCapacity: 10000,
        currentStorage: 7500 + Math.random() * 100,
        seismicEvents: Math.floor(Math.random() * 5),
        co2Flux: 40 + Math.random() * 10,
        surfaceDeformation: -2 + Math.random() * 4,
        sensors: generateSensorData(),
        aiPredictions: generateAIPredictions(),
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "kgp",
        name: "Khursaniyah Gas Plant (KGP)",
        status: "operational",
        co2Level: 392 + Math.random() * 8,
        pressure: 14.8 + Math.random() * 1.5,
        temperature: 38 + Math.random() * 4,
        injectionRate: 3.1 + Math.random() * 0.4,
        storageCapacity: 8500,
        currentStorage: 6200 + Math.random() * 80,
        seismicEvents: Math.floor(Math.random() * 4),
        co2Flux: 42 + Math.random() * 8,
        surfaceDeformation: 1 + Math.random() * 3,
        sensors: generateSensorData(),
        aiPredictions: generateAIPredictions(),
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "wgp",
        name: "Wasit Gas Plant (WGP)",
        status: "maintenance",
        co2Level: 401 + Math.random() * 12,
        pressure: 16.1 + Math.random() * 2.2,
        temperature: 45 + Math.random() * 6,
        injectionRate: 0,
        storageCapacity: 12000,
        currentStorage: 9100 + Math.random() * 50,
        seismicEvents: Math.floor(Math.random() * 3),
        co2Flux: 38 + Math.random() * 12,
        surfaceDeformation: -1 + Math.random() * 5,
        sensors: generateSensorData(),
        aiPredictions: generateAIPredictions(),
        lastUpdate: new Date().toISOString(),
      },
    ];

    const generateEnhancedAlerts = (): EnhancedAlert[] => [
      {
        id: "1",
        type: "warning",
        severity: "medium",
        title: "Pressure Fluctuation Detected",
        message:
          "Pressure readings in Fadhili Gas Plant showing minor fluctuations outside normal range.",
        timestamp: "2 minutes ago",
        site: "Fadhili Gas Plant (FGP)",
        status: "active",
      },
      {
        id: "2",
        type: "info",
        severity: "low",
        title: "Maintenance Window Scheduled",
        message:
          "Wasit Gas Plant entering scheduled maintenance period for equipment inspection.",
        timestamp: "15 minutes ago",
        site: "Wasit Gas Plant (WGP)",
        status: "acknowledged",
        acknowledgedBy: "Ahmed Al-Rashid",
      },
      {
        id: "3",
        type: "warning",
        severity: "high",
        title: "Seismic Activity Detected",
        message:
          "Minor seismic events recorded near Khursaniyah Gas Plant - monitoring increased.",
        timestamp: "45 minutes ago",
        site: "Khursaniyah Gas Plant (KGP)",
        status: "active",
      },
      {
        id: "4",
        type: "critical",
        severity: "critical",
        title: "CO₂ Flux Elevation",
        message:
          "CO₂ flux levels approaching upper threshold at Fadhili Gas Plant.",
        timestamp: "1 hour ago",
        site: "Fadhili Gas Plant (FGP)",
        status: "active",
      },
    ];

    const generateComplianceReports = (): ComplianceReport[] => [
      {
        id: "1",
        title: "Environmental Impact Assessment",
        status: "compliant",
        lastUpdate: "2 hours ago",
        details: "All environmental parameters within regulatory limits",
        co2ContainmentPercentage: 99.2,
        regulatoryCo2Limit: 400,
        averageCo2Level: 392,
        incidentsCount: 0,
        complianceScore: 95,
      },
      {
        id: "2",
        title: "CO₂ Storage Verification",
        status: "compliant",
        lastUpdate: "1 hour ago",
        details: "Storage integrity confirmed through seismic monitoring",
        co2ContainmentPercentage: 98.8,
        regulatoryCo2Limit: 400,
        averageCo2Level: 389,
        incidentsCount: 1,
        complianceScore: 92,
      },
      {
        id: "3",
        title: "Safety Protocol Compliance",
        status: "pending",
        lastUpdate: "30 minutes ago",
        details: "Monthly safety inspection in progress",
        co2ContainmentPercentage: 99.5,
        regulatoryCo2Limit: 400,
        averageCo2Level: 395,
        incidentsCount: 0,
        complianceScore: 87,
      },
    ];

    const generateChartData = (): ChartDataPoint[] => {
      const data = [];
      const now = new Date();

      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          co2Level: 385 + Math.sin(i * 0.2) * 5 + Math.random() * 3,
          pressure: 15.2 + Math.cos(i * 0.15) * 1.5 + Math.random() * 0.5,
          temperature: 42 + Math.sin(i * 0.1) * 3 + Math.random() * 2,
          vibrationLevel: 0.2 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.1,
          surfaceDisplacement: Math.sin(i * 0.25) * 2 + Math.random() * 0.5,
        });
      }

      return data;
    };

    setSites(generateEnhancedSiteData());
    setAlerts(generateEnhancedAlerts());
    setCompliance(generateComplianceReports());
    setChartData(generateChartData());

    // Update data every 3 seconds for enhanced real-time effect
    const interval = setInterval(() => {
      setSites(generateEnhancedSiteData());

      setChartData((prevData) => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          co2Level: 385 + Math.sin(Date.now() * 0.001) * 5 + Math.random() * 3,
          pressure:
            15.2 + Math.cos(Date.now() * 0.0008) * 1.5 + Math.random() * 0.5,
          temperature:
            42 + Math.sin(Date.now() * 0.0005) * 3 + Math.random() * 2,
          vibrationLevel:
            0.2 + Math.sin(Date.now() * 0.002) * 0.3 + Math.random() * 0.1,
          surfaceDisplacement:
            Math.sin(Date.now() * 0.0015) * 2 + Math.random() * 0.5,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (
    alertId: string,
    acknowledgedBy: string,
    acknowledgedComment: string
  ) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "acknowledged",
              acknowledgedBy,
              acknowledgedComment,
            }
          : alert
      )
    );
  };

  const resolveAlert = (
    alertId: string,
    resolvedBy: string,
    resolvedComment: string
  ) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "resolved", resolvedBy, resolvedComment }
          : alert
      )
    );
  };

  const requestJustification = (alertId: string, assignedTo: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, assignedTo } : alert
      )
    );
  };

  const provideJustification = (alertId: string, justification: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, justification } : alert
      )
    );
  };

  return {
    sites,
    alerts,
    compliance,
    chartData,
    overallScore,
    acknowledgeAlert,
    resolveAlert,
    requestJustification,
    provideJustification,
  };
}
