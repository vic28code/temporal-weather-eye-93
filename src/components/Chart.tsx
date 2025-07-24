import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

import type { ChartHourlyData } from '../types/DashboardTypes';

interface ChartProps {
  data: ChartHourlyData[];
  title: string;
  dataKey: string;
  type: 'line' | 'bar';
}

const Chart: React.FC<ChartProps> = ({ data, title, dataKey, type }) => {
  return (
    <div style={{ width: '100%', height: 300, marginBottom: '20px' }}>
      <h3>{title}</h3>
      <ResponsiveContainer>
        {type === 'line' ? (
          <LineChart
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#82ca9d" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;