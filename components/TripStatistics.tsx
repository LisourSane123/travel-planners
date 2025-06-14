'use client';
import { useEffect, useState } from 'react';
import { Trip } from '../lib/types';

type TripStatisticsProps = {
  trips: Trip[];
};

export default function TripStatistics({ trips }: TripStatisticsProps) {
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    inProgress: 0,
    mostCommonDestination: '',
    favCategory: '',
  });

  useEffect(() => {
    if (!trips || trips.length === 0) {
      return;
    }

    // Count trips by status
    const upcoming = trips.filter(trip => trip.status === 'nowa').length;
    const completed = trips.filter(trip => trip.status === 'zakończona').length;
    const inProgress = trips.filter(trip => trip.status === 'w trakcie').length;

    // Find most common destination
    const destinationCounts = trips.reduce((acc, trip) => {
      acc[trip.destination] = (acc[trip.destination] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonDestination = Object.entries(destinationCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([destination]) => destination)[0] || '';

    // Find favorite category
    const categories = trips
      .filter(trip => trip.category)
      .map(trip => trip.category as string);

    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favCategory = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category)[0] || '';

    setStats({
      total: trips.length,
      upcoming,
      completed,
      inProgress,
      mostCommonDestination,
      favCategory,
    });
  }, [trips]);

  if (!trips || trips.length === 0) {
    return null;
  }

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div className="stat-title">Wszystkie podróże</div>
        <div className="stat-value text-primary">{stats.total}</div>
        <div className="stat-desc">Łączna liczba Twoich podróży</div>
      </div>
      
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <div className="stat-title">Nadchodzące</div>
        <div className="stat-value text-secondary">{stats.upcoming}</div>
        <div className="stat-desc">Podróże oczekujące na realizację</div>
      </div>
      
      <div className="stat">
        <div className="stat-figure text-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
        </div>
        <div className="stat-title">W trakcie</div>
        <div className="stat-value text-info">{stats.inProgress}</div>
        <div className="stat-desc">Podróże w trakcie realizacji</div>
      </div>
      
      <div className="stat">
        <div className="stat-figure text-success">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div className="stat-title">Ukończone</div>
        <div className="stat-value text-success">{stats.completed}</div>
        <div className="stat-desc">Zrealizowane podróże</div>
      </div>
      
      {stats.mostCommonDestination && (
        <div className="stat">
          <div className="stat-title">Ulubiona destynacja</div>
          <div className="stat-value text-accent">{stats.mostCommonDestination}</div>
          <div className="stat-desc">Najczęściej wybierany cel podróży</div>
        </div>
      )}
      
      {stats.favCategory && (
        <div className="stat">
          <div className="stat-title">Preferowany rodzaj</div>
          <div className="stat-value">{stats.favCategory}</div>
          <div className="stat-desc">Twój ulubiony typ podróży</div>
        </div>
      )}
    </div>
  );
}
