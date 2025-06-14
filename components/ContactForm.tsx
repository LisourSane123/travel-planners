'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !message) {
        throw new Error('Email i wiadomość są wymagane');
      }

      // Walidacja email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Podaj prawidłowy adres email');
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ email, message }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Wystąpił błąd podczas wysyłania wiadomości');
      }

      setSent(true);
      setEmail('');
      setMessage('');
      
      // Reset success message after some time
      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (err: any) {
      setError(err?.message || 'Nie można wysłać wiadomości. Spróbuj ponownie później.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 p-8 max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-xl">Kontakt</h2>
      <input className="input input-bordered w-full" type="email" placeholder="Twój email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea className="textarea textarea-bordered w-full" placeholder="Wiadomość" value={message} onChange={e => setMessage(e.target.value)} required />
      <button className="btn btn-primary w-full" type="submit" disabled={loading}>
        {loading ? 'Wysyłanie...' : 'Wyślij'}
      </button>
      {sent && <div className="text-success">Wiadomość wysłana!</div>}
      {error && <div className="text-error">{error}</div>}
    </form>
  );
}
