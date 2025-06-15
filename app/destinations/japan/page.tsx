'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

// Metadata przeniesiona do pliku metadata.ts w tym samym folderze lub layout.tsx

export default function JapanPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Nagłówek */}
        <h1 className="text-4xl font-bold mb-2">Japonia</h1>
        <p className="text-lg text-gray-600 mb-8">Harmonijne połączenie tradycji i nowoczesności w kraju kwitnącej wiśni</p>
        
        {/* Główne zdjęcie */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-10 shadow-xl">
          <Image 
            src="/images/destinations/japan.jpg" 
            alt="Góra Fuji - Japonia" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        
        {/* Opis główny */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Japonia to fascynujący kraj kontrastów, gdzie wielowiekowe świątynie sąsiadują z futurystycznymi drapaczami chmur, a mistrzowskie tradycje łączą się z najnowocześniejszą technologią. Od tętniącego życiem Tokio, przez historyczne Kioto, po malownicze krajobrazy góry Fuji - Japonia oferuje niezapomniane doznania.
          </p>
          <p>
            Nasze japońskie wycieczki pozwalają zanurzyć się w unikalnej kulturze, odkryć samurajskie dziedzictwo, delektować się wykwintną kuchnią i doświadczyć słynnej japońskiej gościnności.
          </p>
        </div>
        
        {/* Główne atrakcje */}
        <h2 className="text-2xl font-bold mb-6">Główne atrakcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/japan.jpg" 
                alt="Tokio - dzielnica Shibuya" 
                fill 
                className="object-cover object-top" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Tokio</h3>
              <p>Ultranowoczesna metropolia z ekscytującymi dzielnicami jak Shibuya i Shinjuku, tradycyjnymi świątyniami i niezwykłą kulturą miejską.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/japan.jpg" 
                alt="Kioto - Świątynia Kinkaku-ji" 
                fill 
                className="object-cover object-center" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Kioto</h3>
              <p>Dawna stolica z ponad 1600 świątyniami buddyjskimi i 400 chramami shinto. Miejsce, gdzie można zobaczyć tradycyjne ogrody, gejsze i ceremonie herbaciane.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/japan.jpg" 
                alt="Góra Fuji" 
                fill 
                className="object-cover object-bottom" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Góra Fuji</h3>
              <p>Najwyższy szczyt Japonii i święta góra o idealnie symetrycznym kształcie. Symbol kraju i inspiracja dla artystów od wieków.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="relative h-52">
              <Image 
                src="/images/destinations/japan.jpg" 
                alt="Osaka - zamek" 
                fill 
                className="object-cover object-left" 
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">Osaka</h3>
              <p>Miasto znane z fantastycznej kuchni, historycznego zamku i tętniącej życiem dzielnicy Dotonbori. Centrum handlu i miejskiej kultury Japonii.</p>
            </div>
          </div>
        </div>
        
        {/* Propozycje wycieczek */}
        <h2 className="text-2xl font-bold mb-6">Nasze propozycje wycieczek</h2>
        <div className="space-y-6 mb-12">
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Klasyczna Japonia - 10 dni</h3>
            <p>Zwiedzanie najważniejszych miast i atrakcji: Tokio, Kioto, Nara i Osaka.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Japońska Przyroda - 12 dni</h3>
            <p>Wyprawa łącząca zwiedzanie miast z wycieczkami do parków narodowych, gorących źródeł i pięknych krajobrazów.</p>
          </div>
          
          <div className="p-6 bg-base-100 shadow-lg rounded-lg">
            <h3 className="font-bold text-xl mb-2">Kultura i Tradycja - 14 dni</h3>
            <p>Podróż śladami samurajów, mnichów i gejsz, z noclegami w tradycyjnych ryokanach i udziałem w lokalnych festiwalach.</p>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-primary text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Gotowy odkryć Japonię?</h2>
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
