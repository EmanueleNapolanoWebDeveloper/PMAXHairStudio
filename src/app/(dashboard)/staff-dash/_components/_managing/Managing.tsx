'use client'

import React, { useState } from 'react';
import { Users, Euro, ShoppingCart, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { useStaffContext } from '@/src/app/store/StaffContext';
import { Reservation } from '@/src/lib/types';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2025');

  const { reservations, employees } = useStaffContext();

  if (reservations.isLoading || employees.isLoading) return <p>Loading...</p>;

  // =========================
  // Calcolo dati mensili
  // =========================
  interface MonthlyStats {
    [month: string]: {
      clienti: number;
      guadagni: number;
    };
  }

  const getMonthlyStats = (reservations: Reservation[]): MonthlyStats => {
    return reservations.reduce((acc, res) => {
      if (res.status !== 'completato') return acc;
      if (!res.date || isNaN(new Date(res.date).getTime())) return acc;

      const date = new Date(res.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthKey]) acc[monthKey] = { clienti: 0, guadagni: 0 };

      acc[monthKey].clienti += 1;
      acc[monthKey].guadagni += res.amount || 0;

      return acc;
    }, {} as MonthlyStats);
  };

  const monthlyStats = getMonthlyStats(reservations.data || []);

  const monthsMap = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const monthlyData = monthsMap.map((m, i) => {
    const key = `${selectedPeriod}-${m}`;
    return {
      month: new Date(parseInt(selectedPeriod), i).toLocaleString('it-IT', { month: 'short' }),
      clienti: monthlyStats[key]?.clienti ?? 0,
      guadagni: monthlyStats[key]?.guadagni ?? 0,
      ordini: monthlyStats[key]?.clienti ?? 0, // per ora ordini = clienti completati
      conversione: 0,
    };
  });

  // =========================
  // Metriche crescita mese
  // =========================
  const currentMonth = monthlyData[new Date().getMonth()] ?? { clienti: 0, guadagni: 0, ordini: 0, conversione: 0 };
  const previousMonth = monthlyData[new Date().getMonth() - 1] ?? { clienti: 0, guadagni: 0, ordini: 0, conversione: 0 };

  const calcGrowth = (current: number, previous: number): string =>
    previous === 0 ? '0' : ((current - previous) / previous * 100).toFixed(1);

  const clientiGrowth = calcGrowth(currentMonth.clienti, previousMonth.clienti);
  const guadagniGrowth = calcGrowth(currentMonth.guadagni, previousMonth.guadagni);
  const ordiniGrowth = calcGrowth(currentMonth.ordini, previousMonth.ordini);

  // =========================
  // MetricCard
  // =========================
  interface MetricCardProps {
    title: string;
    value: number;
    growth: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    format?: string;
  }

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, growth, icon: Icon, format = '' }) => {
    const growthNum = parseFloat(growth);
    const isPositive = growthNum >= 0;

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <Icon size={24} className="text-red-600" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {Math.abs(growthNum)}%
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {format}{value.toLocaleString('it-IT')}
          </h3>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
    );
  };

  // =========================
  // Tooltip personalizzato
  // =========================
  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString('it-IT')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between md:mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
          <p className="text-gray-600">Monitoraggio performance mensili</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <Calendar size={20} className="text-gray-500" />
        </div>
      </div>

      {/* Metriche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Clienti questo mese" value={currentMonth.clienti} growth={clientiGrowth} icon={Users} />
        <MetricCard title="Guadagni totali" value={currentMonth.guadagni} growth={guadagniGrowth} icon={Euro} format="€" />
        <MetricCard title="Membri dello Staff" value={employees.data?.length ?? 0} growth={ordiniGrowth} icon={ShoppingCart} />
      </div>

      {/* Grafici e Riepilogo Annuale */}
      {/* Puoi lasciare AreaChart e LineChart così come erano */}
    </div>
  );
};

export default MonthlyDashboard;
