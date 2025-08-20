import { FormData } from '@/types/form/formData';
import { useFlightPrices } from '@/hooks/useFlightPrices';
import React from 'react'

export default function Bill() {
      const { getFlightPrice } = useFlightPrices();
    const rawData = window.localStorage.getItem('formData');



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




    const totalBill = () => {

        if (!data) return 0;
        const destination = data.flight.destination;
        const flightClass = data.flight.flightClass;
        const FlightPrice = getFlightPrice(destination, flightClass);
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
        <div className='flex flex-col justify-between items-end mt-8'>
            <h2>Total a Pagar:</h2>
            <p>{totalBill()}</p>
        </div>
    )
}
