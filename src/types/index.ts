export interface Bus {
  id: string;
  registration: string;
  totalSeats: number;
  occupiedSeats: number;
  lat: number;
  lng: number;
  terminalId: string | null;
  routeId: string | null;
  isActive: boolean;
}

export interface Terminal {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface Route {
  id: string;
  name: string;
  startTerminalId: string;
  endTerminalId: string;
  stops: RouteStop[];
}

export interface RouteStop {
  lat: number;
  lng: number;
  name: string;
  order: number;
}