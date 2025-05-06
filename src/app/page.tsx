'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div>
      <Button onClick={() => router.push('/signin')}>
        Sign in
      </Button>
    </div>
  );
}

