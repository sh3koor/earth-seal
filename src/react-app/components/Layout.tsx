import { ReactNode } from 'react';
import Sidebar from '@/react-app/components/Sidebar';
import { useRealTimeData } from '@/react-app/hooks/useRealTimeData';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { alerts } = useRealTimeData();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <Sidebar alertsCount={alerts.length} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
