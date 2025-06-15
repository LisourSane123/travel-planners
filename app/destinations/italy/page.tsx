'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

// Metadata przeniesiona do pliku metadata.ts w tym samym folderze lub layout.tsx

export default function ItalyPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Nagłówek */}
        <h1 className="text-4xl font-bold mb-2">Włochy</h1>
        <p className="text-lg text-gray-600 mb-8">Kraj wspaniałej kultury, historii, sztuki i niesamowitej kuchni</p>
        
        {/* Główne zdjęcie */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-10 shadow-xl">
          <Image 
            src="/images/destinations/italy.jpg" 
            alt="Rzym - Włochy" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        
        {/* Opis główny */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Włochy to kraj, gdzie historia, sztuka i kultura łączą się z zapierającymi dech w piersiach krajobrazami i jednym z najlepszych kulinariów na świecie. Od majestatycznych ruin Rzymu, przez renesansowe arcydzieła Florencji, po romantyczne kanały Wenecji - każdy region oferuje niezapomniane doświadczenia.
          </p>
          <p>
            Nasza oferta włoskich wycieczek pozwala odkryć zarówno tętniące życiem miasta, jak i urokliwe miasteczka oraz malownicze wybrzeża - wszystko doprawione wybornym winem i kuchnią.
          </p>
        </div>
        
        {/* Główne atrakcje */}
        <h2 className="text-2xl font-bold mb-6">Główne atrakcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/italy.jpg" 
                alt="Rzym - Koloseum" 
                fill 
                className="object-cover object-top" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Rzym</h3>
              <p>Wieczne Miasto z zabytkami o światowym znaczeniu: Koloseum, Forum Romanum, Watykan. Tysiące lat historii zamknięte w zabytkach, muzeach i urokliwych uliczkach.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/italy.jpg" 
                alt="Wenecja - Grand Canal" 
                fill 
                className="object-cover object-center" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Wenecja</h3>
              <p>Miasto na wodzie z siecią kanałów, romantycznych mostów i historycznych pałaców. Plac św. Marka, Pałac Dożów i przejażdżka gondolą to obowiązkowe punkty programu.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/italy.jpg" 
                alt="Florencja - katedra" 
                fill 
                className="object-cover object-bottom" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Florencja</h3>
              <p>Kolebka renesansu z galerią Uffizi, katedrą Santa Maria del Fiore i mostem Ponte Vecchio. Miasto Medyceuszy, Michała Anioła i Dantego.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/italy.jpg" 
                alt="Wybrzeże Amalfi" 
                fill 
                className="object-cover object-left" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Wybrzeże Amalfi</h3>
              <p>Malownicze miasteczka zawieszone na klifach, krystaliczne morze i zapierające dech w piersiach widoki. Positano, Amalfi, Ravello i wyspa Capri to perełki tego regionu.</p>
            </div>
          </div>
        </div>
        
        {/* Propozycje wycieczek */}
        <h2 className="text-2xl font-bold mb-6">Nasze propozycje wycieczek</h2>
        <div className="space-y-6 mb-12">
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Włoskie Arcydzieła - 10 dni</h3>
            <p>Zwiedzanie najważniejszych zabytków i miast: Rzym, Florencja, Wenecja i Mediolan.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Włoskie Wybrzeża - 8 dni</h3>
            <p>Odpoczynek i zwiedzanie Wybrzeża Amalfi, wyspy Capri oraz Sycylii.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Toskania i Umbria - 7 dni</h3>
            <p>Odkrywanie winnic, historycznych miasteczek i kulinarnych skarbów środkowych Włoch.</p>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-primary text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Gotowy odkryć Włochy?</h2>
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
