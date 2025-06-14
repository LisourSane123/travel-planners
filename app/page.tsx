import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] w-full">
          <Image 
            src="/images/beach.jpg" 
            fill
            priority
            alt="Travel destination" 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Travel Planners</h1>
              <p className="text-xl md:text-2xl mb-8">Odkryj świat z najlepszym planerem podróży</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth" className="btn btn-primary btn-lg">
                  Zacznij teraz
                </Link>
                <Link href="/about" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                  Dowiedz się więcej
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dlaczego warto korzystać z Travel Planners?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-primary text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Oszczędność czasu</h3>
              <p>Zaplanuj swoją wymarzoną podróż w zaledwie 3 minuty. Szybko, prosto i bez stresu.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-secondary text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Wszystko w jednym miejscu</h3>
              <p>Zarządzaj wszystkimi swoimi podróżami z jednego panelu. Śledź statusy i miej wszystkie informacje pod ręką.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-accent text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Szczegółowe statystyki</h3>
              <p>Analizuj swoje podróże dzięki zaawansowanym raportom i odkrywaj swoje podróżnicze preferencje.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section className="py-16 bg-primary bg-opacity-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Jak to działa?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">1</div>
                <h3 className="card-title">Załóż konto</h3>
                <p>Utwórz darmowe konto w kilka sekund i uzyskaj dostęp do wszystkich funkcji platformy.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">2</div>
                <h3 className="card-title">Stwórz podróż</h3>
                <p>Wypełnij prosty formularz z informacjami o Twojej wymarzonej podróży.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">3</div>
                <h3 className="card-title">Zarządzaj podróżami</h3>
                <p>Śledź status podróży, edytuj szczegóły i analizuj swoje przeszłe i przyszłe podróże.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/auth" className="btn btn-primary btn-lg">
              Rozpocznij teraz
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 container mx-auto px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl">Gotowy, by rozpocząć przygodę?</h2>
            <p className="max-w-2xl mx-auto py-4">Dołącz do tysięcy zadowolonych podróżników, którzy używają Travel Planners do zarządzania swoimi wyprawami. Pierwszy krok do niezapomnianych przygód zaczyna się tutaj!</p>
            <div className="card-actions mt-4">
              <Link href="/auth" className="btn btn-primary">
                Zacznij teraz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
