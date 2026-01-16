export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'currency' | 'textarea' | 'select';
  currencyType?: 'ARS' | 'USD';
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
}

export interface TramiteTemplate {
  id: string;
  label: string;
  content: string; // HTML content with {{placeholders}}
  fields: FormField[];
}

export interface PresupuestoData {
  [key: string]: string | number;
}
