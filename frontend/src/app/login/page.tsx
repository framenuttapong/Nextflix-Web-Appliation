'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';
import Login from '@/components/Login';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/auth/login', { email, password });
      router.push('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={submit}
      />
  );
}