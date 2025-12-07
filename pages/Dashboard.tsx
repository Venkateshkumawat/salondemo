import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { store } from '../services/store';
import { Plus, Calendar, CheckCircle, Clock, CreditCard, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Appointment } from '../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, upcoming: 0 });
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // In a real app, calculate these from the DB
    const s = store.getStats();
    setStats(s);
    
    // Get all for demo, limit to top 4 for dashboard
    const all = store.getAppointments();
    setTodayAppointments(all.slice(0, 4));
  }, []);

  const statCards = [
    { label: 'Total Appointments', value: stats.total.toString(), icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed', value: stats.completed.toString(), icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Upcoming', value: stats.upcoming.toString(), icon: Clock, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <Link to="/appointments">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} padding="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
            <Link to="/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
          </div>
          
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <Card key={apt.id} className="hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center" padding="p-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="font-bold text-gray-900">{apt.time}</p>
                  <p className="text-xs text-gray-500">{apt.durationMin}m</p>
                </div>
                <div className="flex-1 min-w-0 border-l-2 border-slate-100 pl-4">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{apt.clientName}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {apt.serviceName} with {store.getStaff().find(s => s.id === apt.staffId)?.name || 'Staff'}
                  </p>
                </div>
                <div>
                   <Badge color={
                     apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                     apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                     'bg-gray-100 text-gray-800'
                   }>
                     {apt.status}
                   </Badge>
                </div>
              </Card>
            ))}
            {todayAppointments.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No appointments scheduled for today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Revenue */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
             <div className="flex items-start justify-between relative z-10">
               <div>
                 <p className="font-medium opacity-70 text-sm">Estimated Revenue</p>
                 <p className="text-3xl font-bold mt-2">$845.00</p>
               </div>
               <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                 <CreditCard className="h-5 w-5 text-white" />
               </div>
             </div>
             <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                +12% vs last week
             </div>
          </Card>

          <div>
             <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
             <Card className="divide-y divide-slate-50 border-0 shadow-sm" padding="p-0">
               <Link to="/clients" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary-600 transition-colors first:rounded-t-xl">
                 Add New Client
               </Link>
               <Link to="/billing" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary-600 transition-colors">
                 Create Invoice
               </Link>
               <button className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary-600 transition-colors last:rounded-b-xl">
                 Manage Staff Schedule
               </button>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
