'use client'

import { useState } from "react";
import SwitchInput from "../inputs/switch";

export default function AditionalServices({ onBack }: { onBack: () => void }) {
    const [insuranceChecked, setinsuranceChecked] = useState<boolean>(false);
    const [preferentialSeatChecked, setPreferentialSeatChecked] = useState<boolean>(false);
    const [attendanceChecked, setAttendanceChecked] = useState<boolean>(false);



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
                            <SwitchInput
                                checked={insuranceChecked}
                                onChange={() => setinsuranceChecked(!insuranceChecked)}
                                label="¿Deseas agregar seguro de viaje?"
                            />
                            <SwitchInput
                                checked={preferentialSeatChecked}
                                onChange={() => setPreferentialSeatChecked(!preferentialSeatChecked)}
                                label="¿Deseas seleccionar asientos preferenciales?"
                            />
                            <SwitchInput
                                checked={attendanceChecked}
                                onChange={() => setAttendanceChecked(!attendanceChecked)}
                                label="¿Requiere asistencia especial?"
                            />
                            {attendanceChecked && (
                                <div className="sm:col-span-full mt-2">
                                    <label htmlFor="special-assistance" className="block text-sm font-medium my-2">
                                        Describa brevemente
                                    </label>
                                    <textarea
                                        id="special-assistance"
                                        name="special-assistance"
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
