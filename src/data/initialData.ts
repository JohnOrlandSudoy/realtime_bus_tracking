import { Bus } from '../types';

// Generate a slightly randomized coordinate based on a center point
// const randomizeLocation = (center: [number, number], variance: number = 0.01): [number, number] => {
//   return [
//     center[0] + (Math.random() - 0.5) * variance,
//     center[1] + (Math.random() - 0.5) * variance
//   ];
// };

// London coordinates as center point
const LONDON_CENTER: [number, number] = [51.505, -0.09];

// Initial mock data
export const initialBuses: Bus[] = [
  {
    id: '1',
    registration: 'BUS-001',
    totalSeats: 48,
    occupiedSeats: 32,
    lat: LONDON_CENTER[0] + (Math.random() - 0.5) * 0.05,
    lng: LONDON_CENTER[1] + (Math.random() - 0.5) * 0.05,
    terminalId: null,
    routeId: null,
    isActive: true
  },
  {
    id: '2',
    registration: 'BUS-002',
    totalSeats: 36,
    occupiedSeats: 28,
    lat: LONDON_CENTER[0] + (Math.random() - 0.5) * 0.05,
    lng: LONDON_CENTER[1] + (Math.random() - 0.5) * 0.05,
    terminalId: null,
    routeId: null,
    isActive: true
  },
  {
    id: '3',
    registration: 'BUS-003',
    totalSeats: 54,
    occupiedSeats: 41,
    lat: LONDON_CENTER[0] + (Math.random() - 0.5) * 0.05,
    lng: LONDON_CENTER[1] + (Math.random() - 0.5) * 0.05,
    terminalId: null,
    routeId: null,
    isActive: true
  }
];