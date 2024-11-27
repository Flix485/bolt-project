import React, { useState } from 'react';
import { Search, Plus, Package, AlertTriangle, User, FileText } from 'lucide-react';
import type { Purchase, Seller } from '../../types';
import PurchaseForm from '../../components/Purchases/PurchaseForm';
import SellerForm from '../../components/Purchases/SellerForm';
import PurchaseReceipt from '../../components/Purchases/PurchaseReceipt';

const MOCK_PURCHASES: Purchase[] = [
  {
    id: '1',
    date: new Date(),
    seller: {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      address: '123 rue de Paris',
      postalCode: '75001',
      city: 'Paris',
      phone: '0612345678',
      documentType: 'Carte d\'identité',
      documentNumber: 'ABC123456'
    },
    products: [
      {
        ean: '0711719346005',
        name: 'PlayStation 5',
        serialNumber: 'PS5123456',
        quantity: 1,
        purchasePrice: 350,
        estimatedSellingPrice: 450
      }
    ],
    totalAmount: 350,
    paymentMethod: 'cash'
  }
];

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(MOCK_PURCHASES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const filteredPurchases = purchases.filter(purchase =>
    `${purchase.seller.firstName} ${purchase.seller.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddPurchase = (purchase: Omit<Purchase, 'id'>) => {
    const purchaseWithId = {
      ...purchase,
      id: Date.now().toString()
    };
    setPurchases([...purchases, purchaseWithId]);
    setShowPurchaseForm(false);
  };

  const handleViewReceipt = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setShowReceiptModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Achats</h1>
        <button
          onClick={() => setShowPurchaseForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvel Achat
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un achat..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendeur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {purchase.date.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {purchase.seller.firstName} {purchase.seller.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {purchase.seller.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {purchase.products.map(product => product.name).join(', ')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {purchase.products.reduce((acc, curr) => acc + curr.quantity, 0)} articles
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {purchase.totalAmount.toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {purchase.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewReceipt(purchase)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPurchaseForm && (
        <PurchaseForm
          onClose={() => setShowPurchaseForm(false)}
          onSave={handleAddPurchase}
        />
      )}

      {showReceiptModal && selectedPurchase && (
        <PurchaseReceipt
          purchase={selectedPurchase}
          onClose={() => {
            setShowReceiptModal(false);
            setSelectedPurchase(null);
          }}
        />
      )}
    </div>
  );
};

export default Purchases;