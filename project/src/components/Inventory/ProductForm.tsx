import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../types';

interface ProductFormProps {
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  initialProduct?: Product;
}

const ProductForm = ({ onClose, onSave, initialProduct }: ProductFormProps) => {
  const [product, setProduct] = useState({
    name: initialProduct?.name || '',
    price: initialProduct?.price?.toString() || '',
    condition: initialProduct?.condition || 'new',
    category: initialProduct?.category || '',
    stock: initialProduct?.stock?.toString() || '',
    imageUrl: initialProduct?.imageUrl || '',
    description: initialProduct?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock) || 0,
      condition: product.condition as 'new' | 'used'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialProduct ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">État</label>
              <select
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={product.condition}
                onChange={(e) => setProduct({ ...product, condition: e.target.value })}
                required
              >
                <option value="new">Neuf</option>
                <option value="used">Occasion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                className="mt-1 block w-full border rounded-lg px-3 py-2"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Consoles">Consoles</option>
                <option value="Jeux">Jeux</option>
                <option value="Accessoires">Accessoires</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL de l'image</label>
            <input
              type="url"
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              value={product.imageUrl}
              onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              rows={3}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {initialProduct ? 'Mettre à jour' : 'Ajouter le produit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;