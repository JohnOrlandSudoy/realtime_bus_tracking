import { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { Bus as BusIcon, Search, MapPin } from 'lucide-react';

const BusList = () => {
  const { buses, updateOccupiedSeats, searchBuses } = useBusContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const filteredBuses = searchTerm ? searchBuses(searchTerm) : buses;
  
  const handleOccupiedSeatsChange = (bus: { id: string; totalSeats: number }, value: string) => {
    const seats = Math.min(Math.max(0, parseInt(value) || 0), bus.totalSeats);
    updateOccupiedSeats(bus.id, seats);
  };
  
  const calculateOccupancyPercentage = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };
  
  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BusIcon className="h-6 w-6 text-pink-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Bus Fleet</h2>
          </div>
          <span className="text-sm text-gray-500">Total: {buses.length}</span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[480px]">
        {filteredBuses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No buses match your search.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuses.map((bus) => {
                const occupancyPercentage = calculateOccupancyPercentage(bus.occupiedSeats, bus.totalSeats);
                const occupancyColorClass = getOccupancyColor(occupancyPercentage);
                
                return (
                  <tr key={bus.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bus.registration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bus.totalSeats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${occupancyColorClass}`} 
                            style={{ width: `${occupancyPercentage}%` }}
                          ></div>
                        </div>
                        <span className="flex-shrink-0">
                          {bus.occupiedSeats}/{bus.totalSeats}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span>
                          {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === bus.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max={bus.totalSeats}
                            value={bus.occupiedSeats}
                            onChange={(e) => handleOccupiedSeatsChange(bus, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingId(bus.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Update Seats
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BusList;