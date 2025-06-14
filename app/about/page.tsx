export const metadata = {
  title: 'O nas - Planer Podróży',
  description: 'Poznaj nasz zespół pasjonatów podróży i dowiedz się więcej o naszej firmie.',
};

import Navbar from '../../components/Navbar';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mt-12 p-8 card bg-base-200">
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
          <p>
            Dołącz do tysięcy zadowolonych klientów i zaplanuj swoją wymarzoną podróż już dziś!
          </p>
        </div>
      </div>
    </div>
  );
}
