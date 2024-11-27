import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Store,
  History,
  ShoppingBag
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: ShoppingCart, label: 'Point de Vente', path: '/pos' },
    { icon: Package, label: 'Stock', path: '/inventory' },
    { icon: Users, label: 'Clients', path: '/customers' },
    { icon: Store, label: 'Achats', path: '/purchases' },
    { icon: History, label: 'Historique', path: '/history' },
    { icon: BarChart3, label: 'Rapports', path: '/reports' },
    { icon: ShoppingBag, label: 'E-commerce', path: '/ecommerce' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">MediaTrade Pro</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                isActive ? 'bg-gray-800 text-white border-l-4 border-blue-400' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;