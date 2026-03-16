export type DeckId = 'rider-waite' | 'jianshi';

export interface Deck {
  id: DeckId;
  name: string;
  name_zh: string;
  description: string;
  locked: boolean;
  backColor: string;
  accentColor: string;
  tagline: string;
}

export const DECKS: Deck[] = [
  {
    id: 'rider-waite',
    name: 'Rider-Waite',
    name_zh: '偉特塔羅',
    description: '1909年出版的經典牌組，全球最廣泛使用的塔羅系統，每張牌都有豐富的象徵符號。',
    locked: false,
    backColor: '#1A2744',
    accentColor: '#C4902D',
    tagline: '經典正統，初學者首選'
  },
  {
    id: 'jianshi',
    name: 'Jianshi Guardian',
    name_zh: '劍獅守護',
    description: '以台南安平「劍獅」為核心意象重新詮釋的限量牌組，融合台灣民俗守護文化與神秘塔羅智慧。',
    locked: true,
    backColor: '#2C1A00',
    accentColor: '#D4580A',
    tagline: '台南限定，守護命運之牌'
  }
];
