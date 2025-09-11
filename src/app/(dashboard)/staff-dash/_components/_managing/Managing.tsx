'use client'

import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, Euro, ShoppingCart, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'
import { getAllReservations, getEmployees } from '@/src/lib/actions';
import { Reservation } from '@/src/lib/types';

const MonthlyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025');

  const { data: reservationDatas, isLoading } = useQuery({
    queryKey: ['reservationDatas'],
    queryFn: getAllReservations
  });

  const {data: staffs, isLoading: isLoadingStaffs} = useQuery({
    queryKey: ['staffs'],
    queryFn: getEmployees
  })

  if (isLoading) return <p>Loading...</p>;

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
      if (res.status !== "completato") return acc;
      if (!res.data || isNaN(new Date(res.data).getTime())) return acc;

      const date = new Date(res.data);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!acc[monthKey]) acc[monthKey] = { clienti: 0, guadagni: 0 };

      acc[monthKey].clienti += 1;
      acc[monthKey].guadagni += res.amount || 0;

      return acc;
    }, {} as MonthlyStats);
  };

  const monthlyStats = getMonthlyStats(reservationDatas || []);

  const monthsMap = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const monthlyData = monthsMap.map((m, i) => {
    const key = `${selectedPeriod}-${m}`;
    return {
      month: new Date(selectedPeriod, i).toLocaleString('it-IT', { month: 'short' }),
      clienti: monthlyStats[key]?.clienti || 0,
      guadagni: monthlyStats[key]?.guadagni || 0,
      ordini: monthlyStats[key]?.clienti || 0, // per ora ordini = clienti completati
      conversione: 0
    };
  });

  // =========================
  // Metriche crescita mese
  // =========================
  const currentMonth = monthlyData[new Date().getMonth()];
  const previousMonth = monthlyData[new Date().getMonth() - 1] || { clienti: 0, guadagni: 0, ordini: 0, conversione: 0 };

  const calcGrowth = (current: number, previous: number) =>
    previous === 0 ? 0 : ((current - previous) / previous * 100).toFixed(1);

  const clientiGrowth = calcGrowth(currentMonth.clienti, previousMonth.clienti);
  const guadagniGrowth = calcGrowth(currentMonth.guadagni, previousMonth.guadagni);
  const ordiniGrowth = calcGrowth(currentMonth.ordini, previousMonth.ordini);

  // =========================
  // MetricCard
  // =========================
  const MetricCard = ({ title, value, growth, icon: Icon, format = '' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <Icon size={24} className="text-red-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {parseFloat(growth) >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(growth)}%
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

  // =========================
  // Tooltip personalizzato
  // =========================
  const CustomTooltip = ({ active, payload, label }) => {
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
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
        <MetricCard title="Membri dello Staff" value={staffs?.length} growth={ordiniGrowth} icon={ShoppingCart} />
      </div>

      {/* Grafico clienti mensili */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafico Clienti Mensili</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="clientiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="clienti" stroke="#DC2626" fill="url(#clientiGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ricavi Mensili</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" /> <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} /> <Line type="monotone" dataKey="guadagni" stroke="#DC2626" strokeWidth={3} dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

  // Inseriamo questa parte subito sotto il grafico clienti o LineChart guadagni
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Riepilogo Annuale</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Mese</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Clienti</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Guadagni (€)</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{row.month}</td>
                  <td className="py-3 px-4 text-gray-700">{row.clienti.toLocaleString('it-IT')}</td>
                  <td className="py-3 px-4 text-gray-700">€{row.guadagni.toLocaleString('it-IT')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default MonthlyDashboard;
