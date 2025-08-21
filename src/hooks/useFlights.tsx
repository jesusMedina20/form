import { Flight } from '@/types/flights';
import { useEffect, useState } from 'react';
//Custom hook to get flight data from an API

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //Hook that makes a GET request to an external API to obtain information on available flights and handles loading states and data
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
