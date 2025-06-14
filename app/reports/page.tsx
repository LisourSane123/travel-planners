'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { Trip } from '../../lib/types';

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
      return;
    }

    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/trips/user');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Błąd pobierania danych');
        }
        
        const data = await response.json();
        if (data.trips && Array.isArray(data.trips)) {
          setTrips(data.trips);
        }
      } catch (err: any) {
        console.error('Błąd podczas pobierania podróży:', err);
        setError(err.message || 'Wystąpił problem z pobraniem danych podróży');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchTrips();
    }
  }, [status, router, session]);

  // Calculate trip statistics
  const totalTrips = trips.length;
  const upcomingTrips = trips.filter(t => t.status === 'nowa').length;
  const inProgressTrips = trips.filter(t => t.status === 'w trakcie').length;
  const completedTrips = trips.filter(t => t.status === 'zakończona').length;
  
  // Calculate destination statistics
  const destinations = trips.reduce<Record<string, number>>((acc, trip) => {
    acc[trip.destination] = (acc[trip.destination] || 0) + 1;
    return acc;
  }, {});
  
  const destinationStats = Object.entries(destinations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Calculate category statistics
  const categories = trips.reduce<Record<string, number>>((acc, trip) => {
    const category = trip.category || 'nieznana';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryStats = Object.entries(categories)
    .sort((a, b) => b[1] - a[1]);
  
  // Calculate people statistics
  const totalAdults = trips.reduce((sum, trip) => sum + (trip.adults || 0), 0);
  const totalChildren = trips.reduce((sum, trip) => sum + (trip.children || 0), 0);
  
  // Calculate monthly trip distribution
  const monthlyTrips = trips.reduce<Record<string, number>>((acc, trip) => {
    const month = trip.date.substring(0, 7); // Format: YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  const monthlyStats = Object.entries(monthlyTrips)
    .sort((a, b) => a[0].localeCompare(b[0]));

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 text-center mt-16">
          <div className="loading loading-spinner loading-lg"></div>
          <p>Ładowanie raportów...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 mt-8">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-primary bg-opacity-10 py-8 rounded-lg mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Raporty i statystyki</h1>
          <p className="text-center mt-2 max-w-2xl mx-auto px-4">
            Przegląd statystyk i podsumowanie Twoich podróży
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Overview stats */}
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
            <div className="stat">
              <div className="stat-title">Wszystkie podróże</div>
              <div className="stat-value text-primary">{totalTrips}</div>
              <div className="stat-desc">Łączna liczba podróży</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Nadchodzące</div>
              <div className="stat-value text-secondary">{upcomingTrips}</div>
              <div className="stat-desc">{Math.round(upcomingTrips / totalTrips * 100 || 0)}% wszystkich podróży</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">W trakcie</div>
              <div className="stat-value text-info">{inProgressTrips}</div>
              <div className="stat-desc">{Math.round(inProgressTrips / totalTrips * 100 || 0)}% wszystkich podróży</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Ukończone</div>
              <div className="stat-value text-success">{completedTrips}</div>
              <div className="stat-desc">{Math.round(completedTrips / totalTrips * 100 || 0)}% wszystkich podróży</div>
            </div>
          </div>

          {/* Detailed stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top destinations */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Najpopularniejsze destynacje</h2>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Destynacja</th>
                        <th>Liczba podróży</th>
                        <th>Udział</th>
                      </tr>
                    </thead>
                    <tbody>
                      {destinationStats.map(([destination, count]) => (
                        <tr key={destination}>
                          <td>{destination}</td>
                          <td>{count}</td>
                          <td>{Math.round(count / totalTrips * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Kategorie podróży</h2>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Kategoria</th>
                        <th>Liczba podróży</th>
                        <th>Udział</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryStats.map(([category, count]) => (
                        <tr key={category}>
                          <td>{category}</td>
                          <td>{count}</td>
                          <td>{Math.round(count / totalTrips * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Additional stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* People stats */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Statystyki uczestników</h2>
                <div className="stats stats-vertical shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Łącznie dorosłych</div>
                    <div className="stat-value">{totalAdults}</div>
                    <div className="stat-desc">Średnio {(totalAdults / totalTrips).toFixed(1)} na podróż</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Łącznie dzieci</div>
                    <div className="stat-value">{totalChildren}</div>
                    <div className="stat-desc">Średnio {(totalChildren / totalTrips).toFixed(1)} na podróż</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly distribution */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Rozkład podróży w czasie</h2>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Miesiąc</th>
                        <th>Liczba podróży</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyStats.map(([month, count]) => {
                        const date = new Date(month + '-01');
                        const monthName = date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
                        return (
                          <tr key={month}>
                            <td>{monthName}</td>
                            <td>{count}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
