export interface FormOption {
  label: string;
  value: string;
  price?: number;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'currency' | 'textarea' | 'select' | 'magnitude';
  currencyType?: 'ARS' | 'USD';
  placeholder?: string;
  defaultValue?: string;
  options?: string[] | FormOption[];
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
