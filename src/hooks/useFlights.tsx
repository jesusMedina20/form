import { Flight } from '@/types/flights';
import { useEffect, useState } from 'react';

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json')
      .then(response => response.json())
      .then((data: Flight[]) => {
        setFlights(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  return { flights, loading };
};
