export const metadata = {
  title: 'Zaplanuj podróż - Planer Podróży',
  description: 'Zaplanuj swoją wymarzoną podróż z naszym prostym formularzem.',
};

import Navbar from '../../components/Navbar';
import TripForm from '../../components/TripForm';

export default function CreateTripPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8">Zaplanuj swoją podróż</h1>
        <p className="text-center mb-6">Wypełnij poniższy formularz, a nasz zespół przygotuje dla Ciebie idealną ofertę.</p>
        <TripForm />
      </div>
    </div>
  );
}
