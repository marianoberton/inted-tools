'use client';

import { useState } from 'react';
import DashboardClient from './DashboardClient';
import type { Proceso, KpiData } from './types'; // Assuming KpiData is used here

// Props for DashboardContainer will be the initial data including kpiData
interface DashboardContainerProps {
  initialNacionProcesos: Proceso[];
  initialBacProcesos: Proceso[];
  kpiData: KpiData;
  initialLastNacionDocId?: string;
  initialLastBacDocId?: string;
}

// KPICard definition (moved from DashboardClient)
const KPICard = ({ title, value, subValue }: { title: string; value: string | number; subValue?: string }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white">
    <h3 className="text-lg font-semibold text-slate-400 mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
    {subValue && <p className="text-sm text-slate-300 mt-1">{subValue}</p>}
  </div>
);

export default function DashboardContainer({
  initialNacionProcesos,
  initialBacProcesos,
  kpiData,
  initialLastNacionDocId,
  initialLastBacDocId,
}: DashboardContainerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          Dashboard Licitaciones
        </h1>
      </header>

      {/* KPI Section - Updated for total counts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <KPICard title="Total Procesos Nación" value={kpiData.totalProcesosNacion} />
        <KPICard title="Total Procesos BAC (GCBA)" value={kpiData.totalProcesosBac} />
      </section>

      <DashboardClient
        initialNacionProcesos={initialNacionProcesos}
        initialBacProcesos={initialBacProcesos}
        initialLastNacionDocId={initialLastNacionDocId}
        initialLastBacDocId={initialLastBacDocId}
        searchTerm={''}
      />
    </div>
  );
} 