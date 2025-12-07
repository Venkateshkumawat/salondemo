export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  joinedDate: string;
  lastVisit?: string;
}

export interface Service {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  category: 'Hair' | 'Nails' | 'Skin' | 'Massage';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  NoShow = 'No Show'
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  staffId: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO Date string YYYY-MM-DD
  time: string; // HH:mm
  durationMin: number;
  status: AppointmentStatus;
  notes?: string;
  color: string;
  reminderSent?: boolean;
}

export interface InvoiceItem {
  serviceId: string;
  serviceName: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: string;
  status: 'Paid' | 'Pending';
  paymentMethod?: 'Cash' | 'Card' | 'UPI';
}

export type ColorTheme = 'teal' | 'blue' | 'violet' | 'rose' | 'amber';
