'use client';

import Navbar from '../../components/Navbar';
import TripList from '../../components/TripList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);
  
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
