'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';

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
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        className="w-full p-2 border mb-2" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
        className="w-full p-2 border mb-4" required />
      <button className="w-full bg-black text-white p-2 rounded">Login</button>
    </form>
  );
}