import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CreateProductForm = ({ onCreateProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Please fill in all required fields and select an image.');
      return;
    }
    await onCreateProduct({ name, description, price: parseFloat(price), image });
    setName('');
    setDescription('');
    setPrice('');
    setImage(null);
    e.target.reset(); // Reset file input
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (USD)</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" step="0.01" min="0" required />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" rows="3"></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input type="file" id="image" onChange={e => setImage(e.target.files[0])} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
        </div>
        <div className="text-right">
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            List Product
          </button>
        </div>
      </form>
    </div>
  );
};

const DashboardPage = ({ user, products, onLogout, onCreateProduct, onDeleteProduct }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.name}!</h1>
            <div className="flex items-center space-x-4">
              <a href="/admin" target="_blank" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Admin Panel</a>
              <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CreateProductForm onCreateProduct={onCreateProduct} />

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Product Listings</h2>
            {products.length === 0 ? (
              <p className="text-center text-gray-500 py-8">You haven't listed any products yet. Use the form above to get started!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden flex flex-col">
                    <img src={product.image?.thumbnail?.url || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-48 object-cover"/>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 flex-grow">{product.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-blue-700">{formatter.format(product.price)}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.status === 'For Sale' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{product.status}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 text-right">
                      <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
