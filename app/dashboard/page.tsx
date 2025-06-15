'use client';

import Navbar from '../../components/Navbar';
import TripList from '../../components/TripList';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripCreated = searchParams.get('tripCreated');
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
    
    // Sprawdź, czy query param istnieje
    if (tripCreated === 'true') {
      setShowNotification(true);
      
      // Ukryj powiadomienie po 10 sekundach
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [status, router, tripCreated]);
  
  if (status === 'loading') {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 text-center mt-16">
          <div className="loading loading-spinner loading-lg"></div>
          <p>Sprawdzanie sesji użytkownika...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pb-16">
        {showNotification && (
          <div className="bg-success text-white p-4 rounded-lg mt-4 shadow-lg relative">
            <button 
              className="absolute top-2 right-2 text-white" 
              onClick={() => setShowNotification(false)}
              aria-label="Zamknij powiadomienie"
            >
              &times;
            </button>
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Twoja podróż została zgłoszona!</h3>
                <div className="mt-2">
                  <p>
                    Dziękujemy za zgłoszenie podróży! Nasz konsultant przeanalizuje Twoje preferencje 
                    i skontaktuje się z Tobą w ciągu 24 godzin z indywidualną propozycją dostosowaną 
                    do Twoich potrzeb.
                  </p>
                </div>
                <div className="mt-4">
                  <Link href="/contact" className="btn btn-sm btn-outline bg-white text-success hover:bg-white hover:text-success">
                    Skontaktuj się z doradcą
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-primary bg-opacity-10 py-8 rounded-lg mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Panel klienta</h1>
          <p className="text-center mt-2 max-w-2xl mx-auto px-4">
            Witaj, <span className="font-semibold">{session?.user?.name || session?.user?.email}</span>! 
            Tutaj możesz zarządzać swoimi podróżami i tworzyć nowe przygody.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <TripList />
        </div>
      </div>
    </div>
  );
}
