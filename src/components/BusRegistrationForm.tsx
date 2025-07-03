import { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { Bus as BusIcon, PlusCircle } from 'lucide-react';

const BusRegistrationForm = () => {
  const { addBus, terminals, routes } = useBusContext();
  const [registration, setRegistration] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [terminalId, setTerminalId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [error, setError] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registration.trim()) {
      setError('Registration number is required');
      return;
    }
    
    const parsedSeats = parseInt(totalSeats, 10);
    if (isNaN(parsedSeats) || parsedSeats <= 0) {
      setError('Total seats must be a positive number');
      return;
    }
    
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newBus = {
          registration: registration.toUpperCase(),
          totalSeats: parsedSeats,
          occupiedSeats: 0,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          terminalId: terminalId || null,
          routeId: routeId || null,
          isActive: false
        };
        
        addBus(newBus);
        
        setRegistration('');
        setTotalSeats('');
        setTerminalId('');
        setRouteId('');
        
        setIsSuccessVisible(true);
        setTimeout(() => setIsSuccessVisible(false), 3000);
      },
      (error) => {
        setError(`Location error: ${error.message}`);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BusIcon className="h-6 w-6 text-pink-400 mr-2" />
        <h2 className="text-xl font-semibold text-busPink">Register New Bus</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="registration" className="block text-sm font-medium text-busPink mb-1">
            Registration Number
          </label>
          <input
            type="text"
            id="registration"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
            placeholder="e.g., BUS-001"
          />
        </div>
        
        <div>
          <label htmlFor="totalSeats" className="block text-sm font-medium text-busPink mb-1">
            Total Seats
          </label>
          <input
            type="number"
            id="totalSeats"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
            placeholder="e.g., 48"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="terminal" className="block text-sm font-medium text-busPink mb-1">
            Terminal
          </label>
          <select
            id="terminal"
            value={terminalId}
            onChange={(e) => setTerminalId(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
          >
            <option value="">Select terminal</option>
            {terminals.map(terminal => (
              <option key={terminal.id} value={terminal.id}>
                {terminal.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="route" className="block text-sm font-medium text-busPink mb-1">
            Route
          </label>
          <select
            id="route"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
          >
            <option value="">Select route</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        
        {error && (
          <div className="p-2 text-sm bg-red-50 text-red-500 rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        {isSuccessVisible && (
          <div className="p-2 text-sm bg-green-50 text-green-600 rounded-md border border-green-200">
            Bus successfully registered!
          </div>
        )}
        
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-400 hover:bg-busWhite hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-colors duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Register Bus
        </button>
      </form>
    </div>
  );
};

export default BusRegistrationForm;