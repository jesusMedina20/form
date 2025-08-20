import { useFlights } from "@/hooks/useFlights";

export function useFlightPrices() {
  const { flights, loading } = useFlights();

  const getFlightPrice = (destination: string, flightClass: string): number => {
    if (!flights) return 0; 
    
    const normalizedDest = destination.trim().toLowerCase();
    const normalizedClass = flightClass.trim().toLowerCase();

    return flights.find(f => 
      f.destination.toLowerCase() === normalizedDest &&
      f.class.toLowerCase() === normalizedClass
    )?.priceUSD || 0;
  };

  return { getFlightPrice };
}
