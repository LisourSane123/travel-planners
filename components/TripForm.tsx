'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function TripForm() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [continent, setContinent] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [comments, setComments] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {      
      if (!destination || !startDate || !endDate) {
        throw new Error('Wszystkie wymagane pola muszą być wypełnione');
      }

      // Sprawdź, czy data końcowa jest po dacie początkowej
      if (new Date(endDate) <= new Date(startDate)) {
        throw new Error('Data zakończenia podróży musi być późniejsza niż data rozpoczęcia');
      }

      // Check if the user is authenticated
      if (!session?.user) {
        throw new Error('Musisz być zalogowany aby zgłosić podróż');
      }

      // Zapisz podróż w bazie CSV za pomocą API
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          destination, 
          date: startDate, // Zachowujemy kompatybilność z obecnym API
          endDate,
          category: category || undefined, 
          continent: continent || undefined,
          adults, 
          children, 
          comments: comments || undefined 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Wystąpił błąd podczas zapisywania podróży');
      }
      
      setSuccess(true);
      setDestination('');
      setStartDate('');
      setEndDate('');
      setContinent('');
      setTimeout(() => {
        router.push('/dashboard?tripCreated=true');
      }, 3000);
    } catch (err: any) {
      console.error('Błąd:', err);
      setError(err?.message || 'Wystąpił błąd podczas zapisywania podróży');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 p-8 max-w-2xl mx-auto mt-8 space-y-4">
      <h2 className="text-xl">Zgłoś podróż</h2>
      
      <div>
        <label className="label">
          <span className="label-text">Cel podróży</span>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Data rozpoczęcia</span>
          </label>
          <input 
            className="input input-bordered w-full" 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Data zakończenia</span>
          </label>
          <input 
            className="input input-bordered w-full" 
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            disabled={loading}
            min={startDate || undefined}
          />
        </div>
      </div>
      
      <div>
        <label className="label">
          <span className="label-text">Kontynent</span>
        </label>
        <select 
          className="select select-bordered w-full"
          value={continent}
          onChange={e => setContinent(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Wybierz kontynent --</option>
          <option value="europa">Europa</option>
          <option value="azja">Azja</option>
          <option value="afryka">Afryka</option>
          <option value="ameryka-pn">Ameryka Północna</option>
          <option value="ameryka-pd">Ameryka Południowa</option>
          <option value="australia">Australia i Oceania</option>
          <option value="antarktyda">Antarktyda</option>
        </select>
      </div>
      
      <div>
        <label className="label">
          <span className="label-text">Rodzaj wycieczki</span>
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
            <span className="label-text">Liczba dorosłych</span>
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
            <span className="label-text">Liczba dzieci</span>
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
          <span className="label-text">Dodatkowe uwagi</span>
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
      
      <button className="btn btn-primary w-full mt-4" type="submit" disabled={loading}>
        {loading ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
      </button>
      
      {success && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Zgłoszenie przyjęte!</h3>
              <p className="text-sm">Twoja podróż jest w trakcie planowania. Nasz doradca skontaktuje się z Tobą wkrótce z indywidualną ofertą.</p>
            </div>
          </div>
        </div>
      )}
      {error && <div className="alert alert-error">{error}</div>}
    </form>
  );
}
