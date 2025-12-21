import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Waitlist - Crypto Card Management',
  description: 'Manage your Waitlist crypto cards, track rewards, view referral stats, and access exclusive features. Your personal crypto card dashboard.',
  keywords: 'crypto dashboard, Waitlist dashboard, crypto card management, referral tracking, rewards dashboard',
  openGraph: {
    title: 'Dashboard | Waitlist - Crypto Card Management',
    description: 'Manage your Waitlist crypto cards, track rewards, view referral stats, and access exclusive features.',
    images: ['/twitter-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Waitlist - Crypto Card Management',
    description: 'Manage your Waitlist crypto cards, track rewards, view referral stats, and access exclusive features.',
    images: ['/twitter-image.png'],
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
