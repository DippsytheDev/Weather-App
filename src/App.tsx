import React, { useState } from 'react';

export type City = {
  name: string;
  coordinates: [number, number];
};
import Sidebar from './components/Sidebar';
import MapView from './components/MapView'; // assuming this is your map component

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>({
    name: 'New York',
    coordinates: [-74.006, 40.7128], // default coordinates for New York
  });

  const cities: City[] = [
    { name: 'New York', coordinates: [-74.006, 40.7128] },
    { name: 'Tokyo', coordinates: [139.6917, 35.6895] },
    { name: 'Lagos', coordinates: [3.3792, 6.5244] },
    { name: 'Sydney', coordinates: [151.2093, -33.8688] },
    { name: 'Paris', coordinates: [2.3522, 48.8566] },
    { name: 'Cairo', coordinates: [31.2357, 30.0444] },
    { name: 'Rio de Janeiro', coordinates: [-43.1729, -22.9068] },
    { name: 'Cape Town', coordinates: [18.4241, -33.9249] },
    { name: 'Moscow', coordinates: [37.6173, 55.7558] },
    { name: 'Toronto', coordinates: [-79.3832, 43.6532] },
    { name: 'Dubai', coordinates: [55.2708, 25.2048] },
    { name: 'Singapore', coordinates: [103.8198, 1.3521] },
    { name: 'Berlin', coordinates: [13.405, 52.52] },
    { name: 'Madrid', coordinates: [-3.7038, 40.4168] },
    { name: 'Chicago', coordinates: [-87.6298, 41.8781] },
    { name: 'Istanbul', coordinates: [28.9784, 41.0082] },
    { name: 'Seoul', coordinates: [126.978, 37.5665] },
    { name: 'Los Angeles', coordinates: [-118.2437, 34.0522] },
    { name: 'Nairobi', coordinates: [36.8219, -1.2921] },
    { name: 'Buenos Aires', coordinates: [-58.3816, -34.6037] },
  ];

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setSidebarOpen(false); // close sidebar after selecting
  };

  return (
    <div className="flex h-screen relative">
      {/* Hamburger Button (mobile only) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 shadow rounded"
      >
        ☰
      </button>

      <Sidebar
        isOpen={sidebarOpen}
        cities={cities}
        onSelectCity={handleSelectCity}
      />

      <main className="flex-1">
        <MapView selectedCity={selectedCity} />
      </main>
    </div>
  );
};

export default App;