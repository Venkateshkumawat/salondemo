import React, { useState } from 'react';
import { Card, Button, Input, Modal, Badge } from '../components/UI';
import { store } from '../services/store';
import { Phone, Mail, Search, Plus, User, ArrowLeft, Calendar, Trash2, Edit2, Save } from 'lucide-react';
import { Client } from '../types';

export const Clients: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(store.getClients());
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const handleAddClient = () => {
    store.addClient(formData);
    setClients(store.getClients()); // Refresh list
    setIsAddModalOpen(false);
    setFormData({ name: '', phone: '', email: '', notes: '' });
  };

  const handleUpdateClient = () => {
    if (selectedClient) {
      store.updateClient(selectedClient.id, formData);
      setClients(store.getClients());
      setSelectedClient({ ...selectedClient, ...formData });
      setIsEditMode(false);
    }
  };

  const handleDeleteClient = () => {
    if (selectedClient && confirm('Are you sure you want to delete this client?')) {
      store.deleteClient(selectedClient.id);
      setClients(store.getClients());
      setView('list');
      setSelectedClient(null);
    }
  };

  const openDetail = (client: Client) => {
    setSelectedClient(client);
    setFormData({ name: client.name, phone: client.phone, email: client.email, notes: client.notes });
    setView('detail');
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      {view === 'list' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
              <p className="text-gray-500">Manage your customer base</p>
            </div>
            <Button onClick={() => { setFormData({ name: '', phone: '', email: '', notes: '' }); setIsAddModalOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>

          <Card padding="p-0">
             <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
               <div className="relative max-w-md">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search by name or phone..." 
                   className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-medium">
                   <tr>
                     <th className="px-6 py-4">Name</th>
                     <th className="px-6 py-4">Contact</th>
                     <th className="px-6 py-4">Joined</th>
                     <th className="px-6 py-4">Last Visit</th>
                     <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {filteredClients.map(client => (
                     <tr key={client.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => openDetail(client)}>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                             {client.name.charAt(0)}
                           </div>
                           <span className="font-medium text-gray-900">{client.name}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex flex-col">
                           <span className="text-gray-900">{client.phone}</span>
                           <span className="text-gray-400 text-xs">{client.email}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-gray-500">{new Date(client.joinedDate).toLocaleDateString()}</td>
                       <td className="px-6 py-4 text-gray-500">{client.lastVisit ? new Date(client.lastVisit).toLocaleDateString() : 'Never'}</td>
                       <td className="px-6 py-4 text-right">
                         <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); openDetail(client); }}>View</Button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               {filteredClients.length === 0 && (
                 <div className="p-8 text-center text-gray-500">No clients found.</div>
               )}
             </div>
          </Card>
        </>
      )}

      {view === 'detail' && selectedClient && (
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <button onClick={() => setView('list')} className="mb-4 flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Clients
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar Profile Info */}
            <div className="space-y-6">
              <Card className="text-center relative overflow-hidden" padding="p-8">
                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-50 to-teal-50 z-0"></div>
                 <div className="relative z-10">
                   <div className="w-24 h-24 bg-white border-4 border-white shadow-md rounded-full flex items-center justify-center text-3xl font-bold text-primary-600 mx-auto mb-4">
                     {selectedClient.name.charAt(0)}
                   </div>
                   
                   {!isEditMode ? (
                     <>
                       <h2 className="text-xl font-bold text-gray-900">{selectedClient.name}</h2>
                       <p className="text-sm text-gray-500 mb-6">Client ID: #{selectedClient.id}</p>
                       
                       <div className="space-y-4 text-left">
                          <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-slate-50 rounded-lg">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {selectedClient.phone}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-slate-50 rounded-lg">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {selectedClient.email}
                          </div>
                       </div>
                       
                       <div className="mt-8 grid grid-cols-2 gap-2">
                         <Button variant="outline" className="w-full" onClick={() => setIsEditMode(true)}>
                           <Edit2 className="h-3 w-3 mr-2" /> Edit
                         </Button>
                         <Button variant="danger" className="w-full" onClick={handleDeleteClient}>
                           <Trash2 className="h-3 w-3 mr-2" /> Delete
                         </Button>
                       </div>
                     </>
                   ) : (
                     <div className="space-y-4 text-left">
                       <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                       <Input label="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                       <Input label="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                       <div className="flex gap-2 mt-4">
                         <Button variant="secondary" className="flex-1" onClick={() => setIsEditMode(false)}>Cancel</Button>
                         <Button className="flex-1" onClick={handleUpdateClient}>Save</Button>
                       </div>
                     </div>
                   )}
                 </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
                {isEditMode ? (
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                ) : (
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm border border-yellow-100">
                    {selectedClient.notes || "No notes available."}
                  </div>
                )}
              </Card>
            </div>

            {/* Main History Area */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-bold text-gray-900">Appointment History</h3>
                   <Badge color="bg-blue-50 text-blue-700">
                     {store.getAppointments().filter(a => a.clientId === selectedClient.id).length} Visits
                   </Badge>
                </div>

                <div className="space-y-6">
                  {store.getAppointments()
                    .filter(a => a.clientId === selectedClient.id)
                    .map((apt) => (
                      <div key={apt.id} className="flex gap-4 items-start group">
                        <div className="flex flex-col items-center">
                           <div className="w-2 h-2 rounded-full bg-slate-300 mt-2 group-first:bg-primary-500"></div>
                           <div className="w-px h-full bg-slate-200 my-1 group-last:hidden"></div>
                        </div>
                        <div className="flex-1 pb-6 group-last:pb-0">
                           <div className="flex justify-between items-start">
                             <div>
                               <p className="font-semibold text-gray-900">{apt.serviceName}</p>
                               <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                 <Calendar className="h-3 w-3" />
                                 {new Date(apt.date).toLocaleDateString()} at {apt.time}
                               </div>
                             </div>
                             <Badge color={
                               apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                               apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                               'bg-gray-100 text-gray-800'
                             }>
                               {apt.status}
                             </Badge>
                           </div>
                           <p className="text-sm text-slate-500 mt-2 bg-slate-50 p-3 rounded-lg">
                             Staff: {store.getStaff().find(s => s.id === apt.staffId)?.name}
                           </p>
                        </div>
                      </div>
                  ))}
                  {store.getAppointments().filter(a => a.clientId === selectedClient.id).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No appointments recorded yet.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Client"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="e.g. Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <Input label="Phone Number" placeholder="(555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <Input label="Email Address" placeholder="jane@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              rows={3}
              placeholder="Any allergies or preferences?"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAddClient} disabled={!formData.name}>Add Client</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};