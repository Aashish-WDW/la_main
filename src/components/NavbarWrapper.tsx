'use client';

import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const router = useRouter();

  return (
    <Navbar
      onLoginClick={() => router.push('/login')}
      onSignupClick={() => router.push('/login')}
      onProfileClick={() => router.push('/profile')}
      onLogoClick={() => router.push('/')}
      onLookAroundClick={() => router.push('/listings')}
    />
  );
} 