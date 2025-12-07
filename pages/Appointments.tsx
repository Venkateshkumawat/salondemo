import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Select, Input } from '../components/UI';
import { store } from '../services/store';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bell, Check, Mail } from 'lucide-react';
import { AppointmentStatus, Appointment } from '../types';

export const Appointments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Form State
  const [newApt, setNewApt] = useState({ clientId: '', serviceId: '', staffId: '', time: '10:00', notes: '' });

  useEffect(() => {
    // Load appointments for the current date view
    const dateStr = currentDate.toISOString().split('T')[0];
    const all = store.getAppointments();
    
    // For demo: Filter client-side. In real app, pass date to store/API.
    // We are filtering by string date equality for MVP.
    const filtered = all.filter(a => a.date === dateStr);
    
    // Fallback: If no appointments on selected date (and it's today), show all for demo purposes if empty? 
    // No, let's keep it strict to demonstrate the date switcher working.
    // However, to make the demo feel "alive", we might want to seed data for "today" dynamically in the store, 
    // but the store mock data uses `new Date().toISOString().split('T')[0]` so it is always today.
    
    setAppointments(filtered);
  }, [currentDate, isModalOpen, notification]);

  const hours = Array.from({ length: 11 }, (_, i) => 9 + i); // 9 AM to 7 PM

  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const handleCreate = () => {
     const client = store.getClients().find(c => c.id === newApt.clientId);
     const service = store.getServices().find(s => s.id === newApt.serviceId);
     
     if (client && service) {
       store.addAppointment({
         clientId: client.id,
         clientName: client.name,
         serviceId: service.id,
         serviceName: service.name,
         staffId: newApt.staffId || 'st1',
         date: currentDate.toISOString().split('T')[0],
         time: newApt.time,
         durationMin: service.durationMin,
         status: AppointmentStatus.Scheduled,
         notes: newApt.notes
       });
       setIsModalOpen(false);
       setNotification({ message: 'Appointment created successfully!', type: 'success' });
       setTimeout(() => setNotification(null), 3000);
     }
  };

  const sendReminder = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const sent = store.toggleReminder(id);
    setAppointments([...store.getAppointments(currentDate.toISOString().split('T')[0])]); // Refresh UI
    
    setNotification({ 
      message: sent ? `Email reminder sent to client!` : `Reminder cancelled.`, 
      type: 'info' 
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
          {notification.type === 'success' ? <Check className="h-5 w-5 text-emerald-400" /> : <Mail className="h-5 w-5 text-blue-400" />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 bg-white p-1 rounded-lg shadow-sm border border-slate-200">
          <button onClick={handlePrevDay} className="p-2 hover:bg-slate-50 rounded-md text-slate-500">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 px-2 min-w-[140px] justify-center">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <button onClick={handleNextDay} className="p-2 hover:bg-slate-50 rounded-md text-slate-500">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Legend */}
           <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Scheduled</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> VIP</div>
           </div>
           <Button onClick={() => setIsModalOpen(true)}>Create Appointment</Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-[80px_1fr] divide-x divide-slate-100 border-b border-slate-100 bg-slate-50 text-xs font-medium text-slate-500 sticky top-0 z-10">
           <div className="p-3 text-center">Time</div>
           <div className="p-3">Schedule</div>
        </div>
        
        <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
          {hours.map((hour) => {
             const displayTime = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
             
             // Loose matching for MVP demo (parsing "10:00" -> 10)
             const hourApts = appointments.filter(a => parseInt(a.time.split(':')[0]) === hour);

             return (
               <div key={hour} className="grid grid-cols-[80px_1fr] divide-x divide-slate-100 min-h-[100px] group hover:bg-slate-50/30 transition-colors">
                 <div className="p-4 text-xs font-medium text-slate-400 text-center sticky left-0 bg-white/50 group-hover:bg-slate-50/50">
                   {displayTime}
                 </div>
                 <div className="p-2 relative">
                   {/* Horizontal guides */}
                   <div className="absolute top-1/2 left-0 right-0 border-t border-slate-50 border-dashed pointer-events-none"></div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                     {hourApts.map(apt => (
                        <div key={apt.id} className={`p-3 rounded-lg border text-sm shadow-sm ${apt.color} hover:shadow-md transition-all relative group/card`}>
                          <div className="font-semibold flex justify-between items-start">
                             <span>{apt.clientName}</span>
                             <span className="text-[10px] opacity-75 font-mono">{apt.time}</span>
                          </div>
                          <div className="opacity-90 text-xs mt-1">{apt.serviceName}</div>
                          
                          <div className="flex items-center justify-between mt-3">
                             <div className="flex items-center gap-1 text-[10px] opacity-75">
                                <div className="w-4 h-4 rounded-full bg-white/40 flex items-center justify-center font-bold">
                                  {apt.staffId.charAt(2).toUpperCase()} 
                                </div>
                                <span>{store.getStaff().find(s => s.id === apt.staffId)?.name.split(' ')[0]}</span>
                             </div>

                             {/* Email Reminder Button */}
                             <button 
                               onClick={(e) => sendReminder(e, apt.id)}
                               title={apt.reminderSent ? "Reminder Sent" : "Send Email Reminder"}
                               className={`p-1.5 rounded-full transition-colors ${apt.reminderSent ? 'bg-green-500/20 text-green-700' : 'bg-white/50 hover:bg-white text-slate-600'}`}
                             >
                               {apt.reminderSent ? <Check className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                             </button>
                          </div>
                        </div>
                     ))}
                   </div>
                 </div>
               </div>
             );
          })}
          {appointments.length === 0 && (
             <div className="p-8 text-center text-slate-400 text-sm">
                No appointments for this day. Click "Create Appointment" to add one.
             </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="New Appointment"
      >
        <div className="space-y-4">
          <Select 
            label="Client" 
            options={[{ label: 'Select Client...', value: '' }, ...store.getClients().map(c => ({ label: c.name, value: c.id }))]} 
            value={newApt.clientId}
            onChange={(e) => setNewApt({...newApt, clientId: e.target.value})}
          />
          <Select 
            label="Service" 
            options={[{ label: 'Select Service...', value: '' }, ...store.getServices().map(s => ({ label: `${s.name} ($${s.price})`, value: s.id }))]} 
            value={newApt.serviceId}
            onChange={(e) => setNewApt({...newApt, serviceId: e.target.value})}
          />
          <Select 
            label="Staff Member" 
            options={[{ label: 'Any Staff', value: '' }, ...store.getStaff().map(s => ({ label: s.name, value: s.id }))]} 
            value={newApt.staffId}
            onChange={(e) => setNewApt({...newApt, staffId: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" value={currentDate.toISOString().split('T')[0]} disabled className="bg-gray-50"/>
            <Input label="Time" type="time" value={newApt.time} onChange={(e) => setNewApt({...newApt, time: e.target.value})} />
          </div>

          <Input label="Notes" placeholder="Any special requests?" value={newApt.notes} onChange={(e) => setNewApt({...newApt, notes: e.target.value})} />

          <div className="pt-4 flex gap-3">
             <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button className="flex-1" onClick={handleCreate}>Create Appointment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
