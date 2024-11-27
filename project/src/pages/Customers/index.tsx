import React, { useState } from 'react';
import { Search, Plus, User, Mail, Phone, Award } from 'lucide-react';
import type { Customer } from '../../types';
import CustomerForm from '../../components/Customers/CustomerForm';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    loyaltyPoints: 150
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    phone: '06 98 76 54 32',
    loyaltyPoints: 75
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'loyaltyPoints'>) => {
    const customerWithId = {
      ...newCustomer,
      id: Date.now().toString(),
      loyaltyPoints: 0
    };
    setCustomers([...customers, customerWithId]);
  };

  const handleEditCustomer = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleUpdateCustomer = (updatedCustomer: Omit<Customer, 'id' | 'loyaltyPoints'>) => {
    if (editingCustomer) {
      setCustomers(customers.map(c =>
        c.id === editingCustomer.id
          ? { ...updatedCustomer, id: c.id, loyaltyPoints: c.loyaltyPoints }
          : c
      ));
      setEditingCustomer(undefined);
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Clients</h1>
        <button
          onClick={() => {
            setEditingCustomer(undefined);
            setShowCustomerForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Client
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Award className="w-4 h-4 text-amber-500 mr-1" />
                    <span className="text-sm text-gray-600">{customer.loyaltyPoints} points fidélité</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCustomer(customer.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <a href={`mailto:${customer.email}`} className="text-sm hover:text-blue-600">
                  {customer.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${customer.phone}`} className="text-sm hover:text-blue-600">
                  {customer.phone}
                </a>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                Historique
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
                Ajouter des points
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCustomerForm && (
        <CustomerForm
          onClose={() => {
            setShowCustomerForm(false);
            setEditingCustomer(undefined);
          }}
          onSave={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
          initialCustomer={editingCustomer}
        />
      )}
    </div>
  );
};

export default Customers;