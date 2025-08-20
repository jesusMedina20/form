'use client'
import { useTravelers } from '@/hooks/useTravelers';
import SwitchInput from '../inputs/switch';
import { useState } from 'react';
import { TravelersInfo } from '@/types/form/step2';

export default function Step2({ data, updateData, onNext, onBack }: {
    data: TravelersInfo;
    updateData: (data: TravelersInfo) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const { localData, handleNumberOfTravelersChange, handleTravelerChange, handleChangeExtras } = useTravelers(data);
    const [petChecked, setPetChecked] = useState(false);
    const [suitcasesChecked, setSuitcasesChecked] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateData(localData);
        if (localData.numberOfTravelers === 0 || localData.travelers.length === 0) {
            alert("El número de viajeros debe ser al menos 1.");
            return;
        }
        onNext();
    };


    return (
        <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-2">
            <form className="p-8" onSubmit={handleSubmit}>
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
                                        type="text"
                                        min="1"
                                        max="10"
                                        id="number-of-travelers"
                                        name="number-of-travelers"
                                        required
                                        value={localData.numberOfTravelers}
                                        onChange={(e) => handleNumberOfTravelersChange(e.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                        placeholder="Ingresa un número entre 1 y 10"
                                    />
                                </div>

                                {localData.travelers.map((traveler, index) => (
                                    <div key={index} className="mt-6 border-t border-gray-200 pt-6">
                                        <h3 className="text-lg font-medium mb-4">Viajero {index + 1}</h3>

                                        <div className="mt-2">
                                            <label htmlFor={`full-name-${index}`} className="block text-sm/6 font-medium">
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={traveler.fullName}
                                                onChange={(e) => handleTravelerChange(index, 'fullName', e.target.value)}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <label htmlFor={`birthdate-${index}`} className="block text-sm/6 font-medium">
                                                Fecha de nacimiento
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={traveler.birthdate}
                                                onChange={(e) => handleTravelerChange(index, 'birthdate', e.target.value)}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>


                                        <div className="mt-2">
                                            <label htmlFor={`document-type-${index}`} className="block text-sm/6 font-medium">
                                                Tipo de documento
                                            </label>
                                            <select
                                                required
                                                value={traveler.documentType}
                                                onChange={(e) => handleTravelerChange(index, 'documentType', e.target.value)}
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-8 pl-3 text-base sm:text-sm/6 bg-black/6 text-black border border-gray-300 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-400 dark:bg-white/5 dark:text-white dark:border-transparent dark:outline-white/10 dark:focus:outline-indigo-500 dark:*:bg-gray-800"
                                            >
                                                <option value="RIF">RIF</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                                <option value="Cédula">Cédula</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`document-number-${index}`} className="block text-sm/6 font-medium">
                                                Número de documento
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={traveler.documentNumber}
                                                onChange={(e) => handleTravelerChange(index, 'documentNumber', e.target.value)}
                                                className="block  w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="sm:col-span-full">
                                <SwitchInput
                                    checked={petChecked}

                                    onChange={(e) => { handleChangeExtras('hasPets', e.target.checked); setPetChecked(!petChecked); }}
                                    label="¿Viajas con mascotas?"
                                />
                                {petChecked && (
                                    <div className="sm:col-span-full mt-2">
                                        <label htmlFor="number-of-pets" className="block text-sm/6 font-medium">
                                            Número de mascotas
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={localData.numberOfPets || ''}
                                                onChange={(e) => handleChangeExtras('numberOfPets', e.target.value)}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 appearance-none"
                                                placeholder="Ingresa un número entre 1 y 10"
                                            />
                                        </div>
                                    </div>
                                )}
                                <SwitchInput
                                    checked={suitcasesChecked}
                                    onChange={(e) => { handleChangeExtras('hasSuitcases', e.target.checked); setSuitcasesChecked(!suitcasesChecked); }}
                                    label="¿Necesitas maletas extra?"
                                />
                                {suitcasesChecked && (
                                    <div className="sm:col-span-full mt-2">
                                        <label htmlFor="number-of-suitcases" className="block text-sm/6 font-medium">
                                            Número de maletas
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={localData.numberOfSuitcases || ''}
                                                onChange={(e) => handleChangeExtras('numberOfSuitcases', e.target.value)}
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

                    <button type="submit" className="primary-button">
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}
