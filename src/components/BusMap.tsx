import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useBusContext } from '../context/BusContext';
import { Bus as BusType } from '../types';

// Need to import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix the icon paths in Leaflet
// This is needed because Leaflet's default marker icons have path issues in many build systems
// We'll create custom markers for our buses
const createBusIcon = (occupancyPercentage: number) => {
  let color = '#10b981'; // green-500
  if (occupancyPercentage >= 80) {
    color = '#ef4444'; // red-500
  } else if (occupancyPercentage >= 50) {
    color = '#f59e0b'; // amber-500
  }

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color}; 
        width: 32px; 
        height: 32px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border-radius: 16px; 
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2V5H3v12h2"></path>
          <path d="M14 17H9"></path>
          <circle cx="6.5" cy="17.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Component to handle map center updates
const MapUpdater = ({ buses }: { buses: BusType[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (buses.length > 0) {
      const lats = buses.map(bus => bus.lat);
      const lngs = buses.map(bus => bus.lng);
      
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      
      map.fitBounds([
        [minLat, minLng],
        [maxLat, maxLng]
      ], { padding: [50, 50] });
    }
  }, [buses, map]);
  
  return null;
};

const BusMap = () => {
  const { buses } = useBusContext();
  const [mapReady, setMapReady] = useState(false);
  
  useEffect(() => {
    // This is needed because Leaflet initialization can have issues
    // with SSR or hot module replacement
    setMapReady(true);
  }, []);

  // Calculate the center of all bus positions or use London as default
  const calculateCenter = () => {
    if (buses.length === 0) return [51.505, -0.09];
    
    const totalLat = buses.reduce((sum, bus) => sum + bus.lat, 0);
    const totalLng = buses.reduce((sum, bus) => sum + bus.lng, 0);
    
    return [totalLat / buses.length, totalLng / buses.length];
  };
  
  const calculateOccupancyPercentage = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-[480px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 p-2">Live Bus Map</h2>
      
      {mapReady && (
        <MapContainer
          center={calculateCenter() as [number, number]}
          zoom={12}
          style={{ height: "420px", borderRadius: "0.5rem", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {buses.map((bus) => {
            const occupancyPercentage = calculateOccupancyPercentage(bus.occupiedSeats, bus.totalSeats);
            
            return (
              <Marker 
                key={bus.id}
                position={[bus.lat, bus.lng]}
                icon={createBusIcon(occupancyPercentage)}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-bold text-blue-700 mb-1">{bus.registration}</div>
                    <div>Total Seats: {bus.totalSeats}</div>
                    <div>Occupied: {bus.occupiedSeats} seats</div>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            occupancyPercentage < 50 ? 'bg-green-500' : 
                            occupancyPercentage < 80 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ width: `${occupancyPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs mt-0.5">{occupancyPercentage}% full</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          <MapUpdater buses={buses} />
        </MapContainer>
      )}
    </div>
  );
};

export default BusMap;