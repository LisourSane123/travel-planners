'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

// Metadata przeniesiona do pliku metadata.ts w tym samym folderze lub layout.tsx

export default function SpainPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Nagłówek */}
        <h1 className="text-4xl font-bold mb-2">Hiszpania</h1>
        <p className="text-lg text-gray-600 mb-8">Słoneczne plaże, zabytkowe miasta i energiczna kultura</p>
        
        {/* Główne zdjęcie */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-10 shadow-xl">
          <Image 
            src="/images/destinations/spain.jpg" 
            alt="Barcelona - Hiszpania" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        
        {/* Opis główny */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Hiszpania to kraj o niepowtarzalnym charakterze, gdzie tradycja flamenco miesza się z awangardową architekturą, a wielowiekowe zabytki sąsiadują z nowoczesnymi metropoliami. Od słonecznego wybrzeża Costa del Sol, przez tętniące życiem Barcelona i Madryt, po zielone regiony północy - każdy znajdzie tu coś dla siebie.
          </p>
          <p>
            Nasze hiszpańskie wycieczki pozwalają odkryć zarówno największe atrakcje jak i ukryte perełki tego fascynującego kraju, zawsze z czasem na delektowanie się lokalną kuchnią i kulturą.
          </p>
        </div>
        
        {/* Główne atrakcje */}
        <h2 className="text-2xl font-bold mb-6">Główne atrakcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/spain.jpg" 
                alt="Barcelona - Sagrada Familia" 
                fill 
                className="object-cover object-top" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Barcelona</h3>
              <p>Miasto Gaudiego z niesamowitą Sagradą Familią, Park Güell i innymi arcydziełami architektury. Tętniąca życiem La Rambla i katalońska kuchnia.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/spain.jpg" 
                alt="Madryt - Pałac Królewski" 
                fill 
                className="object-cover object-center" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Madryt</h3>
              <p>Stolica z imponującymi muzeami jak Prado i Reina Sofia, okazałymi placami i pałacami oraz słynnym życiem nocnym. Centrum hiszpańskiej sztuki i kultury.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/spain.jpg" 
                alt="Sevilla - Plaza de España" 
                fill 
                className="object-cover object-bottom" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Sevilla</h3>
              <p>Serce Andaluzji z monumentalną katedrą, mauretańskim pałacem Alcázar i prawdziwym flamenco. Miasto o niepowtarzalnym klimacie i bogatej historii.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/spain.jpg" 
                alt="Wyspy Kanaryjskie" 
                fill 
                className="object-cover object-left" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Wyspy Kanaryjskie</h3>
              <p>Wulkaniczne wyspy z zachwycającymi plażami, niesamowitymi krajobrazami i doskonałym klimatem przez cały rok. Raj dla miłośników natury i sportów wodnych.</p>
            </div>
          </div>
        </div>
        
        {/* Propozycje wycieczek */}
        <h2 className="text-2xl font-bold mb-6">Nasze propozycje wycieczek</h2>
        <div className="space-y-6 mb-12">
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Hiszpańskie Miasta - 8 dni</h3>
            <p>Zwiedzanie najważniejszych miast: Barcelona, Madryt, Toledo i Valencia.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Andaluzyjskim Szlakiem - 7 dni</h3>
            <p>Podróż przez najpiękniejsze miasta Andaluzji: Sevilla, Granada, Cordoba i Ronda.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Wyspy Kanaryjskie - 10 dni</h3>
            <p>Odpoczynek i zwiedzanie Teneryfy, Gran Canarii i Lanzarote.</p>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-primary text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Gotowy odkryć Hiszpanię?</h2>
          <p className="mb-6">Skontaktuj się z nami, aby omówić szczegóły wycieczki dopasowanej do Twoich oczekiwań!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth?destination=create-trip" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
              Zaplanuj swoją wycieczkę już dzisiaj
            </Link>
            <Link href="/contact" className="btn btn-sm bg-white text-primary hover:bg-gray-100">
              Kontakt z doradcą
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
