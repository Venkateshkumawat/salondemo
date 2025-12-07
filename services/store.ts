import { Client, Service, Staff, Appointment, AppointmentStatus } from '../types';

// Initial Data
const initialClients: Client[] = [
  { id: '1', name: 'Sarah Jenkins', phone: '(555) 123-4567', email: 'sarah.j@example.com', notes: 'Prefers ammonia-free hair dye.', joinedDate: '2023-01-15', lastVisit: '2023-10-05' },
  { id: '2', name: 'Michael Chen', phone: '(555) 987-6543', email: 'm.chen@example.com', notes: 'Sensitive skin, use hypoallergenic products.', joinedDate: '2023-03-22', lastVisit: '2023-09-28' },
  { id: '3', name: 'Emma Watson', phone: '(555) 456-7890', email: 'emma.w@example.com', notes: 'Likes tea with sugar.', joinedDate: '2022-11-10', lastVisit: '2023-10-12' },
  { id: '4', name: 'Olivia Rodrigo', phone: '(555) 222-3333', email: 'olivia@example.com', notes: 'VVIP. Loves purple.', joinedDate: '2023-06-15', lastVisit: '2023-11-01' },
];

const initialServices: Service[] = [
  { id: 's1', name: 'Women\'s Haircut', durationMin: 60, price: 65, category: 'Hair' },
  { id: 's2', name: 'Men\'s Haircut', durationMin: 30, price: 35, category: 'Hair' },
  { id: 's3', name: 'Gel Manicure', durationMin: 45, price: 40, category: 'Nails' },
  { id: 's4', name: 'Basic Facial', durationMin: 60, price: 85, category: 'Skin' },
  { id: 's5', name: 'Full Body Massage', durationMin: 90, price: 120, category: 'Massage' },
  { id: 's6', name: 'Balayage Color', durationMin: 180, price: 200, category: 'Hair' },
];

const initialStaff: Staff[] = [
  { id: 'st1', name: 'Jessica A.', role: 'Senior Stylist' },
  { id: 'st2', name: 'David B.', role: 'Colorist' },
  { id: 'st3', name: 'Maria G.', role: 'Nail Technician' },
];

const initialAppointments: Appointment[] = [
  { 
    id: 'a1', 
    clientId: '1', 
    clientName: 'Sarah Jenkins', 
    staffId: 'st1', 
    serviceId: 's1', 
    serviceName: 'Women\'s Haircut', 
    date: new Date().toISOString().split('T')[0], 
    time: '10:00', 
    durationMin: 60, 
    status: AppointmentStatus.Completed,
    color: 'bg-emerald-100 border-emerald-200 text-emerald-700',
    reminderSent: true
  },
  { 
    id: 'a2', 
    clientId: '2', 
    clientName: 'Michael Chen', 
    staffId: 'st2', 
    serviceId: 's2', 
    serviceName: 'Men\'s Haircut', 
    date: new Date().toISOString().split('T')[0], 
    time: '11:30', 
    durationMin: 30, 
    status: AppointmentStatus.Scheduled,
    color: 'bg-blue-100 border-blue-200 text-blue-700',
    reminderSent: false
  },
  { 
    id: 'a3', 
    clientId: '3', 
    clientName: 'Emma Watson', 
    staffId: 'st3', 
    serviceId: 's3', 
    serviceName: 'Gel Manicure', 
    date: new Date().toISOString().split('T')[0], 
    time: '14:00', 
    durationMin: 45, 
    status: AppointmentStatus.Scheduled,
    color: 'bg-purple-100 border-purple-200 text-purple-700',
    reminderSent: false
  },
];

// Simple In-Memory Store
class Store {
  clients = initialClients;
  services = initialServices;
  staff = initialStaff;
  appointments = initialAppointments;

  // --- Clients ---
  getClients() { return this.clients; }
  
  addClient(client: Omit<Client, 'id' | 'joinedDate'>) {
    const newClient = {
      ...client,
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString()
    };
    this.clients = [newClient, ...this.clients];
    return newClient;
  }

  updateClient(id: string, updates: Partial<Client>) {
    this.clients = this.clients.map(c => c.id === id ? { ...c, ...updates } : c);
  }

  deleteClient(id: string) {
    this.clients = this.clients.filter(c => c.id !== id);
  }

  // --- Services ---
  getServices() { return this.services; }

  addService(service: Omit<Service, 'id'>) {
    const newService = {
      ...service,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.services = [...this.services, newService];
    return newService;
  }

  deleteService(id: string) {
    this.services = this.services.filter(s => s.id !== id);
  }

  // --- Staff ---
  getStaff() { return this.staff; }
  
  // --- Appointments ---
  getAppointments(date?: string) {
    if (date) {
      return this.appointments.filter(a => a.date === date);
    }
    return this.appointments;
  }

  addAppointment(apt: Omit<Appointment, 'id' | 'color'>) {
    const newApt: Appointment = {
      ...apt,
      id: Math.random().toString(36).substr(2, 9),
      color: 'bg-blue-100 border-blue-200 text-blue-700', // Default scheduled color
      status: AppointmentStatus.Scheduled,
      reminderSent: false
    };
    this.appointments.push(newApt);
    return newApt;
  }

  updateAppointmentStatus(id: string, status: AppointmentStatus) {
    const apt = this.appointments.find(a => a.id === id);
    if (apt) {
      apt.status = status;
      if (status === AppointmentStatus.Completed) {
        apt.color = 'bg-emerald-100 border-emerald-200 text-emerald-700';
      } else if (status === AppointmentStatus.Cancelled) {
        apt.color = 'bg-red-100 border-red-200 text-red-700';
      }
    }
  }

  toggleReminder(id: string) {
    const apt = this.appointments.find(a => a.id === id);
    if (apt) {
      apt.reminderSent = !apt.reminderSent;
      return apt.reminderSent;
    }
    return false;
  }

  getStats() {
    const total = this.appointments.length;
    const completed = this.appointments.filter(a => a.status === AppointmentStatus.Completed).length;
    const upcoming = this.appointments.filter(a => a.status === AppointmentStatus.Scheduled).length;
    return { total, completed, upcoming };
  }
}

export const store = new Store();