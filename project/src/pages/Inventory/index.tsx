import React, { useState } from 'react';
import { Search, Plus, Package, AlertTriangle } from 'lucide-react';
import type { Product } from '../../types';
import ProductForm from '../../components/Inventory/ProductForm';

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
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300',
    description: 'Console Xbox Series X'
  },
  {
    id: '3',
    name: 'Nintendo Switch OLED',
    price: 349.99,
    condition: 'used',
    category: 'Consoles',
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300',
    description: 'Console Nintendo Switch OLED - Occasion'
  }
];

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId = {
      ...newProduct,
      id: Date.now().toString()
    };
    setProducts([...products, productWithId]);
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleUpdateProduct = (updatedProduct: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...updatedProduct, id: p.id } : p
      ));
      setEditingProduct(undefined);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Stocks</h1>
        <button 
          onClick={() => {
            setEditingProduct(undefined);
            setShowProductForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Produit
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          <option value="Consoles">Consoles</option>
          <option value="Jeux">Jeux</option>
          <option value="Accessoires">Accessoires</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {product.condition === 'new' ? 'Neuf' : 'Occasion'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.price.toFixed(2)} €</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package className={`w-5 h-5 mr-2 ${
                      product.stock < 5 ? 'text-red-500' : 'text-green-500'
                    }`} />
                    <span className="text-sm text-gray-900">{product.stock}</span>
                    {product.stock < 5 && (
                      <AlertTriangle className="w-5 h-5 ml-2 text-amber-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button 
                    onClick={() => handleEditProduct(product.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showProductForm && (
        <ProductForm
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(undefined);
          }}
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          initialProduct={editingProduct}
        />
      )}
    </div>
  );
};

export default Inventory;