import { useState } from 'react';

export const useTravelers = () => {
    const [numberOfTravelers, setNumberOfTravelers] = useState<string>('');

    const handleNumberOfTravelersChange = (value: string) => {
        if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
            setNumberOfTravelers(value);
        }
    };

    return {
        numberOfTravelers,
        handleNumberOfTravelersChange,
    };
};