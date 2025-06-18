import React, { useState } from 'react';
import type { City } from '../App.tsx'; // Adjust the path if necessary

interface SidebarProps {
    isOpen: boolean;
    cities: City[];
    onSelectCity: (city: City) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ isOpen, cities, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:relative md:translate-x-0 md:w-60 md:block`}
    >
      <div className="p-4 border-b font-bold text-lg">Cities</div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full px-3 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* City List */}
      <ul className="overflow-y-auto max-h-full p-4 space-y-2">
        {filteredCities.map((city) => (
          <li
            key={city.name}
            onClick={() => onSelectCity(city)}
            className="cursor-pointer hover:text-blue-500"
          >
            {city.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;