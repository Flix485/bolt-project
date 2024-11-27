import React, { useState } from 'react';
import { X, Plus, Minus, Search } from 'lucide-react';
import type { Purchase, PurchaseProduct, Seller } from '../../types';
import SellerForm from './SellerForm';

interface PurchaseFormProps {
  onClose: () => void;
  onSave: (purchase: Omit<Purchase, 'id'>) => void;
}

const PurchaseForm = ({ onClose, onSave }: PurchaseFormProps) => {
  const [seller, setSeller] = useState<Omit<Seller, 'id'> | null>(null);
  const [products, setProducts] = useState<PurchaseProduct[]>([]);
  const [showSellerForm, setShowSellerForm] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'check'>('cash');

  const handleAddProduct = () => {
    setProducts([...products, {
      ean: '',
      name: '',
      serialNumber: '',
      quantity: 1,
      purchasePrice: 0,
      estimatedSellingPrice: 0
    }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: keyof PurchaseProduct, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setProducts(updatedProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seller) return;

    const purchase: Omit<Purchase, 'id'> = {
      date: new Date(),
      seller: { ...seller, id: Date.now().toString() },
      products,
      totalAmount: products.reduce((sum, product) => sum + (product.purchasePrice * product.quantity), 0),
      paymentMethod
    };

    onSave(purchase);
  };

  const totalAmount = products.reduce((sum, product) => sum + (product.purchasePrice * product.quantity), 0);

  if (showSellerForm) {
    return (
      <SellerForm
        onClose={onClose}
        onSave={(newSeller) => {
          setSeller(newSeller);
          setShowSellerForm(false);
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nouvel Achat</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {seller && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Informations Vendeur</h3>
              <p>{seller.firstName} {seller.lastName}</p>
              <p className="text-sm text-gray-600">{seller.phone}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Produits</h3>
              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un produit
              </button>
            </div>

            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    className="w-full border rounded-lg px-3 py-2"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="EAN"
                    className="w-full border rounded-lg px-3 py-2"
                    value={product.ean}
                    onChange={(e) => handleProductChange(index, 'ean', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Prix d'achat"
                    className="w-full border rounded-lg px-3 py-2"
                    value={product.purchasePrice}
                    onChange={(e) => handleProductChange(index, 'purchasePrice', parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Quantité"
                    className="w-full border rounded-lg px-3 py-2"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mode de paiement</label>
              <select
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'check')}
                required
              >
                <option value="cash">Espèces</option>
                <option value="card">Carte bancaire</option>
                <option value="check">Chèque</option>
              </select>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{totalAmount.toFixed(2)} €</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Valider l'achat
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;