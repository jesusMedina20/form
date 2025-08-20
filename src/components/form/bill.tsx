import { useFlights } from '@/hooks/useFlights';
import { FormData } from '@/types/form/formData';
import React from 'react'

export default function Bill() {
    const rawData = window.localStorage.getItem('formData');
    const { flights, loading } = useFlights();


    if (!rawData) {
        alert('Debe rellenar el formulario en su totalidad');
        return null;
    }
    let data: FormData;

    try {
        data = JSON.parse(rawData);

    } catch (e) {
        alert('Error al leer los datos del formulario');
        return null;
    }

     const getFlightPrice = (
    destination: string,
    flightClass: string
  ): number  => {
    if (!flights) return 0;

    const foundFlight = flights.find(
      (flight) =>
        flight.destination.toLowerCase() === destination.toLowerCase() &&
        flight.class.toLowerCase() === flightClass.toLowerCase()
    );

    return foundFlight ? foundFlight.priceUSD : 0;
  };


    const totalBill = () => {

        if (!data) return 0;
        const FlightPrice = getFlightPrice(data.flight.destination, data.flight.flightClass);
        console.log(FlightPrice, "flight price")

        let total = 0;


        total += data.travelers?.numberOfTravelers * FlightPrice;


        if (data.travelers?.hasPets) {
            total += data.travelers.numberOfPets * 100;
        }
        if (data.travelers.hasSuitcases) {
            total += data.travelers.numberOfSuitcases * 50;
        }
        console.log(total)
        return total;
    }


    return (
        <div>
            <h2>Total a Pagar:</h2>
            <p>{totalBill()}</p>
        </div>
    )
}
