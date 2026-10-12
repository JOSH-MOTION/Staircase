'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message.replace('Firebase: ', '').replace(/\s*\(auth\/[a-z-]+\)\.?/, ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{mode === 'signin' ? 'Sign In' : 'Create Your Account'}</h2>
      <p className="auth-subtitle">
        {mode === 'signin'
          ? "Sign in to see your order history."
          : 'Save your details for faster ordering.'}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <input
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="cart-error">{error}</p>}
        <button type="submit" className="button red" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <button
        type="button"
        className="auth-switch"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin');
          setError('');
        }}
      >
        {mode === 'signin'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </button>
    </div>
  );
}
