import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Włochy - Travel Planners',
  description: 'Odkryj magię Włoch - wspaniałą kulturę, kuchnię i zabytki.',
};

export default function ItalyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
