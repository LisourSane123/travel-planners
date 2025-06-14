# Travel Planners

Aplikacja do planowani## Struktura projektu

```
app/                          # Katalog główny Next.js App Router
  api/                        # API endpoints
    auth/                     # Autoryzacja (NextAuth, rejestracja)
    trips/                    # Zarządzanie podróżami
    contact/                  # Formularz kontaktowy
  auth/                       # Strona logowania/rejestracji
  dashboard/                  # Panel użytkownika
  reports/                    # Statystyki i raporty
  welcome/                    # Ekran powitalny
  ...

components/                   # Komponenty React
  AuthProvider.tsx            # Provider autoryzacji
  Navbar.tsx                  # Nawigacja
  TripForm.tsx                # Formularz podróży
  TripList.tsx                # Lista podróży
  TripFilter.tsx              # Filtrowanie podróży
  TripStatistics.tsx          # Statystyki podróży
  ...

lib/                          # Biblioteki i funkcje pomocnicze
  csvDB.ts                    # Operacje na "bazie danych" CSV
  tripsDB.ts                  # Logika dla podróży
  types.ts                    # Definicje TypeScript

data/                         # Dane CSV
  users.csv                   # Użytkownicy
  trips.csv                   # Podróże
  messages.csv                # Wiadomości z formularza kontaktowego
```

## Uruchomienie aplikacji

### Wymagania
- Node.js (wersja 18+)
- pnpm (preferowany) lub npm, yarn

### Instalacja zależności
```bash
pnpm install
```

### Uruchomienie w trybie deweloperskim
```bash
pnpm dev
```

### Budowanie aplikacji
```bash
pnpm build
```

### Uruchomienie w trybie produkcyjnym
```bash
pnpm start
```

## Plany rozwoju

1. Integracja z Supabase jako baza danych
2. Dodanie powiadomień email
3. Rozbudowa systemu statystyk i raportów
4. Implementacja kreator podróży z sugestiami
5. Dodanie systemu recenzji i ocen
6. Integracja z mapami
7. System dzielenia się podróżami ze znajomymi
8. Aplikacja mobilna (React Native)podróżami zbudowana z wykorzystaniem nowoczesnych technologii. Umożliwia użytkownikom rejestrację, logowanie, tworzenie, edycję oraz śledzenie podróży, a także przeglądanie statystyk.

## Technologie

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **DaisyUI**
- **NextAuth.js**
- **CSV** jako tymczasowa baza danych
- **Supabase** (planowana integracja)

## Główne funkcje

- **Autoryzacja użytkowników**
  - Rejestracja
  - Logowanie
  - Zarządzanie sesją

- **Zarządzanie podróżami**
  - Tworzenie nowych podróży
  - Edycja istniejących podróży
  - Usuwanie podróży
  - Przeglądanie listy podróży

- **Filtrowanie i wyszukiwanie**
  - Filtrowanie podróży po statusie, kategorii, dacie
  - Wyszukiwanie po nazwie destynacji

- **Statystyki i raporty**
  - Statystyki podróży (liczba, statusy, kategorie)
  - Wizualizacja danych
  - Popularne destynacje

- **UI/UX**
  - Responsywny design
  - Intuicyjny interfejs
  - Ekran powitalny i samouczek dla nowych użytkowników

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Planer Podróży – MVP

## Stack
- Next.js (App Router, TypeScript)
- Supabase (Auth, DB, Edge Functions)
- Tailwind CSS + DaisyUI

## 1. Szybki start

```bash
git clone <repo-url>
cd <folder>
cp .env.example .env
# Uzupełnij .env danymi z panelu Supabase
pnpm install
```

## 2. Konfiguracja Supabase
- Utwórz projekt na https://app.supabase.com
- Skopiuj URL i klucze do `.env`
- W zakładce "Auth" włącz logowanie przez email
- W zakładce "Table Editor" utwórz tabelę `trips`:
  - `id` UUID, primary key, default uuid_generate_v4()
  - `user_id` UUID
  - `destination` text
  - `date` date
  - `status` text
  - `created_at` timestamp, default now()

## 3. Edge Function (formularz kontaktowy)
- W Supabase CLI:
  ```bash
  supabase functions deploy contact-form
  ```
- W panelu Supabase ustaw endpoint funkcji jako `/api/contact` (lub zmień w kodzie frontend).

## 4. Seedowanie bazy
- Uzupełnij `SUPABASE_SERVICE_ROLE_KEY` w `.env`
- Uruchom:
  ```bash
  npx ts-node prisma/seed.ts
  ```

## 5. Uruchomienie lokalne

```bash
pnpm dev
```

## 6. Deploy

### Frontend (Vercel)
- Połącz repozytorium z Vercel, ustaw zmienne środowiskowe z `.env`
- Deploy automatyczny

### Backend (Supabase)
- Wszystko działa w chmurze Supabase (Auth, DB, Edge Functions)

## 7. Testowanie
- Zarejestruj się, zgłoś podróż, sprawdź panel klienta, wyślij wiadomość przez formularz kontaktowy.

---

MVP gotowe! W razie pytań lub chęci rozbudowy – napisz.
