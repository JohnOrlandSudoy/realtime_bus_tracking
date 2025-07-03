import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusProvider } from './context/BusContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import { LogOut } from 'lucide-react';

const AppContent = () => {
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    console.log('🔄 App: Starting sign out...');
    try {
      await signOut();
      console.log('✅ App: Sign out completed');
    } catch (error) {
      console.error('❌ App: Error signing out:', error);
    }
  };

  console.log('📊 App: Current state - user:', !!user, 'loading:', loading);

  if (loading) {
    console.log('⏳ App: Showing loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading BusTracker...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🚪 App: No user, showing login page');
    return <LoginPage />;
  }

  console.log('🏠 App: User authenticated, showing dashboard');
  return (
    <BusProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Dashboard />
        </main>
        <Footer />
        
        {/* Logout Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="bg-pink-400 hover:bg-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </BusProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;