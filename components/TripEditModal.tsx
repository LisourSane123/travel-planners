'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Trip } from '../lib/types';

interface TripEditModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTrip: Partial<Trip>) => void;
}

export default function TripEditModal({ trip, isOpen, onClose, onSave }: TripEditModalProps) {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trip) {
      setDestination(trip.destination || '');
      setDate(trip.date || '');
      setCategory(trip.category || '');
      setAdults(trip.adults || 2);
      setChildren(trip.children || 0);
      setComments(trip.comments || '');
      setStatus(trip.status || 'nowa');
    }
  }, [trip]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const updatedTrip = {
        destination,
        date,
        category: category as Trip['category'],
        adults,
        children,
        comments,
        status: status as 'nowa' | 'w trakcie' | 'zakończona'
      };

      await onSave(updatedTrip);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania zmian');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edycja podróży</h2>
          <button 
            onClick={onClose} 
            className="btn btn-sm btn-circle">
            ✕
          </button>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Cel podróży</span>
            </label>
            <input 
              className="input input-bordered w-full" 
              placeholder="Cel podróży" 
              value={destination} 
              onChange={e => setDestination(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Data wyjazdu</span>
            </label>
            <input 
              className="input input-bordered w-full" 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Status</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="nowa">Nowa</option>
              <option value="w trakcie">W trakcie</option>
              <option value="zakończona">Zakończona</option>
            </select>
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Rodzaj wycieczki</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={category}
              onChange={e => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">-- Wybierz rodzaj --</option>
              <option value="egzotyka">Egzotyka</option>
              <option value="historia">Historia</option>
              <option value="city-break">City Break</option>
              <option value="natura">Wycieczka z naturą</option>
              <option value="relaks">Wypoczynek/Relaks</option>
              <option value="sport">Sport i aktywność</option>
              <option value="kulinarna">Kulinarna</option>
              <option value="inne">Inne</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Liczba dorosłych</span>
              </label>
              <input 
                className="input input-bordered w-full" 
                type="number"
                min="1"
                value={adults} 
                onChange={e => setAdults(parseInt(e.target.value) || 0)} 
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="label">
                <span className="label-text font-medium">Liczba dzieci</span>
              </label>
              <input 
                className="input input-bordered w-full" 
                type="number"
                min="0"
                value={children} 
                onChange={e => setChildren(parseInt(e.target.value) || 0)} 
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Dodatkowe uwagi</span>
            </label>
            <textarea 
              className="textarea textarea-bordered w-full" 
              rows={3}
              placeholder="Uwagi, specjalne wymagania, etc." 
              value={comments} 
              onChange={e => setComments(e.target.value)} 
              disabled={loading}
            />
          </div>
          
          <div className="flex gap-2 justify-end mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-outline"
              disabled={loading}
            >
              Anuluj
            </button>
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
