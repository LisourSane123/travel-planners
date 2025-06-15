import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jordania - Travel Planners',
  description: 'Odkryj magię Jordanii - starożytne cuda, pustynie i Morze Martwe.',
};

export default function JordanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
