import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ComposedChart, Area
} from 'recharts';
import { Card } from '../../components/common';

// Temperature Chart Component
export function TemperatureChart({ data }) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      actualTemp: item.actualTemp,
      feelsLike: item.feelsLike,
    }));
  }, [data]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Temperature Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actualTemp" 
              stroke="#338EFF" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Actual Temperature"
            />
            <Line 
              type="monotone" 
              dataKey="feelsLike" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Feels Like"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Wind Speed Chart Component
export function WindChart({ data }) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      windSpeed: item.windSpeed,
    }));
  }, [data]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Wind Speed</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 50]} // Fixed Y-axis from 0 to 50 km/h
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Bar dataKey="windSpeed" fill="#10B981" name="Wind Speed (km/h)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Humidity and Precipitation Chart Component
export function HumidityPrecipitationChart({ data }) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      humidity: item.humidity,
      precipitation: item.precipitation,
    }));
  }, [data]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Humidity & Precipitation</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="humidity" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Humidity (%)"
            />
            <Bar 
              yAxisId="right"
              dataKey="precipitation" 
              fill="#60A5FA" 
              name="Precipitation (%)"
              opacity={0.7}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}