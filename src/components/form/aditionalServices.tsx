'use client'
import { useState } from "react";
import SwitchInput from "../inputs/switch";
import { AdditionalServices } from "@/types/form/aditionalServices";

export default function AditionalServices({ data, updateData, onBack, onNext }: {
    data: AdditionalServices;
    updateData: (data: AdditionalServices) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const [localData, setLocalData] = useState<AdditionalServices>(data);

    const handleChange = (field: keyof AdditionalServices, value: boolean | string) => {
        const updated = { ...localData, [field]: value };
        setLocalData(updated);
        updateData(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateData(localData);
        onNext();
    };



    return (
        <div className="mx-auto max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 p-2">
            <form onSubmit={handleSubmit} className="p-8 ">
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold ">Formulario del viajero</h2>
                        <p className="mt-1 text-sm/6 ">
                            Rellena el formulario para reservar tu viaje. Asegúrate de proporcionar información precisa para evitar inconvenientes.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <SwitchInput
                                checked={localData.hasInsurance}
                                onChange={(e) => handleChange('hasInsurance', e.target.checked)}
                                label="¿Deseas agregar seguro de viaje?"
                            />
                            <SwitchInput
                                checked={localData.hasPreferentialSeat}
                                onChange={(e) => handleChange('hasPreferentialSeat', e.target.checked)}
                                label="¿Deseas seleccionar asientos preferenciales?"
                            />
                            <SwitchInput
                                checked={localData.requiresSpecialAssistance}
                                onChange={(e) => handleChange('requiresSpecialAssistance', e.target.checked)}
                                label="¿Requiere asistencia especial?"
                            />
                            {localData.requiresSpecialAssistance && (
                                <div className="sm:col-span-full mt-2">
                                    <label htmlFor="special-assistance" className="block text-sm font-medium my-2">
                                        Describa brevemente
                                    </label>
                                    <textarea
                                        required
                                        value={localData.specialAssistanceDescription}
                                        onChange={e => handleChange('specialAssistanceDescription', e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        maxLength={200}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <button type="button" onClick={onBack} className="btn">
                        Back
                    </button>
                    <button type="submit" className="primary-button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
