export const metadata = {
  title: 'O nas - Planer Podróży',
  description: 'Poznaj nasz zespół pasjonatów podróży i dowiedz się więcej o naszej firmie.',
};

import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Zdjęcie dżungli */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
            <Image 
              src="/images/jungle.jpg" 
              alt="Piękna dżungla tropikalna" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white text-xl font-semibold">
                Odkrywaj nieznane zakątki z Travel Planners
              </p>
            </div>
          </div>
          
          {/* Informacje o nas */}
          <div className="p-6 bg-base-100 shadow-lg rounded-lg order-1 lg:order-2">
            <h1 className="text-3xl font-bold mb-6">O nas</h1>
            <p className="mb-4">
              Jesteśmy zespołem pasjonatów podróży, którzy pomagają spełniać marzenia o idealnych wyjazdach. 
              Nasz Planer Podróży to szybki i prosty sposób na organizację Twojej wyprawy!
            </p>
            <p className="mb-4">
              Założyliśmy firmę w 2025 roku z misją uproszczenia procesu planowania podróży.
              Nasz zespół składa się z doświadczonych podróżników i specjalistów od turystyki,
              którzy wiedzą, jak sprawić, by każda podróż była niezapomnianym przeżyciem.
            </p>
            <p className="mb-6">
              Dołącz do tysięcy zadowolonych klientów i zaplanuj swoją wymarzoną podróż już dziś!
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">120+</p>
                <p className="text-sm">Krajów</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">15k+</p>
                <p className="text-sm">Podróży</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm">Zadowolonych</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
