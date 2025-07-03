import { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { MapPin, Plus } from 'lucide-react';

const TerminalForm = () => {
  const { addTerminal } = useBusContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !address.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      // Get coordinates from address using browser's geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          
          addTerminal({
            name: name.trim(),
            address: address.trim(),
            lat,
            lng
          });

          // Reset form
          setName('');
          setAddress('');
          setIsSuccessVisible(true);
          setTimeout(() => setIsSuccessVisible(false), 3000);
        },
        (error) => {
          setError(`Location error: ${error.message}`);
        }
      );
    } catch (error) {
      setError('Failed to add terminal');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-pink-400 mr-2" />
        <h2 className="text-xl font-semibold text-busPink">Add Terminal</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-busPink mb-1">
            Terminal Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
            placeholder="e.g., Central Station"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-busPink mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-busPink rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-busPink focus:border-busPink"
            placeholder="Enter terminal address"
          />
        </div>

        {error && (
          <div className="p-2 text-sm bg-red-50 text-red-500 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {isSuccessVisible && (
          <div className="p-2 text-sm bg-green-50 text-green-600 rounded-md border border-green-200">
            Terminal added successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-400 hover:bg-busWhite hover:text-busPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-busPink transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Terminal
        </button>
      </form>
    </div>
  );
};

export default TerminalForm;