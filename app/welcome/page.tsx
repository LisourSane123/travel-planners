'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function WelcomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Witaj w Travel Planners!',
      description: 'Odkryj nowy wymiar planowania podróży! Nasza aplikacja pomoże Ci zaplanować, śledzić i cieszyć się wspomnieniami z Twoich przygód.',
      image: '/images/beach.jpg',
      button: 'Dalej'
    },
    {
      title: 'Twórz podróże marzeń',
      description: 'W łatwy sposób dodawaj nowe podróże, podając destynację, datę, liczbę uczestników, kategorię i inne informacje.',
      image: '/globe.svg',
      button: 'Dalej'
    },
    {
      title: 'Śledź swoje przygody',
      description: 'Monitoruj status swoich podróży, zarządzaj rezerwacjami i śledź postępy w przygotowaniach.',
      image: '/file.svg',
      button: 'Dalej'
    },
    {
      title: 'Analizuj statystyki',
      description: 'Przeglądaj raporty i statystyki swoich podróży, by lepiej zrozumieć swoje preferencje i optymalizować plany.',
      image: '/window.svg',
      button: 'Rozpocznij przygodę'
    }
  ];
  
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      router.push('/dashboard');
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <div className="relative w-full h-64">
                <Image 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl font-bold">{steps[activeStep].title}</h2>
              <p className="py-4 text-lg">{steps[activeStep].description}</p>
              
              <div className="card-actions mt-4">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleNext}
                >
                  {steps[activeStep].button}
                </button>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {steps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${index === activeStep ? 'bg-primary' : 'bg-gray-300'}`}
                    onClick={() => setActiveStep(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
