import { useState } from "react";
import { TrendingUp, Shield, FileText, BarChart3 } from "lucide-react";
import { useEnhancedRealTimeData } from "@/react-app/hooks/useEnhancedRealTimeData";
import ComplianceStatus from "@/react-app/components/ComplianceStatus";
import ComplianceReportExport from "@/react-app/components/ComplianceReportExport";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Compliance() {
  const { compliance, overallScore } = useEnhancedRealTimeData();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  const complianceStats = {
    compliant: compliance.filter((item) => item.status === "compliant").length,
    nonCompliant: compliance.filter((item) => item.status === "non-compliant")
      .length,
    pending: compliance.filter((item) => item.status === "pending").length,
    averageScore:
      compliance.reduce((sum, item) => sum + item.complianceScore, 0) /
      compliance.length,
    totalIncidents: compliance.reduce(
      (sum, item) => sum + item.incidentsCount,
      0
    ),
    averageContainment:
      compliance.reduce((sum, item) => sum + item.co2ContainmentPercentage, 0) /
      compliance.length,
  };

  // Mock historical compliance data
  const historicalData = [
    { month: "Jan", score: 85, incidents: 3, containment: 98.2 },
    { month: "Feb", score: 87, incidents: 2, containment: 98.5 },
    { month: "Mar", score: 89, incidents: 1, containment: 98.8 },
    { month: "Apr", score: 86, incidents: 4, containment: 98.1 },
    { month: "May", score: 90, incidents: 1, containment: 99.1 },
    { month: "Jun", score: 87, incidents: 2, containment: 98.7 },
  ];

  // Pie chart data for compliance distribution
  const pieData = [
    { name: "Compliant", value: complianceStats.compliant, color: "#10B981" },
    {
      name: "Non-Compliant",
      value: complianceStats.nonCompliant,
      color: "#EF4444",
    },
    { name: "Pending", value: complianceStats.pending, color: "#F59E0B" },
  ];

  const additionalCompliance = [
    {
      id: "5",
      title: "Saudi Environmental Standards (NCEC)",
      status: "compliant" as const,
      lastUpdate: "1 hour ago",
      details: "All operations meet NCEC environmental protection standards",
      co2ContainmentPercentage: 99.1,
      regulatoryCo2Limit: 400,
      averageCo2Level: 389,
      incidentsCount: 0,
      complianceScore: 96,
    },
    {
      id: "6",
      title: "Ministry of Energy Reporting",
      status: "compliant" as const,
      lastUpdate: "2 hours ago",
      details: "Quarterly operational reports submitted to Ministry of Energy",
      co2ContainmentPercentage: 98.7,
      regulatoryCo2Limit: 400,
      averageCo2Level: 392,
      incidentsCount: 1,
      complianceScore: 93,
    },
    {
      id: "7",
      title: "ARAMCO Safety Protocols",
      status: "compliant" as const,
      lastUpdate: "45 minutes ago",
      details: "All safety protocols in accordance with ARAMCO standards",
      co2ContainmentPercentage: 99.3,
      regulatoryCo2Limit: 400,
      averageCo2Level: 387,
      incidentsCount: 0,
      complianceScore: 97,
    },
    {
      id: "8",
      title: "International CCS Standards (ISO 27914)",
      status: "pending" as const,
      lastUpdate: "3 hours ago",
      details: "ISO 27914 compliance assessment in progress",
      co2ContainmentPercentage: 98.9,
      regulatoryCo2Limit: 400,
      averageCo2Level: 394,
      incidentsCount: 0,
      complianceScore: 85,
    },
    {
      id: "9",
      title: "GHG Verification Protocol",
      status: "compliant" as const,
      lastUpdate: "4 hours ago",
      details: "Third-party verification of greenhouse gas emissions completed",
      co2ContainmentPercentage: 99.0,
      regulatoryCo2Limit: 400,
      averageCo2Level: 390,
      incidentsCount: 1,
      complianceScore: 94,
    },
  ];

  const allCompliance = [...compliance, ...additionalCompliance];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Compliance Management Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive regulatory compliance monitoring and reporting for CCS
          operations
        </p>
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{overallScore}%</div>
            <div className="text-emerald-200">Overall Compliance</div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-sm">+2.3% this month</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {complianceStats.averageScore.toFixed(1)}%
            </div>
            <div className="text-emerald-200">Avg Score</div>
            <div className="text-emerald-300 text-sm">Across all sites</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {complianceStats.averageContainment.toFixed(1)}%
            </div>
            <div className="text-emerald-200">CO₂ Containment</div>
            <div className="text-emerald-300 text-sm">Average rate</div>
          </div>
          {/* Total Incidents */}
          {/* <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {complianceStats.totalIncidents}
            </div>
            <div className="text-emerald-200">Total Incidents</div>
            <div className="text-emerald-300 text-sm">This period</div>
          </div> */}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {complianceStats.compliant}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Compliant
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {complianceStats.pending}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Pending
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {complianceStats.nonCompliant}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Non-Compliant
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {allCompliance.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Total Reports
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            8
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Regulations
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            3
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Active Sites
          </div>
        </div>
      </div>

      {/* Compliance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Compliance Trends
            </h3>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Compliance Score (%)"
                />
                <Line
                  type="monotone"
                  dataKey="containment"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="CO₂ Containment (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Compliance Status Distribution
          </h3>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents Over Time */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Incidents Trend Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="incidents" fill="#EF4444" name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* Compliance Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Environmental Compliance
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                CO₂ Storage Safety
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ 99.1%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Groundwater Protection
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ 98.7%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Seismic Monitoring
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ 99.3%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Air Quality Standards
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ 98.9%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Regulatory Compliance
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Ministry Reports
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Current
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                NCEC Standards
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Compliant
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                ISO Certification
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                ⏳ In Progress
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                GHG Verification
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Verified
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Operational Standards
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Safety Protocols
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ ARAMCO Std
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Data Reporting
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Real-time
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Equipment Certification
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Current
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Emergency Response
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Reports */}
      <ComplianceReportExport reports={allCompliance} />

      {/* Detailed Compliance Status */}
      <ComplianceStatus items={allCompliance} overallScore={overallScore} />
    </div>
  );
}
