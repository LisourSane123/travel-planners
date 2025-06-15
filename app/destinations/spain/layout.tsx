import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hiszpania - Travel Planners',
  description: 'Odkryj magię Hiszpanii - słońce, zabytki i pulsującą kulturę.',
};

export default function SpainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
