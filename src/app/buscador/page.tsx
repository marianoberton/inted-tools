import BuscadorClient from './BuscadorClient';

export default function BuscadorPage() {
  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          Buscador Global de Procesos
        </h1>
      </header>
      <BuscadorClient />
    </div>
  );
} 