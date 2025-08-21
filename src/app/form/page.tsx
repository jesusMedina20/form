'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Step1 from '@/components/form/step1'
import Step2 from '@/components/form/step2'
import AditionalServices from '@/components/form/aditionalServices';
import { FormData } from '@/types/form/formData';
import { FlightInfo } from '@/types/form/step1';
import { TravelersInfo } from '@/types/form/step2';
import { AdditionalServices } from '@/types/form/aditionalServices';

// Form page, manages form state, navigation between steps, and data storage before redirecting to the summary.
export default function Page() {
// State to control the current step of the form (1, 2 or 3)
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  //State that contains all the form data
  const [formData, setFormData] = useState<FormData>({
    flight: {
      destination: '',
      startDate: '',
      returnDate: '',
      flightClass: 'Economy',
    },
    travelers: {
      numberOfTravelers: 1,
      travelers: [],
      hasPets: false,
      numberOfPets: 0,
      hasSuitcases: false,
      numberOfSuitcases: 0,
    },
    services: {
      hasInsurance: false,
      hasPreferentialSeat: false,
      requiresSpecialAssistance: false,
      specialAssistanceDescription: '',
    },
  });

  //update the form statuses
  const updateFlightData = (data: FlightInfo) => {
    setFormData(prev => ({ ...prev, flight: data }));
  };

  const updateTravelersData = (data: TravelersInfo) => {
    setFormData(prev => ({ ...prev, travelers: data }));
  };

  const updateServicesData = (data: AdditionalServices) => {
    setFormData(prev => ({ ...prev, services: data }));
  };


  return (
    <div className='flex items-center justify-center min-h-screen p-8 md:p-16'>
      {step === 1 && <Step1 onNext={() => setStep(2)} data={formData.flight} updateData={updateFlightData} />}
      {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} data={formData.travelers} updateData={updateTravelersData} />}
      {step === 3 && (
        <AditionalServices onBack={() => setStep(2)} data={formData.services} updateData={updateServicesData} onNext={() => {
          window.localStorage.setItem('formData', JSON.stringify(formData));
          router.push('/summary');
        }}
        />
      )}
    </div>
  );
}