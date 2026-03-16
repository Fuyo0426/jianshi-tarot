'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || '登入失敗');
      }
    } catch {
      setError('網路錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ background: '#0B0D1A', minHeight: '100vh' }}
      className="flex items-center justify-center"
    >
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              background: 'rgba(196,144,45,0.4)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="glass-panel relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div
            className="text-3xl mb-3"
            style={{ color: '#C4902D', fontFamily: 'serif' }}
          >
            ✦ 劍石塔羅 ✦
          </div>
          <h1 style={{ color: '#EBE5D9' }} className="text-lg font-medium">
            後台管理系統
          </h1>
          <p style={{ color: '#7A7260' }} className="text-sm mt-1">
            Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              style={{ color: '#EBE5D9' }}
              className="text-sm font-medium"
            >
              管理密碼
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入管理密碼"
              required
              style={{
                background: 'rgba(17,21,34,0.8)',
                border: '1px solid rgba(196,144,45,0.3)',
                color: '#EBE5D9',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(196,144,45,0.8)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(196,144,45,0.3)')
              }
            />
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(220,38,38,0.1)',
                border: '1px solid rgba(220,38,38,0.3)',
                color: '#FCA5A5',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading
                ? 'rgba(196,144,45,0.3)'
                : 'rgba(196,144,45,0.9)',
              color: '#0B0D1A',
              border: 'none',
              borderRadius: '8px',
              padding: '11px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? '驗證中...' : '登入後台'}
          </button>
        </form>
      </div>
    </div>
  );
}
