'use client'
import { useTravelers } from '@/hooks/useTravelers';
import SwitchInput from '../inputs/switch';
import { useState } from 'react';

export default function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
    const { numberOfTravelers, handleNumberOfTravelersChange } = useTravelers();
    const [petChecked, setPetChecked] = useState(false);
    const [suitcasesChecked, setSuitcasesChecked] = useState(false);

    return (
        <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-2">
            <form className="p-8 ">
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold ">Formulario del viajero</h2>
                        <p className="mt-1 text-sm/6 ">
                            Rellena el formulario para reservar tu viaje. Asegúrate de proporcionar información precisa para evitar inconvenientes.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="number-of-travelers" className="block text-sm/6 font-medium">
                                    Número de viajeros
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        id="number-of-travelers"
                                        name="number-of-travelers"
                                        value={numberOfTravelers}
                                        onChange={(e) => handleNumberOfTravelersChange(e.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                        placeholder="Ingresa un número entre 1 y 10"
                                    />
                                </div>

                                {numberOfTravelers !== '' && Array.from({ length: Number(numberOfTravelers) }, (_, index) => (
                                    <div key={index} className="mt-6 border-t border-gray-200 pt-6">
                                        <h3 className="text-lg font-medium mb-4">Viajero {index + 1}</h3>

                                        <div className="mt-2">
                                            <label htmlFor={`full-name-${index}`} className="block text-sm/6 font-medium">
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                id={`full-name-${index}`}
                                                name={`full-name-${index}`}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <label htmlFor={`birthdate-${index}`} className="block text-sm/6 font-medium">
                                                Fecha de nacimiento
                                            </label>
                                            <input
                                                type="date"
                                                id={`birthdate-${index}`}
                                                name={`birthdate-${index}`}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>


                                        <div className="mt-2">
                                            <label htmlFor={`document-type-${index}`} className="block text-sm/6 font-medium">
                                                Tipo de documento
                                            </label>
                                            <select
                                                id={`document-type-${index}`}
                                                name={`document-type-${index}`}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            >
                                                <option value="DNI">DNI</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                                <option value="Cédula">Cédula</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`document-number-${index}`} className="block text-sm/6 font-medium">
                                                Número de documento
                                            </label>
                                            <input
                                                type="text"
                                                id={`document-number-${index}`}
                                                name={`document-number-${index}`}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="sm:col-span-full">
                                <SwitchInput
                                    checked={petChecked}
                                    onChange={() => setPetChecked(!petChecked)}
                                    label="¿Viajas con mascotas?"
                                />
                                {petChecked && (
                                    <div className="sm:col-span-full mt-2">
                                        <label htmlFor="number-of-pets" className="block text-sm/6 font-medium">
                                            Número de mascotas
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                id="number-of-pets"
                                                name="number-of-pets"
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                                placeholder="Ingresa un número entre 1 y 10"
                                            />
                                        </div>
                                    </div>
                                )}
                                <SwitchInput
                                    checked={suitcasesChecked}
                                    onChange={() => setSuitcasesChecked(!suitcasesChecked)}
                                    label="¿Necesitas maletas extra?"
                                />
                                {suitcasesChecked && (
                                    <div className="sm:col-span-full mt-2">
                                        <label htmlFor="number-of-suitcases" className="block text-sm/6 font-medium">
                                            Número de maletas
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                id="number-of-suitcases"
                                                name="number-of-suitcases"
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                                placeholder="Ingresa un número entre 1 y 10"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={onBack} className="btn">
                        Back
                    </button>

                    <button type="submit" onClick={onNext} className="primary-button">
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}
