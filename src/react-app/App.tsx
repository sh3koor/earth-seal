import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@/react-app/context/AuthContext";
import { ThemeProvider } from "@/react-app/context/ThemeContext";
import Layout from "@/react-app/components/Layout";
import HomePage from "@/react-app/pages/Home";
import MonitoringPage from "@/react-app/pages/Monitoring";
import AlertsPage from "@/react-app/pages/Alerts";
import CompliancePage from "@/react-app/pages/Compliance";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
