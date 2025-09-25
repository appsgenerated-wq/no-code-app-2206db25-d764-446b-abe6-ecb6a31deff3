import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './LandingPage';
import DashboardPage from './DashboardPage';
import './index.css';

const manifest = new Manifest();

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const loggedInUser = await manifest.from('users').me();
        setUser(loggedInUser);
        setView('dashboard');
      } catch (error) {
        setUser(null);
        setView('landing');
      }
    };

    checkUser();
    fetchPublicProducts();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProducts();
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      await manifest.login('users', email, password);
      const loggedInUser = await manifest.from('users').me();
      setUser(loggedInUser);
      setView('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setMyProducts([]);
    setView('landing');
  };

  const fetchPublicProducts = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('products').find({
        include: ['seller'],
        sort: { createdAt: 'desc' }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProducts = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('products').find({
        filter: { seller: { id: user.id } },
        sort: { createdAt: 'desc' }
      });
      setMyProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch user products:', error);
    }
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await manifest.from('products').create(productData);
      setMyProducts([newProduct, ...myProducts]);
    } catch (error) {
      console.error('Failed to create product:', error);
      alert(`Failed to create product: ${error.message}`);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await manifest.from('products').delete(productId);
        setMyProducts(myProducts.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert(`Failed to delete product: ${error.message}`);
      }
    }
  };

  if (view === 'landing') {
    return <LandingPage onLogin={() => setView('login')} products={products} isLoading={isLoading} />;
  }

  if (view === 'login') {
    // A simple inline login form for demonstration purposes
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await login(email, password);
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login to Your Account</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" required defaultValue="user@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" required defaultValue="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
               <p className="mt-2 text-xs text-gray-500">Hint: Use user@example.com / password, or create an account in the admin panel.</p>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign In</button>
             <button type="button" onClick={() => setView('landing')} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2">Back to Home</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <DashboardPage 
      user={user} 
      products={myProducts}
      onLogout={logout} 
      onCreateProduct={createProduct}
      onDeleteProduct={deleteProduct}
    />
  );
}

export default App;
