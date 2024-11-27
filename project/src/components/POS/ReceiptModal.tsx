import React from 'react';
import { X, Printer, FileText, Mail } from 'lucide-react';
import type { Transaction } from '../../types';

interface ReceiptModalProps {
  transaction: Transaction;
  customer?: { firstName: string; lastName: string; email: string };
  onClose: () => void;
  onPrint: () => void;
  onEmail: () => void;
}

const ReceiptModal = ({ transaction, customer, onClose, onPrint, onEmail }: ReceiptModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Options d'impression</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={onPrint}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimer Ticket</span>
          </button>

          <button
            onClick={onPrint}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <FileText className="w-5 h-5" />
            <span>Imprimer Facture A4</span>
          </button>

          {customer?.email && (
            <button
              onClick={onEmail}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Mail className="w-5 h-5" />
              <span>Envoyer par Email</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;