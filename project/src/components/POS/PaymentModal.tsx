import React, { useState } from 'react';
import { X, CreditCard, Banknote, FileText, Mail } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPaymentComplete: (payments: PaymentDetail[]) => void;
}

export interface PaymentDetail {
  method: 'card' | 'cash' | 'check';
  amount: number;
}

const PaymentModal = ({ total, onClose, onPaymentComplete }: PaymentModalProps) => {
  const [payments, setPayments] = useState<PaymentDetail[]>([]);
  const [currentAmount, setCurrentAmount] = useState('');
  const [currentMethod, setCurrentMethod] = useState<'card' | 'cash' | 'check'>('card');

  const remainingAmount = total - payments.reduce((sum, p) => sum + p.amount, 0);

  const handleAddPayment = () => {
    const amount = parseFloat(currentAmount);
    if (amount > 0 && amount <= remainingAmount) {
      setPayments([...payments, { method: currentMethod, amount }]);
      setCurrentAmount('');
    }
  };

  const handleComplete = () => {
    if (remainingAmount === 0) {
      onPaymentComplete(payments);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Paiement Multiple</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">Total: {total.toFixed(2)} €</p>
          <p className="text-md text-gray-600">Restant: {remainingAmount.toFixed(2)} €</p>
        </div>

        {remainingAmount > 0 && (
          <div className="space-y-4 mb-4">
            <div className="flex space-x-2">
              <select
                className="flex-1 border rounded-lg px-3 py-2"
                value={currentMethod}
                onChange={(e) => setCurrentMethod(e.target.value as 'card' | 'cash' | 'check')}
              >
                <option value="card">CB</option>
                <option value="cash">Espèces</option>
                <option value="check">Chèque</option>
              </select>
              <input
                type="number"
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="Montant"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                max={remainingAmount}
                step="0.01"
              />
              <button
                onClick={handleAddPayment}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2 mb-4">
          {payments.map((payment, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{payment.method === 'card' ? 'CB' : payment.method === 'cash' ? 'Espèces' : 'Chèque'}</span>
              <span>{payment.amount.toFixed(2)} €</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleComplete}
          disabled={remainingAmount !== 0}
          className={`w-full py-2 rounded-lg ${
            remainingAmount === 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Valider le paiement
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;