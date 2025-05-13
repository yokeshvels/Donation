import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { Truck, MapPin, Route, Clock, Calendar, Box } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom destination icon
const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Vehicle {
  id: string;
  position: [number, number];
  status: string;
  driver: string;
  route: string;
  eta: string;
}

interface Destination {
  id: string;
  position: [number, number];
  name: string;
  address: string;
  deliveryTime: string;
}

const MapComponent: React.FC<{
  vehicles: Vehicle[];
  destinations: Destination[];
}> = ({ vehicles, destinations }) => {
  const center: [number, number] = [51.505, -0.09];
  
  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {vehicles.map((vehicle) => (
        <Marker 
          key={vehicle.id}
          position={vehicle.position}
          icon={truckIcon}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{vehicle.driver}</h3>
              <p>Route: {vehicle.route}</p>
              <p>ETA: {vehicle.eta}</p>
              <p>Status: {vehicle.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {destinations.map((dest) => (
        <Marker
          key={dest.id}
          position={dest.position}
          icon={destinationIcon}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{dest.name}</h3>
              <p>{dest.address}</p>
              <p>Delivery: {dest.deliveryTime}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const LogisticsPage: React.FC = () => {
  const { theme } = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'v1',
      position: [51.505, -0.09],
      status: 'In Transit',
      driver: 'John Smith',
      route: 'Downtown Route',
      eta: '15 mins'
    },
    {
      id: 'v2',
      position: [51.51, -0.1],
      status: 'Delivering',
      driver: 'Maria Garcia',
      route: 'East Side Route',
      eta: '30 mins'
    }
  ]);
  
  const [destinations] = useState<Destination[]>([
    {
      id: 'd1',
      position: [51.515, -0.09],
      name: 'Community Center',
      address: '123 Main St',
      deliveryTime: '2:00 PM'
    },
    {
      id: 'd2',
      position: [51.505, -0.08],
      name: 'Food Bank',
      address: '456 Oak Ave',
      deliveryTime: '2:30 PM'
    }
  ]);

  // Simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        position: [
          vehicle.position[0] + (Math.random() - 0.5) * 0.001,
          vehicle.position[1] + (Math.random() - 0.5) * 0.001
        ]
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for delivery routes
  const routes = [
    {
      id: 'R001',
      name: 'Downtown Route',
      stops: 4,
      status: 'In Progress',
      eta: '1h 15m',
      driver: 'John Smith',
      items: 12,
    },
    {
      id: 'R002',
      name: 'East Side Delivery',
      stops: 6,
      status: 'Scheduled',
      eta: '3h 30m',
      driver: 'Maria Garcia',
      items: 24,
    },
    {
      id: 'R003',
      name: 'North County Drop-offs',
      stops: 3,
      status: 'Completed',
      eta: '0h 0m',
      driver: 'David Johnson',
      items: 8,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
        }`}>{status}</span>;
      case 'Scheduled':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }`}>{status}</span>;
      case 'Completed':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
        }`}>{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Logistics Management</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Track deliveries in real-time with our interactive map and logistics management system.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="Live Tracking Map" subtitle="Real-time vehicle and delivery locations">
            <MapComponent vehicles={vehicles} destinations={destinations} />
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Vehicles</p>
                <p className="text-lg font-semibold">{vehicles.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deliveries</p>
                <p className="text-lg font-semibold">{destinations.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">On Time</p>
                <p className="text-lg font-semibold">98%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-lg font-semibold">12</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Upcoming Pickups" subtitle="Scheduled donation pickups">
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Winter Clothing Donation</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Today
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>Tuesday, April 16, 2025</p>
                    <p className="text-gray-500">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>123 Main Street, Apt 4B</p>
                    <p className="text-gray-500">Downtown, CA 90210</p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Office Furniture</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    theme === 'dark' ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                  }`}>
                    Tomorrow
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>Wednesday, April 17, 2025</p>
                    <p className="text-gray-500">10:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>456 Business Plaza, Suite 200</p>
                    <p className="text-gray-500">Financial District, CA 90211</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  View All Scheduled Pickups
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card title="Delivery Routes" subtitle="AI-optimized routes for efficient delivery">
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${
            theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Stops
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ETA
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {routes.map((route) => (
                <tr key={route.id} className={`${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Route className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{route.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {route.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(route.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {route.stops} stops
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box size={16} className="mr-2 text-gray-400" />
                      {route.items} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-400" />
                      {route.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LogisticsPage;