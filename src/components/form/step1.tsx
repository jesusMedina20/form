'use client';
import { useFlights } from "@/hooks/useFlights";
import { FlightInfo } from "@/types/form/step1";
import Link from "next/link";
import { useState } from "react";

//Component that collects basic flight information: destination, dates and class

export default function Step1({ onNext, data, updateData }: { onNext: () => void, data: FlightInfo, updateData: (data: FlightInfo) => void }) {
    // Custom hook to get available flight data
    const { flights, loading } = useFlights();

    // Status for the minimum allowed date (today)
    const [minDate, setMinDate] = useState<string>('');
    useState(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    });

    // Handles form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };
    // Handles changes to form fields
    const handleChange = (field: keyof FlightInfo, value: string) => {
        updateData({ ...data, [field]: value });
    };
    // Get destinations
    const destinations = Array.from(new Set(flights.map(flight => flight.destination)));
    //Get Flight Class
    const flightClasses = Array.from(new Set(flights.map(flight => flight.class)));

    return (
        <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-2">
            <form
                className="p-8"
                onSubmit={handleSubmit}
            >
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold ">Formulario del viajero</h2>
                        <p className="mt-1 text-sm/6 ">
                            Rellena el formulario para reservar tu viaje. Asegúrate de proporcionar información precisa para evitar inconvenientes.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="destinations"
                                    className="block text-sm/6 font-medium "
                                >
                                    Destinations
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        list="destinations"
                                        pattern={destinations.join("|")}
                                        required
                                        value={data.destination}
                                        onChange={(e) => handleChange('destination', e.target.value)}
                                        placeholder="Elige un destino"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                    />
                                    <datalist id="destinations">
                                        {destinations.map(dest => (
                                            <option key={dest} value={dest} />
                                        ))}
                                    </datalist>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="start-date"
                                    className="block text-sm/6 font-medium "
                                >
                                    Fecha de salida
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        required

                                        value={data.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        min={minDate}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="return-date"
                                    className="block text-sm/6 font-medium "
                                >
                                    Fecha de regreso
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        required

                                        value={data.returnDate}
                                        onChange={(e) => handleChange('returnDate', e.target.value)}
                                        min={data.startDate || minDate}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="flight-class"
                                    className="block text-sm/6 font-medium "
                                >
                                    Clase de vuelo
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        required
                                        value={data.flightClass}
                                        onChange={(e) => handleChange('flightClass', e.target.value)}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-8 pl-3 text-base sm:text-sm/6 bg-black/6 text-black border border-gray-300 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-400 dark:bg-white/5 dark:text-white dark:border-transparent dark:outline-white/10 dark:focus:outline-indigo-500 dark:*:bg-gray-800"
                                    >

                                        {flightClasses.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link
                        href="/"
                    >
                        Back to Home
                    </Link>
                    <button type="submit" className="primary-button">
                        Next
                    </button>
                </div>
            </form>
        </div >
    );
}
