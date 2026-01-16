import PresupuestadorClient from './PresupuestadorClient';

export const metadata = {
  title: 'Generador de Presupuestos',
  description: 'Herramienta para generar presupuestos de trámites urbanísticos',
};

export default function PresupuestadorPage() {
  return <PresupuestadorClient />;
}
