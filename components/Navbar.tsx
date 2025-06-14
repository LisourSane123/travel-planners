'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };
  
  return (
    <div className="sticky top-0 z-30 shadow-sm bg-white">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/about" className={pathname === '/about' ? 'font-bold' : ''}>O nas</Link></li>
              <li><Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>Panel</Link></li>
              <li><Link href="/reports" className={pathname === '/reports' ? 'font-bold' : ''}>Raporty</Link></li>
              <li><Link href="/contact" className={pathname === '/contact' ? 'font-bold' : ''}>Kontakt</Link></li>
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="Travel Planners Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
            <span className="font-bold text-xl hidden sm:inline">Travel Planners</span>
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link 
                href="/about" 
                className={`rounded-lg font-medium hover:bg-base-200 ${pathname === '/about' ? 'bg-base-200 font-bold' : ''}`}
              >
                O nas
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className={`rounded-lg font-medium hover:bg-base-200 ${pathname === '/dashboard' ? 'bg-base-200 font-bold' : ''}`}
              >
                Panel
              </Link>
            </li>
            <li>
              <Link 
                href="/reports" 
                className={`rounded-lg font-medium hover:bg-base-200 ${pathname === '/reports' ? 'bg-base-200 font-bold' : ''}`}
              >
                Raporty
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`rounded-lg font-medium hover:bg-base-200 ${pathname === '/contact' ? 'bg-base-200 font-bold' : ''}`}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!session ? (
            <Link href="/auth" className="btn btn-primary">Zaloguj się</Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-primary text-white rounded-full w-10">
                  <span>{(session.user?.name || session.user?.email || '?')[0].toUpperCase()}</span>
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                <li className="p-2 text-sm opacity-75 border-b">{session.user?.email}</li>
                <li><Link href="/dashboard">Mój panel</Link></li>
                <li><Link href="/create-trip">Nowa podróż</Link></li>
                <li><Link href="/reports">Statystyki i raporty</Link></li>
                <li><button onClick={handleLogout} className="text-error">Wyloguj się</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
