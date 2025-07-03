import { Bus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-pink-400 text-busWhite shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bus className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">BusTracker</h1>
            <p className="text-sm text-busYellow text-white">Fleet Monitoring System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-busBlue bg-opacity-80 rounded-full px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-white">Live Tracking</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;