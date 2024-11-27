import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, CreditCard as Check, User, Printer } from 'lucide-react';
import type { Product, Transaction } from '../../types';
import PaymentModal from '../../components/POS/PaymentModal';
import CustomerModal from '../../components/POS/CustomerModal';
import ReceiptModal from '../../components/POS/ReceiptModal';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PlayStation 5',
    price: 499.99,
    condition: 'new',
    category: 'Consoles',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300',
    description: 'Console PlayStation 5 Standard Edition'
  },
  {
    id: '2',
    name: 'Xbox Series X',
    price: 499.99,
    condition: 'new',
    category: 'Consoles',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300',
    description: 'Console Xbox Series X'
  }
];

const POS = () => {
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  const addToCart = (product: Product) => {
    setCart(current => {
      const existing = current.find(item => item.product.id === product.id);
      if (existing) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(current =>
      current.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(current => current.filter(item => item.product.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const filteredProducts = MOCK_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaymentComplete = (payments: Array<{ method: 'card' | 'cash' | 'check'; amount: number }>) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: new Date(),
      products: cart,
      total,
      paymentMethod: payments.length > 1 ? 'card' : payments[0].method, // Simplified for now
    };
    setCurrentTransaction(transaction);
    setShowReceiptModal(true);
  };

  const handlePrintReceipt = () => {
    // Implement printing logic
    console.log('Printing receipt...');
  };

  const handleEmailReceipt = () => {
    // Implement email logic
    console.log('Sending email...');
  };

  const resetTransaction = () => {
    setCart([]);
    setCurrentCustomer(null);
    setCurrentTransaction(null);
    setShowReceiptModal(false);
  };

  return (
    <div className="flex h-[calc(100vh-88px)]">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {product.condition === 'new' ? 'Neuf' : 'Occasion'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white border-l">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Panier</h2>
            <button
              onClick={() => setShowCustomerModal(true)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <User className="w-5 h-5 mr-1" />
              {currentCustomer ? `${currentCustomer.firstName} ${currentCustomer.lastName}` : 'Ajouter client'}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-350px)]">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">{item.product.price.toFixed(2)} €</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 hover:bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => handlePaymentComplete([{ method: 'card', amount: total }])}
                className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                CB
              </button>
              <button
                onClick={() => handlePaymentComplete([{ method: 'cash', amount: total }])}
                className="flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Banknote className="w-5 h-5 mr-2" />
                Espèces
              </button>
              <button
                onClick={() => handlePaymentComplete([{ method: 'check', amount: total }])}
                className="flex items-center justify-center p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Check className="w-5 h-5 mr-2" />
                Chèque
              </button>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center justify-center p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Printer className="w-5 h-5 mr-2" />
                Div
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {showCustomerModal && (
        <CustomerModal
          onClose={() => setShowCustomerModal(false)}
          onSave={(customer) => {
            setCurrentCustomer(customer as { firstName: string; lastName: string; email: string });
            setShowCustomerModal(false);
          }}
        />
      )}

      {showReceiptModal && currentTransaction && (
        <ReceiptModal
          transaction={currentTransaction}
          customer={currentCustomer}
          onClose={resetTransaction}
          onPrint={handlePrintReceipt}
          onEmail={handleEmailReceipt}
        />
      )}
    </div>
  );
};

export default POS;