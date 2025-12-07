import React, { useState } from 'react';
import { Card, Button, Input, Modal, Select, Badge } from '../components/UI';
import { store } from '../services/store';
import { Plus, Scissors, Trash2, Clock, DollarSign } from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const [services, setServices] = useState(store.getServices());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', duration: '60', category: 'Hair' });

  // Group by category
  const categories = Array.from(new Set(services.map(s => s.category)));

  const handleAddService = () => {
    if (newService.name && newService.price) {
      store.addService({
        name: newService.name,
        price: parseFloat(newService.price),
        durationMin: parseInt(newService.duration),
        category: newService.category as any
      });
      setServices(store.getServices());
      setIsModalOpen(false);
      setNewService({ name: '', price: '', duration: '60', category: 'Hair' });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this service?')) {
      store.deleteService(id);
      setServices(store.getServices());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Menu</h1>
          <p className="text-gray-500">Manage treatments and pricing</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                {category === 'Hair' ? <Scissors className="h-4 w-4" /> : category.charAt(0)}
              </span>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.filter(s => s.category === category).map(service => (
                <Card key={service.id} className="relative group hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.durationMin} min
                    </div>
                    <div className="flex items-center gap-1 font-medium text-gray-900">
                      <DollarSign className="h-3 w-3" />
                      {service.price}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Service">
        <div className="space-y-4">
          <Input 
            label="Service Name" 
            placeholder="e.g. Balayage" 
            value={newService.name} 
            onChange={e => setNewService({...newService, name: e.target.value})} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price ($)" 
              type="number" 
              placeholder="0.00" 
              value={newService.price} 
              onChange={e => setNewService({...newService, price: e.target.value})} 
            />
            <Input 
              label="Duration (min)" 
              type="number" 
              value={newService.duration} 
              onChange={e => setNewService({...newService, duration: e.target.value})} 
            />
          </div>
          <Select 
            label="Category"
            options={[
              { label: 'Hair', value: 'Hair' },
              { label: 'Nails', value: 'Nails' },
              { label: 'Skin', value: 'Skin' },
              { label: 'Massage', value: 'Massage' }
            ]}
            value={newService.category}
            onChange={e => setNewService({...newService, category: e.target.value})}
          />
          <div className="pt-4 flex gap-3">
             <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button className="flex-1" onClick={handleAddService}>Save Service</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};