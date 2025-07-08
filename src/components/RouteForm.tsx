import { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { Route as RouteIcon, Plus } from 'lucide-react';
import type { RouteStop } from '../types';

const RouteForm = () => {
  const { addRoute, terminals } = useBusContext();
  const [name, setName] = useState('');
  const [startTerminalId, setStartTerminalId] = useState('');
  const [endTerminalId, setEndTerminalId] = useState('');
  const [stops, setStops] = useState<RouteStop[]>([]);
  const [error, setError] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !startTerminalId || !endTerminalId) {
      setError('Route name and terminals are required');
      return;
    }

    try {
      addRoute({
        name: name.trim(),
        startTerminalId,
        endTerminalId,
        stops
      });

      // Reset form
      setName('');
      setStartTerminalId('');
      setEndTerminalId('');
      setStops([]);
      setIsSuccessVisible(true);
      setTimeout(() => setIsSuccessVisible(false), 3000);
    } catch {
      setError('Failed to add route');
    }
  };

  const addStop = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newStop: RouteStop = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: `Stop ${stops.length + 1}`,
          order: stops.length + 1
        };
        setStops([...stops, newStop]);
      },
      (error) => {
        setError(`Location error: ${error.message}`);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <RouteIcon className="h-6 w-6 text-pink-400 mr-2" />
        <h2 className="text-xl font-semibold text-busPink">Add Route</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-busPink mb-1">
            Route Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
            placeholder="e.g., Central - North Route"
          />
        </div>

        <div>
          <label htmlFor="startTerminal" className="block text-sm font-medium text-busPink mb-1">
            Start Terminal
          </label>
          <select
            id="startTerminal"
            value={startTerminalId}
            onChange={(e) => setStartTerminalId(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
          >
            <option value="">Select start terminal</option>
            {terminals.map(terminal => (
              <option key={terminal.id} value={terminal.id}>
                {terminal.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="endTerminal" className="block text-sm font-medium text-busPink mb-1">
            End Terminal
          </label>
          <select
            id="endTerminal"
            value={endTerminalId}
            onChange={(e) => setEndTerminalId(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
          >
            <option value="">Select end terminal</option>
            {terminals.map(terminal => (
              <option key={terminal.id} value={terminal.id}>
                {terminal.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-busPink mb-1">
            Stops ({stops.length})
          </label>
          <button
            type="button"
            onClick={addStop}
            className="w-full flex justify-center items-center py-2 px-4 border border-busPink rounded-md shadow-sm text-sm font-medium text-busPink bg-white hover:bg-busPink hover:text-busWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-busPink transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stop at Current Location
          </button>
        </div>

        {error && (
          <div className="p-2 text-sm bg-red-50 text-red-500 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {isSuccessVisible && (
          <div className="p-2 text-sm bg-green-50 text-green-600 rounded-md border border-green-200">
            Route added successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-400 hover:bg-busWhite hover:text-busPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-busPink transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Route
        </button>
      </form>
    </div>
  );
};

export default RouteForm;