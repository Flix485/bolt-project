import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Customer } from '../../types';

interface CustomerFormProps {
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id' | 'loyaltyPoints'>) => void;
  initialCustomer?: Customer;
}

const CustomerForm = ({ onClose, onSave, initialCustomer }: CustomerFormProps) => {
  const [customer, setCustomer] = useState({
    firstName: initialCustomer?.firstName || '',
    lastName: initialCustomer?.lastName || '',
    email: initialCustomer?.email || '',
    phone: initialCustomer?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(customer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialCustomer ? 'Modifier le client' : 'Nouveau client'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={customer.firstName}
              onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={customer.lastName}
              onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {initialCustomer ? 'Mettre à jour' : 'Ajouter le client'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;