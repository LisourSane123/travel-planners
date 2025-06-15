import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brazylia - Travel Planners',
  description: 'Odkryj magię Brazylii - plaże, dżungle i tętniące życiem miasta.',
};

export default function BrazilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
