import { ALL_CARDS, TarotCard } from '@/data/cards';

export type SpreadType = 'single' | 'three' | 'celtic';

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  position: number;
  positionLabel: string;
}

export const SPREAD_CONFIG: Record<SpreadType, { label: string; label_zh: string; count: number; positions: string[] }> = {
  single: {
    label: 'Single Card',
    label_zh: '單張牌',
    count: 1,
    positions: ['當下指引']
  },
  three: {
    label: 'Three Cards',
    label_zh: '三牌陣',
    count: 3,
    positions: ['過去', '現在', '未來']
  },
  celtic: {
    label: 'Celtic Cross',
    label_zh: '凱爾特十字',
    count: 6,
    positions: ['當前情境', '挑戰', '遠因', '近因', '可能結果', '最終建議']
  }
};

export function shuffleAndDraw(spread: SpreadType): DrawnCard[] {
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
  const config = SPREAD_CONFIG[spread];

  return shuffled.slice(0, config.count).map((card, i) => ({
    card,
    reversed: Math.random() > 0.6,
    position: i,
    positionLabel: config.positions[i]
  }));
}

export function encodeReading(drawn: DrawnCard[]): string {
  // Use encodeURIComponent to safely handle CJK characters
  const data = drawn.map(d => ({
    id: d.card.id,
    rev: d.reversed,
    pos: d.position,
  }));
  return encodeURIComponent(JSON.stringify(data));
}

export function decodeReading(encoded: string): { id: string; rev: boolean; pos: number }[] | null {
  try {
    return JSON.parse(decodeURIComponent(encoded));
  } catch {
    return null;
  }
}

export function getCardById(id: string): TarotCard | undefined {
  return ALL_CARDS.find(c => c.id === id);
}
