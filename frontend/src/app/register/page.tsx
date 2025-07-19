'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/auth/register', { email, name, password });
      router.push('/');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Register</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name"
        className="w-full p-2 border mb-2" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        className="w-full p-2 border mb-2" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
        className="w-full p-2 border mb-4" required />
      <button className="w-full bg-black text-white p-2 rounded">Register</button>
    </form>
  );
}