'use client'
import Bill from '@/components/form/bill';
import { FormData } from '@/types/form/formData';
import { useFlightPrices } from '@/hooks/useFlightPrices';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
//The component displays a summary of the reservation data, with the option to confirm.

const FormSummary = () => {
    const [rawData, setRawData] = useState<FormData | null>(null);
    // Custom hook to get flight prices
    const { getFlightPrice } = useFlightPrices();
    const router = useRouter();

    // State to store form data from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = window.localStorage.getItem('formData');
            setRawData(data ? JSON.parse(data) : null);
        }
    }, []);
    if (!rawData) return null;
    

    const destination = rawData.flight.destination;
    const flightClass = rawData.flight.flightClass;
// Calculation of the base flight price per person
    const FlightPrice = getFlightPrice(destination, flightClass);
    const handleSubmit = () => {
        toast.success('Se ha realizado la reserva correctamente');
        setTimeout(() => {
            router.push('/');
        }, 1500);
    };
    return (
        <div className='min-h-screen p-8 md:p-16'>
            <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-8">
                <h2 className="md:text-3xl text-base/7 font-semibold mb-8 text-center">Resumen de tu Reserva</h2>
                <div className="space-y-8 block w-full">
                    <div className="border-b border-white/10 pb-8">
                        <h3 className="text-sm/6 font-medium mb-4">Información de Vuelo</h3>
                        <div className="space-y-2 text-sm/6">
                            <p><span className="font-medium">Destino:</span> {rawData?.flight.destination}</p>
                            <p><span className="font-medium">Fecha de salida:</span> {rawData?.flight.startDate}</p>
                            <p><span className="font-medium">Fecha de regreso:</span> {rawData?.flight.returnDate}</p>
                            <p><span className="font-medium">Clase:</span> {rawData?.flight.flightClass}</p>
                            <p className='flex flex-col justify-between items-end'>Costo del boleto por persona:{FlightPrice}$</p>

                        </div>
                    </div>

                    <div className="border-b border-white/10 pb-8">
                        <div className="space-y-4 text-sm/6">
                            <p><span className="font-medium">Número de viajeros:</span> {rawData.travelers.numberOfTravelers}</p>
                            <p className='flex flex-col justify-between items-end'>Costo total de los boletos:{FlightPrice * rawData.travelers.numberOfTravelers}$</p>
                            {rawData.travelers.travelers.map((traveler, index) => (
                                <div key={index} className="border-t border-white/10 pt-4 mb-4">
                                    <h3 className="font-medium mb-4 ">Viajero {index + 1}</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nombre completo:</span> {traveler.fullName}</p>
                                        <p><span className="font-medium">Fecha de nacimiento:</span> {traveler.birthdate}</p>
                                        <p><span className="font-medium">Edad:</span> {new Date().getFullYear() - new Date(traveler.birthdate).getFullYear()} años</p>
                                        <p><span className="font-medium">Documento:</span> {traveler.documentType} - {traveler.documentNumber}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-b border-white/10 pb-4">

                        <div className="space-y-2 text-sm/6">


                            {rawData.travelers.hasPets && (
                                <>
                                    <p><span className="font-medium">Mascotas costo por mascotas:</span> 100$ c/u</p>
                                    <p><span className="font-medium">Número de mascotas:</span> {rawData.travelers.numberOfPets}</p>
                                    <p className='flex flex-col justify-between items-end'>total por mascotas:{100 * rawData.travelers.numberOfPets}$</p>
                                </>
                            )}
                            {rawData.travelers.hasSuitcases && (
                                <>
                                    <p><span className="font-medium">Maletas costo por maletas:</span> 50$ c/u</p>
                                    <p><span className="font-medium">Número de maletas:</span> {rawData.travelers.numberOfSuitcases}</p>
                                    <p className='flex flex-col justify-between items-end'>total por maletas:{50 * rawData.travelers.numberOfSuitcases}$</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="border-b border-white/10 pb-4">
                        {(rawData.services.hasInsurance || rawData.services.hasPreferentialSeat || rawData.services.requiresSpecialAssistance) && (
                            <h3 className="text-sm/6 font-medium mb-4">Servicios Adicionales</h3>
                        )}
                        <div className="space-y-2 text-sm/6">
                            {rawData.services.hasInsurance && (

                                <>
                                    <p><span className="font-medium">Seguro de viaje:</span> {rawData.services.hasInsurance ? 'Sí' : 'No'}</p>

                                </>
                            )}
                            {rawData.services.hasPreferentialSeat && (

                                <>
                                    <p><span className="font-medium">Asientos preferenciales:</span> {rawData.services.hasPreferentialSeat ? 'Sí' : 'No'}</p>

                                </>
                            )}
                            {rawData.services.requiresSpecialAssistance && (

                                <>
                                    <p><span className="font-medium">¿Requiere asistencia especial?:</span> {rawData.services.requiresSpecialAssistance ? 'Sí' : 'No'}</p>
                                    <p><span className="font-medium">Descripción asistencia especial:</span> {rawData.services.specialAssistanceDescription}</p>
                                </>
                            )}


                        </div>
                        <Bill />
                    </div>

                    <div className="pt-6">
                        <button className="primary-button w-full" onClick={handleSubmit}>
                            Confirmar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormSummary;