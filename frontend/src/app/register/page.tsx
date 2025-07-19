'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';
import { useRouter } from 'next/navigation';
import Register from '@/components/Register';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/auth/register', { email, name, password });
      router.push('/login');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <Register
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={submit}
    />
  );
}