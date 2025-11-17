import { Shield, Activity, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  alertsCount: number;
}

export default function Header({ alertsCount }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-full">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Earth Seal</h1>
              <p className="text-emerald-200 text-sm">Carbon Capture & Storage MRV</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-300" />
              <span className="text-sm">Real-time Monitoring</span>
            </div>
            
            {alertsCount > 0 && (
              <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{alertsCount} Alert{alertsCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
