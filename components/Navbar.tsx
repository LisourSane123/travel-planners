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
            <div className="relative group">
              <button className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary hover:bg-gray-50 ${pathname.startsWith('/destinations') ? 'text-primary font-semibold' : 'text-gray-700'} flex items-center cursor-pointer`}>
                Kierunki
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ul className="z-[1] menu p-2 shadow-lg bg-white border rounded-lg w-72">
                  <li><Link href="/destinations/jordan" className="flex items-center py-2">Jordania</Link></li>
                  <li><Link href="/destinations/brazil" className="flex items-center py-2">Brazylia</Link></li>
                  <li><Link href="/destinations/italy" className="flex items-center py-2">Włochy</Link></li>
                  <li><Link href="/destinations/spain" className="flex items-center py-2">Hiszpania</Link></li>
                  <li><Link href="/destinations/japan" className="flex items-center py-2">Japonia</Link></li>
                </ul>
              </div>
            </div>
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
              <details className="dropdown dropdown-end">
                <summary className="btn bg-black text-white btn-circle avatar cursor-pointer hover:bg-gray-800">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </summary>
                <ul className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-black text-white rounded-box w-64 mt-2">
                  <li className="p-2 text-sm opacity-75 border-b border-gray-700">{session.user?.email}</li>
                  <li><Link href="/dashboard" className="hover:bg-gray-800">Mój panel</Link></li>
                  <li><Link href="/create-trip" className="hover:bg-gray-800">Nowa podróż</Link></li>
                  <li><button onClick={handleLogout} className="text-red-400 hover:bg-gray-800">Wyloguj się</button></li>
                </ul>
              </details>
            )}
            
            {/* Menu mobilne - hamburger */}
            <div className="md:hidden ml-2">
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </summary>
                <ul className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-white border rounded-box w-52 mt-2">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/dashboard">Podróże</Link></li>
                  <li className="menu-title"><span>Kierunki</span></li>
                  <li><Link href="/destinations/jordan">Jordania</Link></li>
                  <li><Link href="/destinations/brazil">Brazylia</Link></li>
                  <li><Link href="/destinations/italy">Włochy</Link></li>
                  <li><Link href="/destinations/spain">Hiszpania</Link></li>
                  <li><Link href="/destinations/japan">Japonia</Link></li>
                  <li><Link href="/about">O nas</Link></li>
                  <li><Link href="/contact">Kontakt</Link></li>
                  {!session && <li><Link href="/auth">Zaloguj się</Link></li>}
                  {session && (
                    <>
                      <li className="menu-title">
                        <span>{session.user?.email}</span>
                      </li>
                      <li><Link href="/create-trip">Nowa podróż</Link></li>
                      <li><button onClick={handleLogout}>Wyloguj się</button></li>
                    </>
                  )}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
