import React from 'react';
import { X, Printer, Mail } from 'lucide-react';
import type { Purchase } from '../../types';

interface PurchaseReceiptProps {
  purchase: Purchase;
  onClose: () => void;
}

const PurchaseReceipt = ({ purchase, onClose }: PurchaseReceiptProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // Implement email functionality
    console.log('Sending email...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Acte d'achat</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 print:space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg print:bg-white">
            <h3 className="font-medium mb-2">Informations Vendeur</h3>
            <p>{purchase.seller.firstName} {purchase.seller.lastName}</p>
            <p>{purchase.seller.address}</p>
            <p>{purchase.seller.postalCode} {purchase.seller.city}</p>
            <p>Tél: {purchase.seller.phone}</p>
            <p>{purchase.seller.documentType}: {purchase.seller.documentNumber}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Produits Achetés</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 print:bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EAN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Série</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qté</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchase.products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.ean}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.serialNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.purchasePrice.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Mode de paiement</p>
              <p className="font-medium">{purchase.paymentMethod}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{purchase.totalAmount.toFixed(2)} €</p>
            </div>
          </div>

          <div className="print:hidden flex justify-end space-x-4">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimer
            </button>
            <button
              onClick={handleEmail}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Envoyer par email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReceipt;