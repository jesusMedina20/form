'use client'
import Bill from '@/components/form/bill';
import { FormData } from '@/types/form/formData';
import React from 'react'

export default function formSummary() {
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

    return (
        <div className='min-h-screen p-8 md:p-16'>
            <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-8">
                <h2 className="text-base/7 font-semibold mb-8">Resumen de tu Reserva</h2>
                <div className="space-y-8 block w-full">
                    <div className="border-b border-white/10 pb-8">
                        <h3 className="text-sm/6 font-medium mb-4">Información de Vuelo</h3>
                        <div className="space-y-2 text-sm/6">
                            <p><span className="font-medium">Destino:</span> {data?.flight.destination}</p>
                            <p><span className="font-medium">Fecha de salida:</span> {data?.flight.startDate}</p>
                            <p><span className="font-medium">Fecha de regreso:</span> {data?.flight.returnDate}</p>
                            <p><span className="font-medium">Clase:</span> {data?.flight.flightClass}</p>
                        </div>
                    </div>

                    <div className="border-b border-white/10 pb-8">
                        <h3 className="text-sm/6 font-medium mb-4">Viajeros</h3>
                        <div className="space-y-4 text-sm/6">
                            <p><span className="font-medium">Número de viajeros:</span> {data.travelers.numberOfTravelers}</p>
                            {data.travelers.travelers.map((traveler, index) => (
                                <div key={index} className="border-t border-white/10 pt-4">
                                    <h4 className="font-medium mb-2">Viajero {index + 1}</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nombre:</span> {traveler.fullName}</p>
                                        <p><span className="font-medium">Fecha de nacimiento:</span> {traveler.birthdate}</p>
                                        <p><span className="font-medium">Documento:</span> {traveler.documentType} - {traveler.documentNumber}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-2 text-sm/6">
                                <p><span className="font-medium">Mascotas:</span> {data.travelers.hasPets ? 'Sí' : 'No'}</p>
                                <p><span className="font-medium">Número de mascotas:</span> {data.travelers.numberOfPets}</p>
                                <p><span className="font-medium">Maletas:</span> {data.travelers.hasSuitcases ? 'Sí' : 'No'}</p>
                                <p><span className="font-medium">Número de maletas:</span> {data.travelers.numberOfSuitcases}</p>
                            </div>
                        </div>
                    </div>


                    <div className="border-b border-white/10 pb-8">
                        <h3 className="text-sm/6 font-medium mb-4">Servicios Adicionales</h3>
                        <div className="space-y-2 text-sm/6">
                            <p><span className="font-medium">Seguro de viaje:</span> {data.services.hasInsurance ? 'Sí' : 'No'}</p>
                            <p><span className="font-medium">Asientos preferenciales:</span> {data.services.hasPreferentialSeat ? 'Sí' : 'No'}</p>
                            <p><span className="font-medium">¿Requiere asistencia especial?:</span> {data.services.requiresSpecialAssistance ? 'Sí' : 'No'}</p>
                            {data.services.requiresSpecialAssistance && (
                                <p><span className="font-medium">Descripción asistencia especial:</span> {data.services.specialAssistanceDescription}</p>
                            )}
                            <p><span className="font-medium">Asistencia especial:</span> {data.services.requiresSpecialAssistance ? 'Sí' : 'No'}</p>
                            {data.services.requiresSpecialAssistance && data.services.specialAssistanceDescription && (
                                <p><span className="font-medium">Descripción:</span> {data.services.specialAssistanceDescription}</p>
                            )}
                        </div>
                        <Bill/>
                    </div>

                    <div className="pt-6">
                        <button className="primary-button w-full">
                            Confirmar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
