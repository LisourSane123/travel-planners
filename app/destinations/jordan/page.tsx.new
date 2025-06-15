'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function JordanPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Nagłówek */}
          <h1 className="text-4xl font-bold mb-2">Jordania</h1>
          <p className="text-lg text-gray-600 mb-8">Kraina starożytnych cudów i niezapomnianych krajobrazów</p>
          
          {/* Główne zdjęcie */}
          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-10 shadow-xl">
            <Image 
              src="/images/destinations/jordan.jpg" 
              alt="Panorama Petry - Jordania" 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          
          {/* Opis główny */}
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              Jordania to kraj, gdzie historia ożywa na każdym kroku. Od różowej magii starożytnego miasta Petra, przez pustynne krajobrazy Wadi Rum, aż po błogosławione wody Morza Martwego - to kraj pełen kontrastów i niesamowitych przeżyć.
            </p>
            <p>
              Nasza oferta wycieczek do Jordanii łączy w sobie zwiedzanie najważniejszych zabytków, aktywny wypoczynek na pustyni oraz relaks w luksusowych resortach nad Morzem Martwym i Zatoką Akaba.
            </p>
          </div>
          
          {/* Główne atrakcje */}
          <h2 className="text-2xl font-bold mb-6">Główne atrakcje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card bg-base-100 shadow-lg">
              <div className="relative h-52">
                <Image 
                  src="/images/destinations/jordan.jpg" 
                  alt="Petra - starożytne miasto" 
                  fill 
                  className="object-cover object-top" 
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Petra</h3>
                <p>Starożytne miasto Nabatejczyków wykute w różowym piaskowcu, jedno z Nowych 7 Cudów Świata. Przejście przez wąski kanion Siq i widok na monumentalny Skarbiec to niezapomniane przeżycie.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-lg">
              <div className="relative h-52">
                <Image 
                  src="/images/destinations/jordan.jpg" 
                  alt="Pustynie Wadi Rum" 
                  fill 
                  className="object-cover object-center" 
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Wadi Rum</h3>
                <p>Imponująca pustynia z czerwonymi piaskami i skalnymi formacjami. Możliwość przejażdżki jeepem, nocy w beduińskim namiocie i podziwiania rozgwieżdżonego nieba.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-lg">
              <div className="relative h-52">
                <Image 
                  src="/images/destinations/jordan.jpg" 
                  alt="Morze Martwe" 
                  fill 
                  className="object-cover object-bottom" 
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Morze Martwe</h3>
                <p>Najniżej położone miejsce na Ziemi, gdzie możesz unosić się na wodzie bez wysiłku. Błoto z Morza Martwego słynie z właściwości leczniczych i kosmetycznych.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-lg">
              <div className="relative h-52">
                <Image 
                  src="/images/destinations/jordan.jpg" 
                  alt="Amman - stolica Jordanii" 
                  fill 
                  className="object-cover object-left" 
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Amman</h3>
                <p>Nowoczesna stolica z bogatą historią, gdzie rzymskie ruiny sąsiadują z nowoczesnymi budynkami. Kolorowe bazary, lokalne restauracje i gościnni mieszkańcy.</p>
              </div>
            </div>
          </div>
          
          {/* Propozycje wycieczek */}
          <h2 className="text-2xl font-bold mb-6">Nasze propozycje wycieczek</h2>
          <div className="space-y-6 mb-12">
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h3 className="font-bold text-xl mb-2">Jordańskie Skarby - 7 dni</h3>
              <p>Kompleksowa wycieczka obejmująca wszystkie najważniejsze atrakcje Jordanii, idealna dla pierwszej wizyty w tym kraju.</p>
            </div>
            
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h3 className="font-bold text-xl mb-2">Aktywna Jordania - 9 dni</h3>
              <p>Wycieczka dla miłośników aktywnego wypoczynku, łącząca piesze wycieczki, jazdę na wielbłądach i nurkowanie w Zatoce Akaba.</p>
            </div>
            
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h3 className="font-bold text-xl mb-2">Jordania i Izrael - 12 dni</h3>
              <p>Fascynująca podróż przez historię dwóch krajów pełnych zabytków o znaczeniu światowym.</p>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-primary text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Gotowy odkryć Jordanię?</h2>
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
      </div>
    </>
  );
}
