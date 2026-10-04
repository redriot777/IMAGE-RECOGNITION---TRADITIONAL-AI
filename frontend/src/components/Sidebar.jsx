import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Image as ImageIcon, 
  BarChart2, 
  Database, 
  Settings, 
  GitMerge, 
  Target, 
  Info,
  Layers
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/analyze', icon: <Search size={20} />, label: 'Analyze' },
    { to: '/preprocessing', icon: <ImageIcon size={20} />, label: 'Preprocessing' },
    { to: '/features', icon: <BarChart2 size={20} />, label: 'Features' },
    { to: '/knowledge-base', icon: <Database size={20} />, label: 'Knowledge Base' },
    { to: '/rules', icon: <Settings size={20} />, label: 'Rule Engine' },
    { to: '/reasoning', icon: <GitMerge size={20} />, label: 'Reasoning' },
    { to: '/results', icon: <Target size={20} />, label: 'Results' },
    { to: '/batch', icon: <Layers size={20} />, label: 'Batch Analysis' },
    { to: '/about', icon: <Info size={20} />, label: 'About' },
  ];

  return (
    <aside className="sidebar">
      <h2>AI Lab System</h2>
      <nav>
        {navItems.map((item) => (
          <NavLink 
            key={item.to} 
            to={item.to} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
