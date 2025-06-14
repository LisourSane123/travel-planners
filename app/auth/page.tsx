'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { signIn } from 'next-auth/react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Wszystkie pola są wymagane');
      }

      if (password.length < 6) {
        throw new Error('Hasło musi mieć co najmniej 6 znaków');
      }

      if (isLogin) {
        // Logowanie przez NextAuth
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error('Nieprawidłowy email lub hasło');
        }

        // Przekierowanie po udanym logowaniu
        router.push('/dashboard');
        router.refresh();
      } else {
        // Rejestracja
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Wystąpił błąd podczas rejestracji');
        }

        // Informacja o sukcesie
        // Auto login after registration
        const loginResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        
        if (loginResult?.error) {
          setError('');
          setSuccess(true);
          setTimeout(() => {
            setIsLogin(true);
            setSuccess(false);
          }, 3000);
        } else {
          // Redirect new users to welcome page
          router.push('/welcome');
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-12 card bg-base-200 p-8">
        <h2 className="text-2xl mb-4">{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            className="input input-bordered w-full" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
            disabled={loading}
          />
          <input 
            className="input input-bordered w-full" 
            type="password" 
            placeholder="Hasło" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
            disabled={loading}
          />
          <button 
            className="btn btn-primary w-full" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Przetwarzanie...' : isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
          <button 
            type="button" 
            className="btn btn-link w-full" 
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}
          </button>
          {error && <div className="text-error">{error}</div>}
          {success && <div className="text-success">Rejestracja udana! Możesz się teraz zalogować.</div>}
        </form>
      </div>
    </>
  );
}
