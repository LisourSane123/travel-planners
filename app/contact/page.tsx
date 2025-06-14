export const metadata = {
  title: 'Kontakt - Planer Podróży',
  description: 'Skontaktuj się z nami, aby uzyskać więcej informacji o naszych usługach planowania podróży.',
};

import Navbar from '../../components/Navbar';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mt-8">Skontaktuj się z nami</h1>
        <p className="text-center mb-8">Masz pytania lub sugestie? Wypełnij formularz poniżej, a odpowiemy najszybciej jak to możliwe.</p>
        <ContactForm />
      </div>
    </div>
  );
}
