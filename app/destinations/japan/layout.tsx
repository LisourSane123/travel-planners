import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Japonia - Travel Planners',
  description: 'Odkryj magię Japonii - tradycję i nowoczesność kraju kwitnącej wiśni.',
};

export default function JapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
