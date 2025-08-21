import { FormData } from '@/types/form/formData';
import { useFlightPrices } from '@/hooks/useFlightPrices';
import React, { useEffect, useState } from 'react'

//Invoice component/price breakdown
//Calculates and displays the total due based on the reservation data stored in localStorage
export default function Bill() {
    // Custom hook to get flight prices
    const { getFlightPrice } = useFlightPrices();
    const [rawData, setRawData] = useState<FormData | null>(null);
    //Retrieves form data stored in localStorage and sets it to local state. Runs only on the client.
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = window.localStorage.getItem('formData');
            setRawData(data ? JSON.parse(data) : null);
        }
    }, []);
    if (!rawData) return null;



    //complete cost calculation
    // Complete cost calculation based on:
    //  - Base flight price per person
    //  - Number of travelers
    //  - Pet fee ($100 each)
    //  - Baggage fee ($50 each)

    const totalBill = () => {

        if (!rawData) return 0;
        const destination = rawData.flight.destination;
        const flightClass = rawData.flight.flightClass;
        const FlightPrice = getFlightPrice(destination, flightClass);
        let total = 0;

        total += rawData.travelers?.numberOfTravelers * FlightPrice;
        if (rawData.travelers?.hasPets) {
            total += rawData.travelers.numberOfPets * 100;
        }
        if (rawData.travelers.hasSuitcases) {
            total += rawData.travelers.numberOfSuitcases * 50;
        }
        return total;
    }

    return (
        <div className='flex flex-col justify-between items-end mt-8'>
            <h2>Total a Pagar:</h2>
            <p>{totalBill()}</p>
        </div>
    )
}
