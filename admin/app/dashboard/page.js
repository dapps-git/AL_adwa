'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/gallery');
  }, [router]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
      Redirecting to Gallery...
    </div>
  );
}
