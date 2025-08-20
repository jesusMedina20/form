'use client'
import { Traveler, TravelersInfo } from '@/types/form/step2';
import { useState } from 'react';

export const useTravelers = (initialData: TravelersInfo) => {
    const [localData, setLocalData] = useState<TravelersInfo>({ ...initialData, numberOfTravelers: 1 });


    if (localData.travelers.length === 0 && localData.numberOfTravelers > 0) {
        const newTravelers: Traveler[] = Array(localData.numberOfTravelers).fill(0).map(() => ({
            fullName: '',
            birthdate: '',
            documentType: 'RIF',
            documentNumber: '',
        }));

        setLocalData({ ...localData, travelers: newTravelers });
    }


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

    const handleTravelerChange = (index: number, field: keyof Traveler, value: string) => {
        const newTravelers = [...localData.travelers];
        newTravelers[index] = { ...newTravelers[index], [field]: value };

        setLocalData({ ...localData, travelers: newTravelers });
    };
   

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