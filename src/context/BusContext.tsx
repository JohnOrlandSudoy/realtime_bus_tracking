import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bus, Terminal, Route } from '../types';

interface BusContextType {
  buses: Bus[];
  terminals: Terminal[];
  routes: Route[];
  addBus: (bus: Omit<Bus, 'id'>) => void;
  updateBus: (id: string, data: Partial<Bus>) => void;
  updateOccupiedSeats: (id: string, occupiedSeats: number) => void;
  addTerminal: (terminal: Omit<Terminal, 'id'>) => void;
  updateTerminal: (id: string, data: Partial<Terminal>) => void;
  deleteTerminal: (id: string) => void;
  addRoute: (route: Omit<Route, 'id'>) => void;
  updateRoute: (id: string, data: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
  updateBusLocation: (id: string, lat: number, lng: number) => void;
  searchBuses: (term: string) => Bus[];
}

const BusContext = createContext<BusContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BUSES: 'buses',
  TERMINALS: 'terminals',
  ROUTES: 'routes',
};

export const useBusContext = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error('useBusContext must be used within a BusProvider');
  }
  return context;
};

export const BusProvider = ({ children }: { children: ReactNode }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  // Load initial data from localStorage
  useEffect(() => {
    const storedBuses = localStorage.getItem(STORAGE_KEYS.BUSES);
    const storedTerminals = localStorage.getItem(STORAGE_KEYS.TERMINALS);
    const storedRoutes = localStorage.getItem(STORAGE_KEYS.ROUTES);

    if (storedBuses) setBuses(JSON.parse(storedBuses));
    if (storedTerminals) setTerminals(JSON.parse(storedTerminals));
    if (storedRoutes) setRoutes(JSON.parse(storedRoutes));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUSES, JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TERMINALS, JSON.stringify(terminals));
  }, [terminals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(routes));
  }, [routes]);

  const addBus = (busData: Omit<Bus, 'id'>) => {
    const newBus: Bus = {
      ...busData,
      id: Date.now().toString(),
    };
    setBuses(prev => [...prev, newBus]);
  };

  const updateBus = (id: string, data: Partial<Bus>) => {
    setBuses(prev => prev.map(bus => 
      bus.id === id ? { ...bus, ...data } : bus
    ));
  };

  const updateOccupiedSeats = (id: string, occupiedSeats: number) => {
    setBuses(prev => prev.map(bus => 
      bus.id === id ? { ...bus, occupiedSeats } : bus
    ));
  };

  const addTerminal = (terminal: Omit<Terminal, 'id'>) => {
    const newTerminal: Terminal = {
      ...terminal,
      id: Date.now().toString(),
    };
    setTerminals(prev => [...prev, newTerminal]);
  };

  const updateTerminal = (id: string, data: Partial<Terminal>) => {
    setTerminals(prev => prev.map(terminal => 
      terminal.id === id ? { ...terminal, ...data } : terminal
    ));
  };

  const deleteTerminal = (id: string) => {
    setTerminals(prev => prev.filter(terminal => terminal.id !== id));
  };

  const addRoute = (route: Omit<Route, 'id'>) => {
    const newRoute: Route = {
      ...route,
      id: Date.now().toString(),
    };
    setRoutes(prev => [...prev, newRoute]);
  };

  const updateRoute = (id: string, data: Partial<Route>) => {
    setRoutes(prev => prev.map(route => 
      route.id === id ? { ...route, ...data } : route
    ));
  };

  const deleteRoute = (id: string) => {
    setRoutes(prev => prev.filter(route => route.id !== id));
  };

  const updateBusLocation = (id: string, lat: number, lng: number) => {
    setBuses(prev => prev.map(bus => 
      bus.id === id ? { ...bus, lat, lng } : bus
    ));
  };

  const searchBuses = (term: string): Bus[] => {
    if (!term.trim()) return buses;
    const lowercasedTerm = term.toLowerCase();
    return buses.filter((bus) => 
      bus.registration.toLowerCase().includes(lowercasedTerm)
    );
  };

  return (
    <BusContext.Provider value={{
      buses,
      terminals,
      routes,
      addBus,
      updateBus,
      updateOccupiedSeats,
      addTerminal,
      updateTerminal,
      deleteTerminal,
      addRoute,
      updateRoute,
      deleteRoute,
      updateBusLocation,
      searchBuses
    }}>
      {children}
    </BusContext.Provider>
  );
};