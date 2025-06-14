'use client';
import { useState, useEffect } from 'react';
import { Trip } from '../lib/types';

type FilterProps = {
  onFilterChange: (filteredTrips: Trip[]) => void;
  trips: Trip[];
};

export default function TripFilter({ onFilterChange, trips }: FilterProps) {
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Define trip categories based on your Trip type
  const categories = [
    { value: 'egzotyka', label: 'Egzotyka' },
    { value: 'historia', label: 'Historia' },
    { value: 'city-break', label: 'City Break' },
    { value: 'natura', label: 'Natura' },
    { value: 'relaks', label: 'Relaks' },
    { value: 'sport', label: 'Sport' },
    { value: 'kulinarna', label: 'Kulinaria' },
    { value: 'inne', label: 'Inne' },
  ];

  const statusOptions = [
    { value: 'nowa', label: 'Nowa' },
    { value: 'w trakcie', label: 'W trakcie' },
    { value: 'zakończona', label: 'Zakończona' },
  ];

  useEffect(() => {
    applyFilters();
  }, [destination, status, category, dateFrom, dateTo, trips]);

  const applyFilters = () => {
    let filteredTrips = [...trips];

    // Filter by destination
    if (destination) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by status
    if (status) {
      filteredTrips = filteredTrips.filter(trip => trip.status === status);
    }

    // Filter by category
    if (category) {
      filteredTrips = filteredTrips.filter(trip => trip.category === category);
    }

    // Filter by date range
    if (dateFrom) {
      filteredTrips = filteredTrips.filter(trip => trip.date >= dateFrom);
    }

    if (dateTo) {
      filteredTrips = filteredTrips.filter(trip => trip.date <= dateTo);
    }

    onFilterChange(filteredTrips);
  };

  const resetFilters = () => {
    setDestination('');
    setStatus('');
    setCategory('');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtruj podróże</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Destynacja</span>
          </label>
          <input
            type="text"
            placeholder="Wyszukaj po destynacji"
            className="input input-bordered w-full"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Wszystkie statusy</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Kategoria</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Wszystkie kategorie</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Data od</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Data do</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div className="form-control flex items-end">
          <button 
            className="btn btn-outline w-full"
            onClick={resetFilters}
          >
            Wyczyść filtry
          </button>
        </div>
      </div>
    </div>
  );
}
