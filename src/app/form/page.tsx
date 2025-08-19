'use client'
import { useState } from 'react'
import Step1 from '@/components/form/step1'
import Step2 from '@/components/form/step2'
import AditionalServices from '@/components/form/aditionalServices';

export default function Page() {
  const [step, setStep] = useState(1);

  return (
    <div className='flex items-center justify-center min-h-screen p-8 md:p-16'>
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <AditionalServices onBack={() => setStep(2)} />}
    </div>
  )
}