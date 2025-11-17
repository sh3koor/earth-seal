import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  time: string;
  co2Level: number;
  pressure: number;
  temperature: number;
}

interface RealTimeChartProps {
  data: ChartDataPoint[];
  title: string;
}

export default function RealTimeChart({ data, title }: RealTimeChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20 text-gray-400 dark:text-gray-600" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: 'currentColor' }}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'currentColor' }}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
              wrapperClassName="[--tooltip-bg:theme(colors.gray.50)] [--tooltip-border:theme(colors.gray.200)] [--tooltip-text:theme(colors.gray.900)] dark:[--tooltip-bg:theme(colors.gray.800)] dark:[--tooltip-border:theme(colors.gray.700)] dark:[--tooltip-text:theme(colors.white)]"
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="co2Level" 
              stroke="#059669" 
              strokeWidth={3}
              name="CO₂ Level (ppm)"
              dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="pressure" 
              stroke="#dc2626" 
              strokeWidth={3}
              name="Pressure (MPa)"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#2563eb" 
              strokeWidth={3}
              name="Temperature (°C)"
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
