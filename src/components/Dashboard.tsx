import BusRegistrationForm from './BusRegistrationForm';
import BusList from './BusList';
import BusMap from './BusMap';
import TerminalForm from './TerminalForm';
import RouteForm from './RouteForm';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <BusRegistrationForm />
            <TerminalForm />
            <RouteForm />
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">System Status</span>
                    <span className="text-sm font-medium text-pink-600">Online</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-pink-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Data Refresh</span>
                    <span className="text-sm font-medium text-blue-600">Live</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2 animate-ping"></div>
                    <span className="text-xs text-gray-500">Updating in real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <BusMap />
          <BusList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;