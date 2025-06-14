'use client';
import { useEffect, useState } from 'react';
import { Trip } from '../lib/types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TripEditModal from './TripEditModal';
import TripFilter from './TripFilter';
import TripStatistics from './TripStatistics';

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchTrips = async () => {
    try {
      // Jeśli użytkownik nie jest zalogowany, przekieruj do logowania
      if (status === 'unauthenticated') {
        router.push('/auth');
        return;
      }
      
      setLoading(true);
      setError('');

      // Symuluj krótkie opóźnienie dla lepszego UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Pobierz podróże z bazy CSV za pomocą API
      if (session?.user) {
        try {
          const response = await fetch('/api/trips/user');
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Błąd pobierania danych');
          }
          
          const data = await response.json();
          if (data.trips && Array.isArray(data.trips)) {
            setTrips(data.trips);
            setFilteredTrips(data.trips);
            return;
          }
        } catch (error) {
          console.error('Błąd podczas pobierania podróży:', error);
          
          // Fallback do mockowych danych w przypadku błędu
          const mockTrips: Trip[] = [
            {
              id: '1',
              user_id: session?.user?.id || 'user123',
              destination: 'Paryż',
              date: '2025-08-15',
              status: 'nowa',
              created_at: new Date().toISOString()
            },
            {
              id: '2',
              user_id: session?.user?.id || 'user123',
              destination: 'Rzym',
              date: '2025-09-20',
              status: 'w trakcie',
              created_at: new Date().toISOString()
            },
            {
              id: '3',
              user_id: session?.user?.id || 'user123',
              destination: 'Barcelona',
              date: '2025-07-10',
              status: 'zakończona',
              created_at: new Date().toISOString()
            }
          ];
          
          setTrips(mockTrips);
          setFilteredTrips(mockTrips);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas ładowania podróży');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTrips();
  }, [status, session]);
  
  const handleEditTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsEditModalOpen(true);
  };
  
  const handleSaveTrip = async (updatedTrip: Partial<Trip>) => {
    try {
      if (!selectedTrip) return;
      
      const response = await fetch(`/api/trips/${selectedTrip.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTrip),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd podczas aktualizacji podróży');
      }
      
      // Refresh trips list
      await fetchTrips();
      
      // Close modal
      setIsEditModalOpen(false);
      setSelectedTrip(null);
    } catch (err: any) {
      console.error('Błąd aktualizacji:', err);
      throw err;
    }
  };
  
  const handleDeleteClick = (tripId: string) => {
    setDeleteConfirmationId(tripId);
  };
  
  const handleDeleteConfirm = async (tripId: string) => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/trips/${tripId}/delete`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd podczas usuwania podróży');
      }
      
      // Refresh trips list
      await fetchTrips();
      
      // Reset state
      setDeleteConfirmationId(null);
    } catch (err: any) {
      console.error('Błąd usuwania:', err);
      setError(err.message || 'Wystąpił błąd podczas usuwania podróży');
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleFilterChange = (filtered: Trip[]) => {
    setFilteredTrips(filtered);
  };
  
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p>Ładowanie podróży...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <TripEditModal 
        trip={selectedTrip} 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTrip(null);
        }}
        onSave={handleSaveTrip}
      />
      
      <TripStatistics trips={trips} />
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Twoje podróże</h2>
        <button 
          onClick={() => router.push('/create-trip')}
          className="btn btn-primary btn-sm mt-2 md:mt-0"
        >
          + Nowa podróż
        </button>
      </div>
      
      <TripFilter trips={trips} onFilterChange={handleFilterChange} />
      
      {filteredTrips.length === 0 ? (
        <div className="text-center py-8">
          <p>Nie znaleziono żadnych podróży pasujących do kryteriów wyszukiwania.</p>
          <button 
            onClick={() => router.push('/create-trip')} 
            className="btn btn-primary mt-4">
            Zaplanuj podróż
          </button>
        </div>
      ) : (
        <ul className="space-y-4 mt-6">
          {filteredTrips.map(trip => (
            <li key={trip.id} className="card bg-base-100 shadow-md p-6">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <div className="font-bold text-lg">{trip.destination}</div>
                <div className="badge badge-primary">{trip.status}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div><strong>Data wyjazdu:</strong> {trip.date}</div>
                <div><strong>Rodzaj:</strong> {trip.category ? (trip.category.charAt(0).toUpperCase() + trip.category.slice(1)) : 'Nie określono'}</div>
                <div><strong>Osoby:</strong> {trip.adults || 0} dorosłych, {trip.children || 0} dzieci</div>
                <div><strong>Data utworzenia:</strong> {new Date(trip.created_at).toLocaleDateString('pl-PL')}</div>
              </div>
              
              {trip.comments && (
                <div className="mt-2 pt-2 border-t border-base-300">
                  <strong>Uwagi:</strong> 
                  <p className="text-sm mt-1">{trip.comments}</p>
                </div>
              )}
              
              <div className="flex justify-end mt-4 gap-2">
                <button 
                  onClick={() => handleEditTrip(trip)} 
                  className="btn btn-outline btn-sm"
                >
                  Edytuj
                </button>
                
                {deleteConfirmationId === trip.id ? (
                  <div className="flex gap-2">
                    <span className="self-center text-sm text-error">Potwierdź usunięcie:</span>
                    <button 
                      onClick={() => handleDeleteConfirm(trip.id)} 
                      className="btn btn-sm btn-error"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Usuwanie...' : 'Tak'}
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmationId(null)} 
                      className="btn btn-sm"
                      disabled={isDeleting}
                    >
                      Nie
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleDeleteClick(trip.id)} 
                    className="btn btn-outline btn-sm btn-error"
                  >
                    Usuń
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
