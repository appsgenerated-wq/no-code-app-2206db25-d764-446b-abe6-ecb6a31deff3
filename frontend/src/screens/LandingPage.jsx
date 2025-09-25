import React from 'react';
import { TagIcon, BoltIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img 
          src={product.image?.thumbnail?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-blue-600">{formatter.format(product.price)}</p>
          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">{product.status}</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ onLogin, products, isLoading }) => {
  const features = [
    { name: 'Easy Listing', description: 'Create a product listing in seconds with our simple form.', icon: TagIcon },
    { name: 'Instant Setup', description: 'Your marketplace is live instantly. No complex setup required.', icon: BoltIcon },
    { name: 'Secure Backend', description: 'Powered by Manifest for secure authentication and data storage.', icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-2">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">MarketApp</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin" target="_blank" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Admin Panel</a>
              <button 
                onClick={onLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Login / Sell
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:py-28 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">The Modern Marketplace</span>
                <span className="block text-blue-600">Built for You</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Easily list and sell your products with a secure and fast platform. Powered by Manifest for a seamless backend experience.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button onClick={onLogin} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Start Selling
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Everything you need to start selling</p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                        <p className="mt-5 text-base text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Freshly Listed</h2>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No products available yet. Be the first to sell!</p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} MarketApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
