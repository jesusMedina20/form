'use client'
import { Traveler, TravelersInfo } from '@/types/form/step2';
import { useState } from 'react';
//Custom hook to manage the status of multiple travelers
export const useTravelers = (initialData: TravelersInfo) => {
    // Local state to manage traveler data
    const [localData, setLocalData] = useState<TravelersInfo>({ ...initialData, numberOfTravelers: 1 });

    // Initialization: Create empty travelers if the array is empty but the number is positive
    if (localData.travelers.length === 0 && localData.numberOfTravelers > 0) {
        const newTravelers: Traveler[] = Array(localData.numberOfTravelers).fill(0).map(() => ({
            fullName: '',
            birthdate: '',
            documentType: 'RIF',
            documentNumber: '',
        }));

        setLocalData({ ...localData, travelers: newTravelers });
    }
    // * @description Dynamically adjusts the traveler array based on the new number
    // * by adding new empty travelers or removing excess travelers
    // *
    // * @param {string} value - New value for the number of travelers

    const handleNumberOfTravelersChange = (value: string) => {

        if (value === '') {
            setLocalData({ ...localData, numberOfTravelers: 0, travelers: [], });
            return;
        }

        const num = parseInt(value, 10);


        if (isNaN(num) || num < 1 || num > 10) return;

        const newTravelers = [...localData.travelers];


        if (num > newTravelers.length) {

            for (let i = newTravelers.length; i < num; i++) {
                newTravelers.push({
                    fullName: '',
                    birthdate: '',
                    documentType: 'RIF',
                    documentNumber: '',
                });
            }
        } else if (num < newTravelers.length) {

            newTravelers.splice(num);
        }

        setLocalData({ ...localData, numberOfTravelers: num, travelers: newTravelers });
    };
    // * @description Updates a specific field for a specific traveler
    // *
    // * @param {number} index - Index of the traveler in the array (0-based)
    // * @param {keyof Traveler} field - Field to update
    // * @param {string} value - New value for the field
    const handleTravelerChange = (index: number, field: keyof Traveler, value: string) => {
        const newTravelers = [...localData.travelers];
        newTravelers[index] = { ...newTravelers[index], [field]: value };

        setLocalData({ ...localData, travelers: newTravelers });
    };

    // * Handles changes to additional options (pets, suitcases)
    // * @description Updates Boolean or numeric fields of additional options
    // * with automatic type conversion
    // *
    // * @param {keyof TravelersInfo} field - Field to update
    // * @param {boolean | number | string} value - New value


    const handleChangeExtras = (field: keyof TravelersInfo, value: boolean | number | string) => {
        setLocalData(prev => ({
            ...prev,
            [field]: typeof value === 'boolean' ? value : Number(value)
        }));
    };


    return {
        localData,
        handleNumberOfTravelersChange,
        handleTravelerChange,
        handleChangeExtras
    };
};