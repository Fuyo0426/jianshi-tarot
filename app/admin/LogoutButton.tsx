'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '8px',
        background: 'rgba(220,38,38,0.1)',
        border: '1px solid rgba(220,38,38,0.25)',
        color: '#FCA5A5',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      登出
    </button>
  );
}
