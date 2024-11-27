import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Seller } from '../../types';

interface SellerFormProps {
  onClose: () => void;
  onSave: (seller: Omit<Seller, 'id'>) => void;
}

const SellerForm = ({ onClose, onSave }: SellerFormProps) => {
  const [seller, setSeller] = useState<Omit<Seller, 'id'>>({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    documentType: 'Carte d\'identité',
    documentNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(seller);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Informations du Vendeur</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.firstName}
                onChange={(e) => setSeller({ ...seller, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.lastName}
                onChange={(e) => setSeller({ ...seller, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={seller.address}
              onChange={(e) => setSeller({ ...seller, address: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Code postal</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.postalCode}
                onChange={(e) => setSeller({ ...seller, postalCode: e.target.value })}
                required
                pattern="[0-9]{5}"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ville</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.city}
                onChange={(e) => setSeller({ ...seller, city: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={seller.phone}
              onChange={(e) => setSeller({ ...seller, phone: e.target.value })}
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type de document</label>
              <select
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.documentType}
                onChange={(e) => setSeller({ ...seller, documentType: e.target.value })}
                required
              >
                <option value="Carte d'identité">Carte d'identité</option>
                <option value="Passeport">Passeport</option>
                <option value="Permis de conduire">Permis de conduire</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Numéro du document</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={seller.documentNumber}
                onChange={(e) => setSeller({ ...seller, documentNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;