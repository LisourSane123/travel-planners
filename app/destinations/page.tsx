'use client';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

// Metadane przeniesione do pliku metadata.ts lub layout.tsx

// Dane o kierunkach
const destinations = [
  {
    id: 'jordan',
    name: 'Jordania',
    image: '/images/destinations/jordan.jpg',
    description: 'Odkryj starożytne miasta wykute w skałach, pustynie i Morze Martwe.',
    highlights: ['Petra', 'Wadi Rum', 'Amman', 'Morze Martwe']
  },
  {
    id: 'brazil',
    name: 'Brazylia',
    image: '/images/destinations/brazil.jpg',
    description: 'Raj dla miłośników natury, plaż i wibrującego życia miejskiego.',
    highlights: ['Rio de Janeiro', 'Amazonia', 'Salvador', 'Wodospady Iguazu']
  },
  {
    id: 'italy',
    name: 'Włochy',
    image: '/images/destinations/italy.jpg',
    description: 'Kraj wspaniałej kultury, historii, sztuki i niesamowitej kuchni.',
    highlights: ['Rzym', 'Wenecja', 'Florencja', 'Wybrzeże Amalfi']
  },
  {
    id: 'spain',
    name: 'Hiszpania',
    image: '/images/destinations/spain.jpg',
    description: 'Słoneczne plaże, zabytkowe miasta i energiczna kultura.',
    highlights: ['Barcelona', 'Madryt', 'Sevilla', 'Wyspy Kanaryjskie']
  },
  {
    id: 'japan',
    name: 'Japonia',
    image: '/images/destinations/japan.jpg',
    description: 'Harmonijne połączenie tradycji i nowoczesności w kraju kwitnącej wiśni.',
    highlights: ['Tokio', 'Kioto', 'Góra Fuji', 'Osaka']
  },
];

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Kierunki które oferujemy</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <figure className="relative h-52">
              <Image 
                src={destination.image} 
                alt={`Zdjęcie: ${destination.name}`}
                fill
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{destination.name}</h2>
              <p>{destination.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Główne atrakcje:</h3>
                <ul className="list-disc list-inside">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">Szczegóły</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Nie znalazłeś kierunku, który Cię interesuje?</h2>
        <p className="mb-6">Skontaktuj się z nami, aby omówić indywidualne plany podróży!</p>
        <div className="flex flex-col items-center gap-4">
          <Link href="/auth?destination=create-trip" className="btn btn-primary btn-lg">
            Zaplanuj swoją wycieczkę już dzisiaj
          </Link>
          <Link href="/contact" className="btn btn-outline">Kontakt z doradcą</Link>
        </div>
      </div>
    </div>
    </>
  );
}
