import React from 'react';
import { BusProvider } from './context/BusContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <BusProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </BusProvider>
  );
}

export default App;