import { useEffect, useRef } from 'react';
import { useBusContext } from '../context/BusContext';

interface LocationUpdaterProps {
  busId: string;
}

const LocationUpdater = ({ busId }: LocationUpdaterProps) => {
  const { updateBusLocation } = useBusContext();
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const startLocationWatch = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser.');
        return;
      }

      try {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            updateBusLocation(busId, latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } catch (error) {
        console.error('Error starting location watch:', error);
      }
    };

    startLocationWatch();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [busId, updateBusLocation]);

  return null;
};

export default LocationUpdater;