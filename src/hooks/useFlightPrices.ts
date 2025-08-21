import { useFlights } from "@/hooks/useFlights";
//Custom hook to get flight prices
export function useFlightPrices() {
  const { flights, loading } = useFlights();
  
// * @description Searches for and returns the price of a flight based on destination and class
// * @param {string} destination - Flight destination (e.g., "New York")
// * @param {string} flightClass - Flight class (e.g., "Economy", "Business")
// * @returns {number} Price in USD for the flight, or 0 if not found

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
