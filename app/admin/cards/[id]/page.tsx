'use client';

import { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface CardData {
  id: string;
  name_zh: string;
  keywords: string[] | string;
  upright_meaning: string;
  upright_love: string;
  upright_career: string;
  upright_advice: string;
  reversed_meaning: string;
  reversed_love: string;
  reversed_career: string;
  reversed_advice: string;
  custom_image_url?: string | null;
}

const fieldLabels: { key: keyof CardData; label: string; multiline?: boolean }[] = [
  { key: 'name_zh', label: '中文名稱' },
  { key: 'upright_meaning', label: '正位 — 整體解讀', multiline: true },
  { key: 'upright_love', label: '正位 — 愛情', multiline: true },
  { key: 'upright_career', label: '正位 — 事業', multiline: true },
  { key: 'upright_advice', label: '正位 — 建議', multiline: true },
  { key: 'reversed_meaning', label: '逆位 — 整體解讀', multiline: true },
  { key: 'reversed_love', label: '逆位 — 愛情', multiline: true },
  { key: 'reversed_career', label: '逆位 — 事業', multiline: true },
  { key: 'reversed_advice', label: '逆位 — 建議', multiline: true },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(17,21,34,0.8)',
  border: '1px solid rgba(196,144,45,0.3)',
  color: '#EBE5D9',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  outline: 'none',
  resize: 'vertical' as const,
  fontFamily: 'inherit',
  lineHeight: '1.6',
};

const labelStyle = {
  display: 'block',
  color: '#7A7260',
  fontSize: '12px',
  fontWeight: '500',
  marginBottom: '6px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
};

export default function CardEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [card, setCard] = useState<CardData | null>(null);
  const [keywordsStr, setKeywordsStr] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/cards/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCard(data);
        const kw = Array.isArray(data.keywords)
          ? data.keywords.join(', ')
          : (data.keywords || '');
        setKeywordsStr(kw);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSave() {
    if (!card) return;
    setSaving(true);

    const payload: CardData = {
      ...card,
      keywords: keywordsStr.split(',').map((k) => k.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/admin/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('success', '儲存成功');
      } else {
        const err = await res.json();
        showToast('error', err.error || '儲存失敗');
      }
    } catch {
      showToast('error', '網路錯誤');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append('cardId', id);
    formData.append('file', file);

    // Local preview
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        setCard((prev) => prev ? { ...prev, custom_image_url: url } : prev);
        showToast('success', '圖片上傳成功');
      } else {
        const err = await res.json();
        showToast('error', err.error || '上傳失敗');
        setPreviewUrl(null);
      }
    } catch {
      showToast('error', '上傳失敗');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{ background: '#0B0D1A', minHeight: '100vh', color: '#7A7260' }}
        className="flex items-center justify-center"
      >
        載入中...
      </div>
    );
  }

  if (!card) {
    return (
      <div
        style={{ background: '#0B0D1A', minHeight: '100vh', color: '#FCA5A5' }}
        className="flex items-center justify-center flex-col gap-4"
      >
        <p>找不到牌卡資料</p>
        <Link href="/admin" style={{ color: '#C4902D' }}>
          返回列表
        </Link>
      </div>
    );
  }

  const imageUrl =
    previewUrl ||
    card.custom_image_url ||
    `/cards/rider-waite/${id}.jpg`;

  return (
    <div style={{ background: '#0B0D1A', minHeight: '100vh', color: '#EBE5D9' }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            background:
              toast.type === 'success'
                ? 'rgba(196,144,45,0.9)'
                : 'rgba(220,38,38,0.9)',
            color: toast.type === 'success' ? '#0B0D1A' : '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          background: 'rgba(17,21,34,0.95)',
          borderBottom: '1px solid rgba(196,144,45,0.15)',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          href="/admin"
          style={{
            color: '#7A7260',
            fontSize: '13px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← 返回列表
        </Link>
        <span style={{ color: 'rgba(196,144,45,0.3)' }}>|</span>
        <span style={{ color: '#C4902D', fontFamily: 'serif', fontSize: '16px' }}>
          {card.name_zh}
        </span>
        <span style={{ color: '#7A7260', fontSize: '12px' }}>#{id}</span>

        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: saving ? 'rgba(196,144,45,0.3)' : 'rgba(196,144,45,0.9)',
              color: '#0B0D1A',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Left: Image */}
        <div className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '2/3',
              position: 'relative',
              background: 'rgba(196,144,45,0.05)',
            }}
          >
            <Image
              src={imageUrl}
              alt={card.name_zh}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '16px' }}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid rgba(196,144,45,0.3)',
                color: '#C4902D',
                fontSize: '13px',
                cursor: uploading ? 'not-allowed' : 'pointer',
              }}
            >
              {uploading ? '上傳中...' : '更換圖片'}
            </button>
            {card.custom_image_url && (
              <p style={{ color: '#7A7260', fontSize: '11px', marginTop: '8px', textAlign: 'center' }}>
                已使用自訂圖片
              </p>
            )}
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="glass-panel" style={{ borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ color: '#C4902D', fontSize: '13px', fontWeight: '600', marginBottom: '16px', letterSpacing: '1px' }}>
              基本資訊
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label style={labelStyle}>中文名稱</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={card.name_zh}
                  onChange={(e) => setCard({ ...card, name_zh: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>關鍵字（逗號分隔）</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={keywordsStr}
                  onChange={(e) => setKeywordsStr(e.target.value)}
                  placeholder="例：新開始, 自由, 冒險"
                />
              </div>
            </div>
          </div>

          {/* Upright */}
          <div className="glass-panel" style={{ borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ color: '#C4902D', fontSize: '13px', fontWeight: '600', marginBottom: '16px', letterSpacing: '1px' }}>
              正位解讀
            </h2>
            <div className="flex flex-col gap-4">
              {(['upright_meaning', 'upright_love', 'upright_career', 'upright_advice'] as const).map((key) => {
                const label = fieldLabels.find((f) => f.key === key)?.label || key;
                return (
                  <div key={key}>
                    <label style={labelStyle}>{label.replace('正位 — ', '')}</label>
                    <textarea
                      rows={3}
                      style={inputStyle}
                      value={(card[key] as string) || ''}
                      onChange={(e) => setCard({ ...card, [key]: e.target.value })}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reversed */}
          <div className="glass-panel" style={{ borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ color: '#C4902D', fontSize: '13px', fontWeight: '600', marginBottom: '16px', letterSpacing: '1px' }}>
              逆位解讀
            </h2>
            <div className="flex flex-col gap-4">
              {(['reversed_meaning', 'reversed_love', 'reversed_career', 'reversed_advice'] as const).map((key) => {
                const label = fieldLabels.find((f) => f.key === key)?.label || key;
                return (
                  <div key={key}>
                    <label style={labelStyle}>{label.replace('逆位 — ', '')}</label>
                    <textarea
                      rows={3}
                      style={inputStyle}
                      value={(card[key] as string) || ''}
                      onChange={(e) => setCard({ ...card, [key]: e.target.value })}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
