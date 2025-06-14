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
    <div className="sticky top-0 z-30 shadow bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/logo.svg" 
                alt="Travel Planners Logo" 
                width={40} 
                height={40}
                className="h-10 w-auto"
                priority
              />
              <span className="font-bold text-xl hidden sm:inline">Travel Planners</span>
            </Link>
          </div>
          
          {/* Menu główne - w tej samej linii co logo */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-gray-50 ${pathname === '/' ? 'text-primary font-semibold' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-gray-50 ${pathname === '/dashboard' ? 'text-primary font-semibold' : 'text-gray-700'}`}
            >
              Podróże
            </Link>
            <Link 
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-gray-50 ${pathname === '/about' ? 'text-primary font-semibold' : 'text-gray-700'}`}
            >
              O nas
            </Link>
            <Link 
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-gray-50 ${pathname === '/contact' ? 'text-primary font-semibold' : 'text-gray-700'}`}
            >
              Kontakt
            </Link>
          </div>
          
          {/* Menu użytkownika lub przycisk logowania */}
          <div className="flex items-center">
            {!session ? (
              <Link href="/auth" className="btn btn-primary btn-sm">Zaloguj się</Link>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder cursor-pointer">
                  <div className="bg-primary text-white rounded-full w-10">
                    <span>{(session.user?.name || session.user?.email || '?')[0].toUpperCase()}</span>
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-64 mt-2">
                  <li className="p-2 text-sm opacity-75 border-b">{session.user?.email}</li>
                  <li><Link href="/dashboard">Mój panel</Link></li>
                  <li><Link href="/create-trip">Nowa podróż</Link></li>
                  <li><Link href="/reports">Statystyki i raporty</Link></li>
                  <li><button onClick={handleLogout} className="text-error">Wyloguj się</button></li>
                </ul>
              </div>
            )}
            
            {/* Menu mobilne - hamburger */}
            <div className="md:hidden ml-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu menu-sm p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/dashboard">Podróże</Link></li>
                  <li><Link href="/about">O nas</Link></li>
                  <li><Link href="/contact">Kontakt</Link></li>
                  {!session && <li><Link href="/auth">Zaloguj się</Link></li>}
                  {session && (
                    <>
                      <li className="menu-title">
                        <span>{session.user?.email}</span>
                      </li>
                      <li><Link href="/create-trip">Nowa podróż</Link></li>
                      <li><Link href="/reports">Statystyki i raporty</Link></li>
                      <li><button onClick={handleLogout}>Wyloguj się</button></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
